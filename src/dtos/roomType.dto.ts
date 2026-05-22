import { EType } from "../db/models/roomType.ts";

interface createRoomType {
	roomCount: number;
	hotelId: number;
	type: EType;
}

interface updateRoomType {
	roomCount?: number;
	hotelId?: number;
	type?: EType;
}

export { createRoomType, updateRoomType };
