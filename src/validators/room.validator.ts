import z from "zod";

const getByIdSchema = z.object({
	id: z.coerce.number().nonnegative(),
});

const removeSchema = z.object({
	id: z.coerce.number().nonnegative(),
});

const createSchema = z.object({
	price: z.number().positive(),
	roomTypeId: z.number().nonnegative(),
	bookingId: z.number().nonnegative().optional(),
	hotelId: z.number().nonnegative(),
	availableOn: z.iso.datetime(),
});

const updateBodySchema = z.object({
	price: z.number().positive().optional(),
	roomTypeId: z.number().nonnegative().optional(),
	bookingId: z.number().nonnegative().optional(),
	hotelId: z.number().nonnegative().optional(),
	availableOn: z.iso.datetime().optional(),
});

const updateUrlParamsSchema = z.object({
	id: z.coerce.number().nonnegative(),
});

const getAvailableRoomsSchema = z.object({
	roomTypeId: z.number().nonnegative(),
	startDate: z.iso.datetime(),
	endDate: z.iso.datetime(),
});

const bookRequiredRoomsSchema = z.object({
	bookingId: z.number().nonnegative(),
	roomIds: z.array(z.number()).min(1)
});


export {
	getByIdSchema,
	createSchema,
	removeSchema,
	updateBodySchema,
	updateUrlParamsSchema,
	getAvailableRoomsSchema,
	bookRequiredRoomsSchema,
};
