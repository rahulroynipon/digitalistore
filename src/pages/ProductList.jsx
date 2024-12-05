import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductTable from "../components/Product_list/ProductTable";
import { useDispatch, useSelector } from "react-redux";
import useThemeColors from "../components/Global/themeColors";
import SelectedForm from "../components/Global/SelectedForm";
import { getCategory } from "../features/category/categorySlice";
import { getBrand } from "../features/brand/brandSlice";
import { getProduct } from "../features/product/productSlice";

export default function ProductList() {
  const { background, field, border, text, active } = useThemeColors();
  const navigate = useNavigate();
  const { totalProduct } = useSelector((state) => state.product);
  const { brands } = useSelector((state) => state.brand);
  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [categoryFilter, setCategoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");

  const addProduct = () => {
    navigate("/products/upload");
  };

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getBrand());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProduct({ category: categoryFilter, brand: brandFilter }));
  }, [dispatch, categoryFilter, brandFilter]);

  return (
    <section
      style={{
        color: text,
      }}
      className="m-3 mt-5 md:m-5  overflow-auto max-w-[93vw] md:max-w-[94vw]  lg:max-w-[74vw] xl:max-w-[80vw]  2xl:max-w-[100vw]"
    >
      {/* table title */}
      <div
        style={{ color: text, backgroundColor: background }}
        className="flex justify-between px-3 py-5 md:p-6 flex-wrap gap-3"
      >
        <h1 className="text-xl font-bold">Product List ({totalProduct}) </h1>

        <Button
          variant="text"
          startIcon={<AddIcon />}
          sx={{ color: active, fontWeight: "bold" }}
          onClick={addProduct}
          inputProps={{ "aria-label": "Without label" }}
        >
          Add Product
        </Button>
      </div>

      <div
        className="px-3 md:px-6 pb-3 flex gap-3 flex-col md:flex-row"
        style={{ backgroundColor: background }}
      >
        <SelectedForm
          label="All Categories"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          options={categories || []}
        />
        <SelectedForm
          label="All Brands"
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          options={brands || []}
        />
      </div>

      <ProductTable />
    </section>
  );
}
