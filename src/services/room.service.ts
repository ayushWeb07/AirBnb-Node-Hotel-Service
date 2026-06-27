import * as roomDto from "../dtos/room.dto.ts";
import * as roomRepository from "../repositories/room.repository.ts";

const createRoom = async (roomData: roomDto.createRoom) => {
	const room = await roomRepository.createRoom(roomData);
	return room;
};

const getAllRooms = async () => {
	const rooms = await roomRepository.getAllRooms();
	return rooms;
};

const getRoomById = async (id: number) => {
	const room = await roomRepository.getRoomById(id);
	return room;
};

const removeRoomById = async (id: number) => {
	const room = await roomRepository.removeRoomById(id);
	return room;
};

const updateRoom = async (id: number, roomData: roomDto.updateRoom) => {
	const room = await roomRepository.updateRoom(id, roomData);
	return room;
};

export { createRoom, getAllRooms, getRoomById, removeRoomById, updateRoom };
