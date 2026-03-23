import { createHotel } from "../dtos/hotel.dto";
import * as hotelRepository from "../repositories/hotel.repository";

const create = async (hotelData: createHotel) => {
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

export { create, getAll, getById };
