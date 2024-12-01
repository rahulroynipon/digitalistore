import { useSelector } from "react-redux";
import useThemeColors from "../Global/themeColors";
import { useMemo } from "react";

export default function ProductOverview() {
  const { background, field, border, text, active } = useThemeColors();
  const product = useSelector((state) => state.product.products[0]);

  const discountAmount = useMemo(() => {
    if (!product?.price || !product?.discount) return 0;
    return (product.discount / 100) * product.price;
  }, [product?.discount, product?.price]);

  const discountedPrice = useMemo(() => {
    if (!product?.price) return 0;
    return product.price - discountAmount;
  }, [product?.price, discountAmount]);

  return (
    <div
      className="w-full flex flex-col gap-3"
      style={{ backgroundColor: background, color: text }}
    >
      {/* Product Title */}
      <p className="text-xl font-bold">
        {product?.title || "No Product Available"}
      </p>

      {/* Discount Section */}
      {product?.discount > 0 ? (
        <div>
          <span
            style={{ backgroundColor: field }}
            className="inline-block px-7 py-4"
          >
            <p className="text-sm relative">Special Price </p>
            <p className="text-2xl font-semibold mt-1">
              Tk {discountedPrice?.toFixed(2)}
            </p>
          </span>

          <p className="mt-1" style={{ color: active }}>
            Save Extra Tk {discountAmount?.toFixed(2)} on online order
          </p>
        </div>
      ) : null}

      <div>
        <p className="text-sm">Regular Price</p>
        <p className="text-2xl">Tk {product?.price || 0}</p>
        <p className="text-xl text-red-500">{product?.discount || 0}% off</p>
      </div>

      {/* product stock and discount */}

      <p className="my-3">
        <span
          className="p-3 text-white shadow"
          style={{ backgroundColor: product?.stack > 0 ? active : "#ef4444" }}
        >
          {product?.stack > 0 ? `Stock ${product?.stack}` : "Out of Stock"}
        </span>
      </p>

      {/* product overview */}

      <div>
        <p className="text-xl mb-2 inline-block">
          <strong>Quick Overview</strong>
        </p>

        <ul className="list-disc ml-5">
          {product?.productTable?.map((item) =>
            item?.required ? (
              <li key={item?._id} className="mb-1 font-sans">
                <span>{item?.label} </span>
                <span>- {item?.value}</span>
              </li>
            ) : null
          )}
        </ul>
      </div>
    </div>
  );
}
