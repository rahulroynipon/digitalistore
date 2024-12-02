import { useSelector } from "react-redux";
import useThemeColors from "../Global/themeColors";
//import { Table, TableCell, TableRow } from "@mui/material";

export default function ProductViewTable() {
  const { background, field, border, text, active } = useThemeColors();
  const product = useSelector((state) => state.product.products[0]);

  return (
    <>
      <div
        style={{
          backgroundColor: background,
          border: `1px solid ${border}20`,
        }}
        className="mt-7 p-5"
      >
        <h3 className="text-2xl mb-4">
          <strong>Specifications</strong>
        </h3>
        <table className="w-full">
          {product?.productTable?.map((item) => (
            <tr
              key={item?._id}
              className="border-y"
              style={{ borderColor: `${border}20` }}
            >
              <td className="w-1/2 py-2">
                <strong>{item?.label}</strong>
              </td>
              <td className="w-1/2 text-sm">{item?.value}</td>
            </tr>
          ))}
        </table>
      </div>

      <section
        style={{
          backgroundColor: background,
          border: `1px solid ${border}20`,
        }}
        className="mt-7 p-5"
        dangerouslySetInnerHTML={{ __html: product?.description || "" }}
      ></section>
    </>
  );
}
