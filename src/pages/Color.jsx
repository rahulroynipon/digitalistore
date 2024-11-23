import { useTheme } from "@emotion/react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../components/Global/Modal";
import { useState } from "react";
import ColorTable from "../components/Color/ColorTable";
import ColorForm from "../components/Color/ColorForm";

export default function Color() {
  const [isOpen, setOpen] = useState(false);

  const openHandler = () => {
    setOpen(true);
  };

  const closeHandler = () => {
    setOpen(false);
  };

  const theme = useTheme();
  const colorBG = theme.palette.background.paper;
  const borderColor = theme.palette.border.secondary;
  const textColor = theme.palette.text.secondary.secondary;
  const buttonColor = theme.palette.text.isActive;
  return (
    <section
      style={{
        color: textColor,
        maxWidth: "100vw",
      }}
      className="m-3 mt-5 md:m-5 rounded-lg overflow-auto"
    >
      <div
        style={{
          backgroundColor: colorBG,
          border: `1px solid ${borderColor}20`,
        }}
        className="flex justify-between p-6 flex-wrap gap-3"
      >
        <h1 className="text-xl font-bold">Color List</h1>
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
          Add Color
        </Button>
      </div>

      <Modal isOpen={isOpen} closeHandler={closeHandler}>
        <ColorForm closeHandler={closeHandler} />
      </Modal>

      <ColorTable />
    </section>
  );
}
