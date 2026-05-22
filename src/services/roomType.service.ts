import * as roomTypeDto from "../dtos/roomType.dto.ts";
import * as roomTypeRepository from "../repositories/roomType.repository.ts";

const createRoomType = async (roomTypeData: roomTypeDto.createRoomType) => {
	const roomType = await roomTypeRepository.createRoomType(roomTypeData);
	return roomType;
};

const getAllRoomTypes = async () => {
	const roomTypes = await roomTypeRepository.getAllRoomTypes();
	return roomTypes;
};

const getRoomTypeById = async (id: number) => {
	const roomType = await roomTypeRepository.getRoomTypeById(id);
	return roomType;
};

const removeRoomTypeById = async (id: number) => {
	const roomType = await roomTypeRepository.removeRoomTypeById(id);
	return roomType;
};

const updateRoomType = async (
	id: number,
	roomTypeData: roomTypeDto.updateRoomType,
) => {
	const roomType = await roomTypeRepository.updateRoomType(id, roomTypeData);
	return roomType;
};

export {
	createRoomType,
	getAllRoomTypes,
	getRoomTypeById,
	removeRoomTypeById,
	updateRoomType,
};
