import {
  Link,
  Form,
  useActionData,
  ActionFunctionArgs,
  redirect
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

export async function action({ request }: ActionFunctionArgs) {
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

  //Adding the function to add product
  await addProduct(data)

  return redirect('/');
}

function NewProduct() {
  const error = useActionData() as string;

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl black font-black text-slate-500">
          Add New Product
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
        
      <ProductForm/>

        <input
          type="submit"
          className="mt-5 w-full bg-slate-800 p-2 text-white font-bold text-lg cursor-pointer rounded"
          value="Add product"
        />
      </Form>
    </>
  );
}

export default NewProduct;
