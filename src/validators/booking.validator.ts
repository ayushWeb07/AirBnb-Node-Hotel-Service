import z from "zod";


const createSchema = z.object({
    status: z.enum(["pending", "confirmed", "cancelled"]),
    idempotentKey: z.uuidv4(),
});

export { createSchema };
