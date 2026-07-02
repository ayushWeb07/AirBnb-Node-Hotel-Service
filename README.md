# 🏨 Hotel Service

> Inventory and catalog microservice for **AirBnB-Node** — a distributed, Airbnb-style booking platform built as a set of independently deployable services.

The Hotel Service owns everything related to **hotels, room types, and individual room inventory**. It is the source of truth for "what can be booked" — the Booking Service calls into it to check availability and reserve rooms, while this service never reaches into booking data directly, only validating against the Booking Service over HTTP when it needs to.

---

## Where this fits in the system

```
                         ┌─────────────────┐
                         │   API Gateway    │
                         └────────┬─────────┘
                                  │
         ┌────────────────────────┼───────────────────────┐
         │                        │                        │
 ┌───────▼────────┐      ┌────────▼─────────┐    ┌─────────▼────────┐
 │  AuthService     │      │  HotelService    │◄──►│  BookingService   │
 │  (Go)            │      │  (this repo)     │    │  (Node/TS)        │
 └──────────────────┘      └────────┬─────────┘    └─────────┬────────┘
                                     │                        │
                            ┌────────▼─────────┐    ┌─────────▼────────┐
                            │  MySQL (hotels)   │    │  ReviewService    │
                            └───────────────────┘    │  (Go)             │
                            ┌───────────────────┐    └───────────────────┘
                            │  Redis (BullMQ)    │
                            └───────────────────┘
```

Hotel Service is intentionally "dumb" about bookings — it exposes room inventory and lets other services (namely `BookingService`) drive the actual reservation flow, calling back into this service only to confirm a room and mark it as booked.

---

## What it does

- **Hotels** — CRUD for hotel records (name, address), soft-deleted (`paranoid`) so history isn't lost.
- **Room Types** — each hotel offers room types (`single`, `double`, `king`, `queen`), each with a target `roomCount`.
- **Rooms** — the actual bookable inventory. Rooms are modeled as **one row per room-type per date** (a count-based/date-partitioned inventory model), which makes availability lookups a simple range query instead of a calendar join.
- **Room Generation** — instead of generating years of room-date rows synchronously (and blocking a request), room creation is offloaded to a **BullMQ background job**: given a room type, a price, and a date range, a worker batch-generates the missing `Room` rows for every date in that range, skipping dates that already exist so jobs are safely re-runnable.
- **Availability & Booking Handoff** — `POST /rooms/check-available` finds free rooms for a room type across a date range; `POST /rooms/book-rooms` is called by `BookingService` to atomically stamp a `bookingId` onto a set of room rows once a booking is confirmed.
- **Operational visibility** — a Bull Board dashboard (`/admin/queues`) to inspect the room-generation queue, structured logging shipped to Logtail/BetterStack, error tracking via Sentry, and heartbeat pings for uptime monitoring.

---

## Tech stack

| Concern | Choice |
|---|---|
| Language / runtime | TypeScript on Node.js |
| Web framework | Express |
| ORM / migrations | Sequelize + `sequelize-cli` |
| Database | MySQL |
| Background jobs | BullMQ (Redis-backed) |
| Job dashboard | Bull Board |
| Validation | Zod |
| Logging | Winston (+ daily rotation), shipped to Logtail |
| Error tracking | Sentry |
| Uptime monitoring | BetterStack heartbeat pings |
| Lint / format | Biome |

---

## Project structure

```
src/
├── config/            # Env config, DB, Redis, logger, Sentry, graceful shutdown
├── controllers/        # Thin HTTP handlers — parse request, call service, respond
├── services/           # Business logic (hotel, room, roomType, roomGeneration)
├── repositories/        # All Sequelize/DB access lives here — services never touch models directly
├── db/
│   ├── models/          # Sequelize models: Hotel, Room, RoomType
│   └── migrations/       # Versioned schema changes
├── dtos/               # Shape contracts passed between layers
├── validators/          # Zod schemas for request body/params
├── routers/v1/          # Route definitions per resource
├── middlewares/         # Correlation ID injection, centralized error handling
├── queues/              # BullMQ queue definitions
├── producers/           # Code that enqueues jobs (e.g. room generation)
├── workers/             # BullMQ worker processes that consume jobs
├── utils/               # App errors, server bootstrap, heartbeat pings
└── index.ts             # App composition root
```

