import { safeParse } from "valibot";
import {
  DraftProductSchema,
  Product,
  ProductSchema,
  ProductsSchema,
} from "../types";
import axios from "axios";
import { toBoolean } from "../utils";

//This type can be get when you hover over the action function on NewProduct
type ProductData = {
  [k: string]: FormDataEntryValue;
};

//Add a new product based on the data collected from the form
export async function addProduct(data: ProductData) {
  try {
    //assign the schema to the result
    const result = safeParse(DraftProductSchema, {
      //we set an object to custom the result, for example convert the data into a number
      name: data.name,
      price: +data.price,
    });
    if (result.success) {
      //Send the data to the backend
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      });
    } else {
      throw new Error("Invalid data");
    }
  } catch (error) {
    console.log(error);
  }
}

//Get the products
export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const { data } = await axios(url);
    const result = safeParse(ProductsSchema, data.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Invalid data");
    }
  } catch (error) {
    console.log(error);
  }
}

//Get the products
export async function getProductById(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } = await axios(url);
    const result = safeParse(ProductSchema, data.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Invalid data");
    }
  } catch (error) {
    console.log(error);
  }
}

//Update product
export async function updateProduct(data: ProductData, id: Product["id"]) {
  try {
    //assign the schema to the result
    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: +data.price,
      //Using a util function to convert str to boolean
      availability: toBoolean(data.availability.toString()),
    });
    if (result.success) {
      //Send the data to the backend
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
      await axios.put(url, result.output);
    } else {
      throw new Error("Invalid data");
    }
  } catch (error) {
    console.log(error);
  }
}

//Delete product
export async function deleteProduct(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.delete(url);
  } catch (error) {
    console.log(error);
  }
}

//Update availability of a product
export async function updateProductAvailability(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.patch(url);
  } catch (error) {
    console.log(error);
  }
}
