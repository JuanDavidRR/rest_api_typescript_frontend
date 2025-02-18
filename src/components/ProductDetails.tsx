import { deleteProduct } from "../services/ProductService";
import { Product } from "../types";
import { formatCurrency } from "../utils";
import {
  ActionFunctionArgs,
  Form,
  redirect,
  useFetcher,
  useNavigate,
} from "react-router-dom";

type ProductDetailsProps = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deleteProduct(+params.id);
    return redirect("/");
  }
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const fetcher = useFetcher()
  const navigate = useNavigate();
  const isAvailable = product.availability;
  return (
    <tr className="border-b border-b-slate-300">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCurrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        {/*Fetcher.form allow us to use the action without going to another URL */}
        <fetcher.Form method="POST">
          {/* //Since we need to update the availability based on the ID the form will contain the id as value and name */}
          <button
            type="submit"
            value={product.id}
            name="id"
            className={`${isAvailable ? 'text-black' : 'text-red-500'} rounded-lg p-2 text-sm uppercase font-bold w-full border border-gray-400 cursor-pointer`}
          >
            {isAvailable ? "Available" : "Not available"}
          </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => navigate(`/products/${product.id}/edit`)}
            className="bg-slate-700 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer"
          >
            Update
          </button>
          <Form
            className="w-full"
            method="POST"
            //Make sure to use the same path as the action on router.tsx
            action={`products/${product.id}/delete`}
            //Validate with the user if delete the element or not
            onSubmit={(e) => {
              if (!confirm("Delete?")) {
                e.preventDefault();
              }
            }}
          >
            <input
              type="submit"
              value="Delete"
              className="bg-red-500 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
};

export default ProductDetails;
