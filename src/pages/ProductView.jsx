import { useTheme } from "@emotion/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { viewProduct } from "../features/product/productSlice";
import { Table, TableCell, TableRow } from "@mui/material";
import ReactHtmlParser from "react-html-parser";

export default function ProductView() {
  const dispatch = useDispatch();
  const { products, isLoading, viewProductId } = useSelector(
    (state) => state.product
  );
  const [selectImage, setImage] = useState(0);

  useEffect(() => {
    dispatch(viewProduct(viewProductId));
  }, [dispatch]);

  const theme = useTheme();
  const bgColor = theme.palette.background.paper;
  const fieldColor = theme.palette.background.default;
  const borderColor = theme.palette.border.secondary;
  const textColor = theme.palette.text.primary;
  const btnColor = theme.palette.text.isActive;
  return (
    <section style={{ maxWidth: "93vw" }} className="m-3 mt-5 md:m-5 ">
      <div
        style={{
          backgroundColor: bgColor,
          border: `1px solid ${borderColor}20`,
        }}
      >
        <h1 className="text-2xl p-5">
          <strong>Product View</strong>
        </h1>
      </div>

      {/* main product section */}
      <main className="mt-5 ">
        {/* 1st part of product */}
        <section
          style={{
            backgroundColor: bgColor,
            border: `1px solid ${borderColor}20`,
          }}
          className="flex gap-10 p-5 flex-col md:flex-row"
        >
          <div className="w-full">
            <div className="h-[25rem] bg-white">
              <img
                className="w-full h-full object-contain"
                src={products[0]?.images[selectImage]}
                alt="product-image"
              />
            </div>
            <div className="flex gap-3 mt-5">
              {products[0]?.images?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setImage(index)}
                  className={`${selectImage == index ? "ring" : ""}`}
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

          {/* short overview */}
          <div className="w-full flex flex-col gap-3">
            <p className="text-xl">
              <strong>{products[0]?.title}</strong>
            </p>

            {products[0]?.discount > 0 ? (
              <div>
                <span
                  style={{ backgroundColor: fieldColor }}
                  className="inline-block p-3"
                >
                  <p className="text-sm">Special Price</p>
                  <p className="text-2xl font-semibold">
                    Tk{" "}
                    {(
                      ((100 - products[0]?.discount) / 100) *
                      products[0]?.price
                    ).toFixed(2)}
                  </p>
                </span>
                <p style={{ color: btnColor }}>
                  Save Extra Tk{" "}
                  {((products[0]?.discount / 100) * products[0]?.price).toFixed(
                    2
                  )}{" "}
                  on online order
                </p>
              </div>
            ) : null}

            <div>
              <p className="text-sm">Regular Price</p>
              <p className="text-2xl">Tk {products[0]?.price || 0}</p>
            </div>

            {/* <div className="my-3">
              {products[0]?.stack > 0 ? (
                <p className="text-2xl">Stock - {products[0]?.stack}</p>
              ) : null}
            </div> */}

            {/* quick overview */}
            <div>
              <p className="text-xl mb-2 inline-block">
                <strong>Quick Overview</strong>
              </p>
              <ul className="list-disc ml-5">
                {products[0]?.productTable?.map((item) =>
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
        </section>

        <section
          style={{
            backgroundColor: bgColor,
            border: `1px solid ${borderColor}20`,
          }}
          className="mt-7 p-5"
        >
          <p className="text-2xl font-semibold mb-5">Specifications</p>
          <Table>
            {products[0]?.productTable?.map((item) => (
              <TableRow key={item?._id}>
                <TableCell>
                  <strong>{item?.label}</strong>
                </TableCell>
                <TableCell>{item?.value}</TableCell>
              </TableRow>
            ))}
          </Table>
        </section>

        <section
          style={{
            backgroundColor: bgColor,
            border: `1px solid ${borderColor}20`,
          }}
          className="mt-7 p-5"
        >
          {ReactHtmlParser(products[0]?.description)}
        </section>
      </main>
    </section>
  );
}
