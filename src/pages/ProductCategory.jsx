import React from "react";
import { Grid } from "@mui/material";
import CategoryForm from "./../components/Category/CategoryForm";
import CategoryTable from "./../components/Category/CategoryTable";

const ProductCategory = () => {
  const categories = [
    {
      id: 1,
      name: "Electronics",
      subcategories: ["Gadgets", "Laptops", "Accessories"],
      image: null,
    },
    {
      id: 2,
      name: "Clothing",
      subcategories: ["Men", "Women", "Kids"],
      image: null,
    },
    {
      id: 3,
      name: "Furniture",
      subcategories: ["Home Decor", "Office Furniture"],
      image: null,
    },
    {
      id: 1,
      name: "Electronics",
      subcategories: ["Gadgets", "Laptops", "Accessories"],
      image: null,
    },
    {
      id: 2,
      name: "Clothing",
      subcategories: ["Men", "Women", "Kids"],
      image: null,
    },
    {
      id: 3,
      name: "Furniture",
      subcategories: ["Home Decor", "Office Furniture"],
      image: null,
    },
    {
      id: 1,
      name: "Electronics",
      subcategories: ["Gadgets", "Laptops", "Accessories"],
      image: null,
    },
    {
      id: 2,
      name: "Clothing",
      subcategories: ["Men", "Women", "Kids"],
      image: null,
    },
    {
      id: 3,
      name: "Furniture",
      subcategories: ["Home Decor", "Office Furniture"],
      image: null,
    },
    {
      id: 1,
      name: "Electronics",
      subcategories: ["Gadgets", "Laptops", "Accessories"],
      image: null,
    },
    {
      id: 2,
      name: "Clothing",
      subcategories: ["Men", "Women", "Kids"],
      image: null,
    },
    {
      id: 3,
      name: "Furniture",
      subcategories: ["Home Decor", "Office Furniture"],
      image: null,
    },
    {
      id: 1,
      name: "Electronics",
      subcategories: ["Gadgets", "Laptops", "Accessories"],
      image: null,
    },
    {
      id: 2,
      name: "Clothing",
      subcategories: ["Men", "Women", "Kids"],
      image: null,
    },
    {
      id: 3,
      name: "Furniture",
      subcategories: ["Home Decor", "Office Furniture"],
      image: null,
    },
    {
      id: 1,
      name: "Electronics",
      subcategories: ["Gadgets", "Laptops", "Accessories"],
      image: null,
    },
    {
      id: 2,
      name: "Clothing",
      subcategories: ["Men", "Women", "Kids"],
      image: null,
    },
    {
      id: 3,
      name: "Furniture",
      subcategories: ["Home Decor", "Office Furniture"],
      image: null,
    },
    {
      id: 1,
      name: "Electronics",
      subcategories: ["Gadgets", "Laptops", "Accessories"],
      image: null,
    },
    {
      id: 2,
      name: "Clothing",
      subcategories: ["Men", "Women", "Kids"],
      image: null,
    },
    {
      id: 3,
      name: "Furniture",
      subcategories: ["Home Decor", "Office Furniture"],
      image: null,
    },
    {
      id: 1,
      name: "Electronics",
      subcategories: ["Gadgets", "Laptops", "Accessories"],
      image: null,
    },
    {
      id: 2,
      name: "Clothing",
      subcategories: ["Men", "Women", "Kids"],
      image: null,
    },
    {
      id: 3,
      name: "Furniture",
      subcategories: ["Home Decor", "Office Furniture"],
      image: null,
    },
  ];

  return (
    <div className="px-5 md:px-10 pt-5">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={5}>
          <CategoryForm />
        </Grid>
        <Grid item xs={12} md={6} lg={7}>
          <CategoryTable categories={categories} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductCategory;
