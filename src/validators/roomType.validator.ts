import z from "zod";

const getByIdSchema = z.object({
	id: z.coerce.number().nonnegative(),
});

const getAllByHotelIdSchema = z.object({
	id: z.coerce.number().nonnegative(),
});

const removeSchema = z.object({
	id: z.coerce.number().nonnegative(),
});

const createSchema = z.object({
	roomCount: z.number().positive(),
	hotelId: z.number().positive(),
	type: z.enum(["single", "double", "king", "queen"]),
});

const updateBodySchema = z.object({
	roomCount: z.number().positive().optional(),
	hotelId: z.number().positive().optional(),
	type: z.enum(["single", "double", "king", "queen"]).optional(),
});

const updateUrlParamsSchema = z.object({
	id: z.coerce.number().nonnegative(),
});

export {
	getByIdSchema,
	getAllByHotelIdSchema,
	createSchema,
	removeSchema,
	updateBodySchema,
	updateUrlParamsSchema,
};
