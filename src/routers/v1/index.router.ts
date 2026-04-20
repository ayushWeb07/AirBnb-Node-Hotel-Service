import { Router } from "express"
import hotelsRouter from "./hotels.router.ts"
import bookingsRouter from "./bookings.router.ts"

const router= Router()

// setup all app routes
router.use("/hotels", hotelsRouter)
router.use("/bookings", bookingsRouter)

export default router