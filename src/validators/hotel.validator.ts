import z from "zod";

const getByIdSchema = z.object({
  id: z.coerce.number().nonnegative(),
});

const createSchema = z.object({
  name: z.string().min(1).max(25),
  address: z.string().min(1).max(500),
});

export { getByIdSchema, createSchema };
