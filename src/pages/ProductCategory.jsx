import React, { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";
import CategoryTable from "./../components/Category/CategoryTable";
import CategoryForm from "./../components/Category/CategoryForm";
import { useTheme } from "@emotion/react";
import AddIcon from "@mui/icons-material/Add";
import Modal from "./../components/Global/Modal";

const ProductCategory = () => {
  const [isOpen, setOpen] = useState(false);

  const openHandler = () => {
    setOpen(true);
  };

  const closeHandler = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const categoryBG = theme.palette.background.paper;
  const borderColor = theme.palette.border.secondary;
  const textColor = theme.palette.text.primary;
  const buttonColor = theme.palette.text.isActive;

  return (
    <section
      style={{
        color: textColor,
        maxWidth: "93vw",
      }}
      className="m-3 mt-5 md:m-5 overflow-auto"
    >
      <div
        style={{
          backgroundColor: categoryBG,
          border: `1px solid ${borderColor}20`,
        }}
        className="flex justify-between p-6 flex-wrap gap-3"
      >
        <h1 className="text-xl font-bold">Category List</h1>
        <Button
          onClick={openHandler}
          sx={{
            backgroundColor: buttonColor,
            color: "white",
            textTransform: "capitalize",
          }}
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add Category
        </Button>
      </div>
      <Modal isOpen={isOpen} closeHandler={closeHandler}>
        <CategoryForm closeHandler={closeHandler} />
      </Modal>

      <CategoryTable />
    </section>
  );
};

export default ProductCategory;
