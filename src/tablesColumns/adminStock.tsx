import InputBase from "@mui/material/InputBase";

const tableColumns = [
  {
    label: "نام محصول",
    path: "name"
    // align: "right"
  },
  {
    label: "موجودی در انبار (عدد)",
    key: "qty",
    content: (product: any, { onQtyChange, quantities }: any) => (
      <InputBase
        type='number'
        name={product.i}
        value={quantities[product.i]?.value ?? ""}
        onChange={onQtyChange}
        sx={{ px: 2, width: 150, ...(quantities[product.i]?.touched && { backgroundColor: "#000", color: "#fff" }) }}
      />
    )
  },
  {
    label: "قیمت محصول (تومان)",
    key: "price",
    content: (product: any, { onPriceChange, prices }: any) => (
      <InputBase
        type='number'
        name={product.i}
        value={prices[product.i]?.value ?? ""}
        onChange={onPriceChange}
        sx={{ px: 2, width: 150, ...(prices[product.i]?.touched && { backgroundColor: "#000", color: "#fff" }) }}
      />
    )
  }
];

export default tableColumns;
