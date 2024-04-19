import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const rowSchemaAttrValues = z.object({
  name: z.string(),
  quantity: z.number(),
  color: z.string(),
  price: z.number(),
});

export type TaskAttrVal = z.infer<typeof rowSchemaAttrValues>;