The layering is deliberate and consistent across every resource: **router → controller → service → repository → model.** Validation happens at the router boundary via Zod, and typed errors (`NotFoundError`, `BadRequestError`, `InternalServerError`) flow up through a single error middleware rather than being handled ad hoc in controllers.

---

## API surface (v1)

| Method | Route | Purpose |
|---|---|---|
| `GET` | `/api/v1/hotels` | List hotels |
| `GET` | `/api/v1/hotels/:id` | Get a hotel |
| `POST` | `/api/v1/hotels` | Create a hotel |
| `PATCH` | `/api/v1/hotels/:id` | Update a hotel |
| `DELETE` | `/api/v1/hotels/:id` | Soft-delete a hotel |
| `GET` | `/api/v1/room-types/hotel/:id` | List room types for a hotel |
| `GET` | `/api/v1/room-types/:id` | Get a room type |
| `POST` | `/api/v1/room-types` | Create a room type |
| `PATCH` / `DELETE` | `/api/v1/room-types/:id` | Update / remove a room type |
| `GET` | `/api/v1/rooms` | List rooms |
| `GET` | `/api/v1/rooms/:id` | Get a room |
| `POST` | `/api/v1/rooms/check-available` | Find available rooms for a room type + date range |
| `POST` | `/api/v1/rooms/book-rooms` | Stamp a `bookingId` onto a set of rooms (called by BookingService) |
| `POST` | `/api/v1/rooms-generation` | Enqueue a background job to generate room inventory for a date range |
| `GET` | `/admin/queues` | Bull Board dashboard for the room-generation queue |

---

## Getting started

### Prerequisites

- Node.js + [pnpm](https://pnpm.io/) (`pnpm@10.27.0` pinned via `packageManager`)
- MySQL running locally or reachable
- Redis running locally or reachable (used by BullMQ)

### Install

```bash
git clone https://github.com/ayushWeb07/AirBnb-Node-Hotel-Service.git
cd AirBnb-Node-Hotel-Service
pnpm install
```

### Configure environment

Create a `.env` file in the project root:

```bash
# Server
PORT=3001

# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=airbnb_dev

# Redis / BullMQ
REDIS_SERVER_HOST=localhost
REDIS_SERVER_PORT=6379
BULLMQ_ROOM_GENERATION_QUEUE_NAME=room-generation
BULLMQ_ROOM_GENERATION_PAYLOAD_NAME=generate-rooms
BULLMQ_ROOM_GENERATION_ADD_PAYLOAD_ATTEMPTS=3
BULLMQ_ROOM_GENERATION_ADD_PAYLOAD_DELAY=1000

# Inter-service
BOOKING_SERVICE_BASE_URL=http://localhost:3002/api/v1

# Observability (optional)
SENTRY_DSN=
LOGTAIL_SOURCE_TOKEN=
LOGTAIL_URL=
BETTERSTACK_HEARTBEAT_URL=
```

### Run migrations

```bash
pnpm run db:migrate
```

### Start the service

```bash
pnpm run dev
```

This boots the Express server, connects to MySQL, and starts the BullMQ room-generation **worker in the same process** — so a single `pnpm run dev` gives you both the API and the background processor. The Bull Board dashboard is available at `http://localhost:<PORT>/admin/queues`.

---

## Design notes worth knowing

- **Count-based inventory over calendar joins.** Rather than storing a single `Room` with a separate availability calendar, each bookable room-night is its own `Room` row (`roomTypeId`, `hotelId`, `price`, `availableOn`, `bookingId`). This trades some storage for much simpler, index-friendly availability queries (`WHERE roomTypeId = ? AND availableOn BETWEEN ? AND ? AND bookingId IS NULL`).
- **Idempotent room generation.** The room-generation worker diffs the requested date range against dates that already have rows before bulk-inserting, so re-queuing or retrying a job never creates duplicates.
- **Batching large date ranges.** Generation jobs process the date range in configurable batches rather than one giant `bulkCreate`, keeping memory and transaction size bounded for long stays or far-future date ranges.
- **Cross-service validation over HTTP, not shared DB access.** When a `bookingId` is attached to a room, this service calls `BookingService`'s API to confirm the booking exists rather than querying its database directly — keeping each service's data private and the system loosely coupled.
- **Soft deletes everywhere.** `Hotel`, `RoomType`, and `Room` all use Sequelize's `paranoid` mode, so historical bookings and reporting aren't broken by a hotel or room type being removed.