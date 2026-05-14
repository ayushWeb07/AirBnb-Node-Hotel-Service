import * as hotelDto from "../dtos/hotel.dto.ts";
import * as hotelRepository from "../repositories/hotel.repository.ts";

const create = async (hotelData: hotelDto.create) => {
	const hotel = await hotelRepository.create(hotelData);
	return hotel;
};

const getAll = async () => {
	const hotels = await hotelRepository.getAll();
	return hotels;
};

const getById = async (id: number) => {
	const hotel = await hotelRepository.getById(id);
	return hotel;
};

const remove = async (id: number) => {
	const hotel = await hotelRepository.remove(id);
	return hotel;
};

const update = async (id: number, hotelData: hotelDto.update) => {
	const hotel = await hotelRepository.update(id, hotelData);
	return hotel;
};

export { create, getAll, getById, remove, update };
