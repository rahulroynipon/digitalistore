import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUploadID, viewProduct } from "../features/product/productSlice";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import ProductImage from "../components/ProductView/ProductImage";
import ProductOverview from "../components/ProductView/ProductOverview";
import useThemeColors from "../components/Global/themeColors";
import ProductViewTable from "../components/ProductView/ProductViewTable";

export default function ProductView() {
  const { background, field, border, text, active } = useThemeColors();
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.product);
  const { id } = useParams();

  useEffect(() => {
    dispatch(viewProduct(id));
    dispatch(clearUploadID());
  }, [dispatch, id]);

  return (
    <section style={{ maxWidth: "93vw" }} className="m-3 mt-5 md:m-5 ">
      <div
        style={{
          backgroundColor: background,
          border: `1px solid ${border}20`,
        }}
      >
        <h1 className="text-2xl p-5">
          <strong>Product View</strong>
        </h1>
      </div>

      {/* main product section */}
      {isLoading ? (
        <Box
          sx={{
            position: "fixed",
            left: "50%",
            top: "50%",
            zIndex: 100,
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress sx={{ color: active }} />
        </Box>
      ) : products?.length > 0 ? (
        <main className="mt-5">
          <section
            style={{
              backgroundColor: background,
              border: `1px solid ${border}20`,
            }}
            className="flex gap-10 p-5 flex-col lg:flex-row"
          >
            <ProductImage />
            <ProductOverview />
          </section>
          <ProductViewTable />
        </main>
      ) : (
        <div className=" px-5 flex flex-col items-center justify-center mt-28">
          <ProductionQuantityLimitsIcon
            sx={{ fontSize: "9rem", color: `${text}80` }}
          />

          <p style={{ color: active }} className="text-3xl mt-3">
            <strong>No Products Found</strong>
          </p>
          <p style={{ color: `${text}80` }} className="text-center mt-2">
            <span>Your search did not match any products.</span> <br />
            <span>Please try again</span>
          </p>
        </div>
      )}
    </section>
  );
}
