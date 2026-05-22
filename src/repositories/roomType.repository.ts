import { logger } from "../config/logger.config.ts";
import RoomType from "../db/models/roomType.ts";
// import * as hotelDto from "../dtos/hotel.dto.ts";
import {
	InternalServerError,
	NotFoundError,
} from "../utils/errors/app.error.ts";
