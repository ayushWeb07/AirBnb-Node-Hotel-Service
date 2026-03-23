import z from "zod";

const getByIdSchema = z.object({
  id: z.coerce.number().nonnegative(),
});

const removeSchema = z.object({
  id: z.coerce.number().nonnegative(),
});

const createSchema = z.object({
  name: z.string().min(1).max(20),
  address: z.string().min(1).max(500),
});

const updateBodySchema = z.object({
  name: z.string().min(1).max(20).optional(),
  address: z.string().min(1).max(500).optional(),
});

const updateUrlParamsSchema = z.object({
  id: z.coerce.number().nonnegative(),
});

export { getByIdSchema, createSchema, removeSchema, updateBodySchema, updateUrlParamsSchema };
