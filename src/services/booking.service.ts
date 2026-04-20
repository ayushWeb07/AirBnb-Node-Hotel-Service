import * as bookingDto from "../dtos/booking.dto.ts";
import * as bookingRepository from "../repositories/booking.repository.ts";

const create = async (bookingData: bookingDto.create) => {
    const booking = await bookingRepository.create(bookingData);
    return booking;
};

const getAll = async () => {
    const bookings = await bookingRepository.getAll();
    return bookings;
};

export { create, getAll };
