import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import StripedTable from "../../components/widget/StripedTable";
import Pagination from "../../components/common/Pagination";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import useProducts from "../../hooks/useProducts";
import useEditProduct from "../../hooks/useEditProduct";

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

interface InputsData {
  touched: boolean;
  value: number;
}

const AdminStockPage = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const { data, isLoading } = useProducts({ page, perPage });
  const { products = [], totalCount = 0 } = data ?? {};

  const bulkEditProducts = useEditProduct(true);

  const handlePageChange = (page: number) => setPage(page);
  const handlePerPageChange = (perPage: number) => {
    setPage(1);
    setPerPage(perPage);
  };

  const [quantities, setQuantities] = useState<InputsData[]>([] as InputsData[]);
  const [prices, setPrices] = useState<InputsData[]>([] as InputsData[]);

  const init = () => {
    setQuantities(products.map(p => ({ touched: false, value: p.quantity })));
    setPrices(products.map(p => ({ touched: false, value: p.price })));
  };

  useEffect(init, [products]);

  const onQtyChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(target.value);
    if (!isNaN(value) && value > -1) setQuantities(prevQtys => prevQtys.map((d, i) => (i === +target.name ? { touched: true, value } : d)));
  };

  const onPriceChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(target.value);
    if (!isNaN(value) && value > -1) setPrices(prevPrices => prevPrices.map((d, i) => (i === +target.name ? { touched: true, value } : d)));
  };

  const handleSubmit = () => {
    type TProduct = { quantity?: number; price?: number };

    const touchedProducts: { id: string; product: TProduct }[] = [];

    products.forEach((p, i) => {
      const product: TProduct = {
        ...(quantities[i].touched && { quantity: quantities[i].value }),
        ...(prices[i].touched && { price: prices[i].value })
      };

      if ((product.price ?? product.quantity) !== undefined) touchedProducts.push({ id: p._id, product });
    });

    setQuantities(prevQtys => prevQtys.map(q => ({ ...q, touched: false })));
    setPrices(prevPrices => prevPrices.map(p => ({ ...p, touched: false })));

    bulkEditProducts.mutate(touchedProducts);
  };

  const handleKeyPress = (event: KeyboardEvent) => event.key === "Escape" && init();

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const someInputsChanged = quantities.some(q => q.touched) || prices.some(p => p.touched);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingLeft: 5, mb: 3 }}>
        <Typography variant='h4' component='h2' mb={5}>
          مدیریت موجودی و قیمت‌ها
        </Typography>

        <Box>
          {someInputsChanged && (
            <Button variant='contained' color='error' onClick={init}>
              {bulkEditProducts.isPending ? <LoadingSpinner size={24} /> : "انصراف"}
            </Button>
          )}
          <Button variant='contained' color='success' disabled={!someInputsChanged} onClick={handleSubmit} sx={{ width: "150px", mr: 3 }}>
            {bulkEditProducts.isPending ? <LoadingSpinner size={24} /> : "ثبت تغییرات"}
          </Button>
        </Box>
      </Box>

      {isLoading && <LoadingSpinner />}

      {!products.length && !isLoading && <Typography textAlign='center'>محصولی وجود ندارد! یک محصول جدید اضافه کنید.</Typography>}

      {products.length && !isLoading && (
        <Pagination
          itemsTitle='محصول'
          itemsCount={totalCount}
          page={page}
          perPage={perPage}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
        >
          <StripedTable
            columns={tableColumns}
            rowsData={products.map((p, i) => ({ ...p, i: String(i) }))}
            actions={{ qty: { onQtyChange, quantities }, price: { onPriceChange, prices } }}
          />
        </Pagination>
      )}
    </>
  );
};

export default AdminStockPage;
