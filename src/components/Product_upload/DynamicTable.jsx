import React from "react";
import { FieldArray, Field, ErrorMessage } from "formik";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
  IconButton,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useTheme } from "@emotion/react";

export const DynamicTable = ({ values, errors, touched, isSubmitting }) => {
  const theme = useTheme();
  const bgColor = theme.palette.background.paper;
  const fieldColor = theme.palette.background.default;
  const borderColor = theme.palette.border.secondary;
  const textColor = theme.palette.text.primary;
  const btnColor = theme.palette.text.isActive;

  return (
    <div className="mb-4 mt-7 w-full overflow-x-auto">
      <label className=" mb-4 text-2xl inline-block font-semibold opacity-85">
        Features
      </label>
      <FieldArray name="table">
        {({ remove, push }) => (
          <TableContainer sx={{ boxShadow: "none", overflowX: "auto" }}>
            <Table sx={{ tableLayout: "auto" }}>
              <TableHead>
                <TableRow>
                  <TableCell>Label</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell align="center">Required</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {values.map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Field
                        name={`table[${index}].label`}
                        placeholder="Enter label"
                        disabled={isSubmitting}
                        style={{
                          backgroundColor: `${fieldColor}45`,
                        }}
                        className={`py-3 px-3 outline-none rounded focus:ring-1 
                            ${
                              errors.table?.[index]?.label
                                ? "ring-red-500 ring-1"
                                : "focus:ring-blue-500"
                            }`}
                      />
                    </TableCell>
                    <TableCell>
                      <Field
                        name={`table[${index}].value`}
                        placeholder="Enter value"
                        disabled={isSubmitting}
                        style={{
                          backgroundColor: `${fieldColor}45`,
                        }}
                        className={`py-3 px-3 outline-none rounded focus:ring-1 
                            ${
                              errors.table?.[index]?.value
                                ? "ring-red-500 ring-1"
                                : "focus:ring-blue-500"
                            }`}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Field
                        type="checkbox"
                        name={`table[${index}].required`}
                        as={Checkbox}
                        style={{ color: btnColor }}
                        disabled={isSubmitting}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        disabled={isSubmitting}
                        onClick={() => remove(index)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="my-5">
              <Button
                onClick={() => push({ label: "", value: "", required: false })}
                variant="text"
                startIcon={<Add />}
                disabled={isSubmitting}
                sx={{
                  color: btnColor,
                  border: "none",
                  boxShadow: "none",
                  position: "sticky",
                  left: "0",
                }}
              >
                Add Row
              </Button>
            </div>
          </TableContainer>
        )}
      </FieldArray>
    </div>
  );
};
