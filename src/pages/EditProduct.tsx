import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
  redirect,
  LoaderFunctionArgs,
  useLoaderData,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { getProductById, updateProduct } from "../services/ProductService";
import { Product } from "../types";
import ProductForm from "../components/ProductForm";

//extract the information from the product based on the ID using params
export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    //Converting the params id into a number if the value is not udefined
    const product = await getProductById(+params.id);
    //If the product was not found, throw 404
    if (!product) {
      throw new Response("", { status: 404, statusText: "Product not found" });
    }
    return product;
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  //Get the data from the form response
  const data = Object.fromEntries(await request.formData());
  let error = "";
  //validate if the response is empty
  if (Object.values(data).includes("")) {
    error = "All fields are mandatory";
  }
  //return the value of error if there is one to use it on the component
  if (error.length) {
    return error;
  }

  //Update product function from services
  //Validating that the id is a number
  if (params.id !== undefined) {
    await updateProduct(data, +params.id);
    return redirect("/");
  }
}

const availabilityOptions = [
  { name: "Available", value: true },
  { name: "Not Available", value: false },
];

function EditProduct() {
  const error = useActionData() as string;
  //Make the product information available through the loader
  const product = useLoaderData() as Product;
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl black font-black text-slate-500">
          Update Product
        </h2>
        <Link
          className="rounded-md bg-slate-700 p-3 text-sm font-bold text-white shadow-sm hover:bg-slate-800 duration-200"
          to="/"
        >
          Return to products
        </Link>
      </div>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form className="mt-10" method="POST" action="">
        <ProductForm product={product}/>

        <div className="mb-4">
          <label className="text-gray-800" htmlFor="availability">
            Availability:
          </label>
          <select
            id="availability"
            className="mt-2 block w-full p-3 rounded-lg border border-slate-400"
            name="availability"
            defaultValue={product?.availability.toString()}
          >
            {availabilityOptions.map((option) => (
              <option key={option.name} value={option.value.toString()}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <input
          type="submit"
          className="mt-5 w-full bg-slate-800 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Update product"
        />
      </Form>
    </>
  );
}

export default EditProduct;
