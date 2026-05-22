import * as hotelDto from "../dtos/hotel.dto.ts";
import * as hotelRepository from "../repositories/hotel.repository.ts";

const createHotel = async (hotelData: hotelDto.create) => {
	const hotel = await hotelRepository.createHotel(hotelData);
	return hotel;
};

const getAllHotels = async () => {
	const hotels = await hotelRepository.getAllHotels();
	return hotels;
};

const getHotelById = async (id: number) => {
	const hotel = await hotelRepository.getHotelById(id);
	return hotel;
};

const removeHotelById = async (id: number) => {
	const hotel = await hotelRepository.removeHotelById(id);
	return hotel;
};

const updateHotel = async (id: number, hotelData: hotelDto.update) => {
	const hotel = await hotelRepository.updateHotel(id, hotelData);
	return hotel;
};

export {
	createHotel,
	getAllHotels,
	getHotelById,
	removeHotelById,
	updateHotel,
};
