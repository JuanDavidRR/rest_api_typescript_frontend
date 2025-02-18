import { boolean, number, object, string, InferOutput, array } from "valibot";

//this type exclude the ID and availability, it's just for creation
export const DraftProductSchema = object({
  name: string(),
  price: number(),
});

export const ProductSchema = object({
  id: number(),
  name: string(),
  price: number(),
  availability: boolean(),
});

export const ProductsSchema = array(ProductSchema)

export type Product = InferOutput<typeof ProductSchema>;
