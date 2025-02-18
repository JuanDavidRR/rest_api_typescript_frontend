import { Product } from "../types";

type ProductFormProps = {
  product?: Product;
};

const ProductForm = ({ product }: ProductFormProps) => {
  return (
    <>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="name">
          Product name:
        </label>
        <input
          id="name"
          type="text"
          className="mt-2 block w-full p-3 rounded-lg border border-slate-400"
          placeholder="Nombre del Producto"
          name="name"
          defaultValue={product?.name}
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-800" htmlFor="price">
          Price:
        </label>
        <input
          id="price"
          type="number"
          className="mt-2 block w-full p-3 rounded-lg border border-slate-400"
          placeholder="Precio Producto. ej. 200, 300"
          name="price"
          defaultValue={product?.price}
        />
      </div>
    </>
  );
};

export default ProductForm;
