import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Box,
  Typography,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

const CategoryTable = ({ categories }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(null);

  const toggleRow = (id) => {
    setOpen((prevOpen) => (prevOpen === id ? null : id));
  };

  return (
    <TableContainer
      sx={{ backgroundColor: theme.palette.color.navbar, borderRadius: 2 }}
      style={{ border: `1px solid ${theme.palette.divider}` }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              style={{ color: theme.palette.text.primary, fontSize: 18 }}
            >
              Category
            </TableCell>
            <TableCell
              style={{ color: theme.palette.text.primary, fontSize: 18 }}
            >
              Subcategories
            </TableCell>
            <TableCell
              style={{ color: theme.palette.text.primary, fontSize: 18 }}
            >
              Image
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <React.Fragment key={category.id}>
              <TableRow>
                <TableCell
                  style={{
                    color: theme.palette.text.primary,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  {category.name}
                </TableCell>
                <TableCell
                  style={{
                    color: theme.palette.text.primary,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  }}
                >
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => toggleRow(category.id)}
                  >
                    {open === category.id ? (
                      <KeyboardArrowUp />
                    ) : (
                      <KeyboardArrowDown />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell
                  style={{ borderBottom: `1px solid ${theme.palette.divider}` }}
                >
                  {category.image ? (
                    <img
                      src={category.image}
                      alt="Category"
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <span style={{ color: theme.palette.text.primary }}>
                      No Image
                    </span>
                  )}
                </TableCell>
                <TableCell />
              </TableRow>

              <TableRow>
                <TableCell
                  style={{
                    paddingBottom: 0,
                    paddingTop: 0,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                  }}
                  colSpan={4}
                >
                  <Collapse
                    in={open === category.id}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Box margin={1}>
                      <Typography variant="subtitle1">Subcategories</Typography>
                      {category.subcategories.map((sub, index) => (
                        <Typography
                          key={index}
                          style={{
                            color: theme.palette.text.primary,
                            marginTop: 10,
                            marginLeft: 30,
                          }}
                        >
                          {sub}
                        </Typography>
                      ))}
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoryTable;
