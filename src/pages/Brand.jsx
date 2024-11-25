import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import BrandTable from "../components/Brand/BrandTable";
import Modal from "../components/Global/Modal";
import BrandForm from "../components/Brand/BrandForm";
import { useState } from "react";

export default function Brand() {
  const [isOpen, setOpen] = useState(false);

  const openHandler = () => {
    setOpen(true);
  };

  const closeHandler = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const brandBG = theme.palette.background.paper;
  const borderColor = theme.palette.border.secondary;
  const textColor = theme.palette.text.secondary.secondary;
  const buttonColor = theme.palette.text.isActive;
  return (
    <section
      style={{
        color: textColor,
        maxWidth: "93vw",
      }}
      className="m-3 mt-5 md:m-5 rounded-lg overflow-auto"
    >
      <div
        style={{
          backgroundColor: brandBG,
          border: `1px solid ${borderColor}20`,
        }}
        className="flex justify-between p-6 flex-wrap gap-3"
      >
        <h1 className="text-xl font-bold">Brand List</h1>
        <Button
          sx={{
            backgroundColor: buttonColor,
            color: "white",
            textTransform: "capitalize",
          }}
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openHandler}
        >
          Add Brand
        </Button>
      </div>

      <Modal isOpen={isOpen} closeHandler={closeHandler}>
        <BrandForm closeHandler={closeHandler} />
      </Modal>

      <BrandTable />
    </section>
  );
}
