import React from "react";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductTable from "../components/Product_list/ProductTable";

export default function ProductList() {
  const navigate = useNavigate();

  const addProduct = () => {
    navigate("/products/upload");
  };

  const theme = useTheme();
  const isActiveText = theme.palette.text.isActive;
  const tableColor = theme.palette.background.default;
  const tableTextColor = theme.palette.text.secondary;
  const rowColor = theme.palette.background;
  const rowBorderColor = theme.palette.divider;
  const textColor = theme.palette.text.primary;

  return (
    <section
      style={{
        color: textColor,
      }}
      className="m-3 mt-5 md:m-5 rounded-lg overflow-auto max-w-[93vw] md:max-w-[94vw]  lg:max-w-[68vw] xl:max-w-[100vw]"
    >
      <div
        style={{ color: textColor, backgroundColor: rowColor.paper }}
        className="flex justify-between p-6 flex-wrap gap-3"
      >
        <h1 className="text-xl font-bold">Best Selling Products</h1>
        <Button
          variant="text"
          startIcon={<AddIcon />}
          sx={{ color: isActiveText, fontWeight: "bold" }}
          onClick={addProduct}
        >
          Add Product
        </Button>
      </div>

      <ProductTable />
    </section>
  );
}
