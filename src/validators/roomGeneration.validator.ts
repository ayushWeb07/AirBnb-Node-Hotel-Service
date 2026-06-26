import z from "zod";

const createRoomGenerationJobSchema = z.object({
	roomTypeId: z.number().nonnegative(),
	price: z.number().positive(),
	startDate: z.iso.datetime(),
	endDate: z.iso.datetime(),
	batchNumber: z.number().positive(),
});

export { createRoomGenerationJobSchema };
