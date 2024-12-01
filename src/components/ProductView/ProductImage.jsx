import { useState } from "react";
import { useSelector } from "react-redux";

export default function ProductImage() {
  const product = useSelector((state) => state.product.products[0]);
  const [selectImage, setImage] = useState(0);

  return (
    <div className="w-full">
      <div className="h-[27rem] bg-white">
        <img
          className="w-full h-full object-contain"
          src={product?.images[selectImage]}
          alt="product-image"
        />
      </div>

      <div className="flex gap-3 flex-wrap mt-5">
        {product?.images?.map((item, index) => (
          <div
            key={index}
            onClick={() => setImage(index)}
            className={`${
              selectImage == index ? "ring" : ""
            } h-20 w-20 bg-white`}
          >
            <img
              src={item}
              alt={`product-image-${index}`}
              className="h-full w-full object-contain"
            ></img>
          </div>
        ))}
      </div>
    </div>
  );
}
