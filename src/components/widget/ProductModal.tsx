import { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "../../components/common/Modal";
import RTLTextField from "../common/RTLTextField";
import { Product } from "../../services/productService";

interface ProductModalProps {
  data: {
    open: boolean;
    product: Product | null;
  };
  onSubmit: SubmitHandler<FormValues>; //(data: FormValues) => void;
  onCancel: () => void;
}

export interface FormValues {
  name: string;
  price: number;
}

const ProductModal = ({ data, onSubmit, onCancel }: ProductModalProps) => {
  const { name = "", category = "", subcategory = "", price = 0, quantity = 0, description = "" } = data.product ?? {};
  const defaultValues = { name, category, subcategory, price, quantity, description };

  // prettier-ignore
  const { control, handleSubmit: validateForm, reset, formState: {errors} } = useForm<FormValues>({ defaultValues });

  useEffect(() => reset(defaultValues), [data]);

  return (
    <Modal open={data.open} onClose={onCancel}>
      <form onSubmit={validateForm(onSubmit)}>
        <Controller
          name='name'
          control={control}
          rules={{ required: "نام محصول ضروری است" }}
          render={({ field }) => (
            <RTLTextField {...field} error={Boolean(errors.name)} label='نام محصول' helperText={errors.name?.message} fullWidth />
          )}
        />

        <Controller
          name='price'
          control={control}
          rules={{ required: "قیمت محصول ضروری است", min: { value: 0, message: "قیمت باید عدد مثبتی باشد" } }}
          render={({ field }) => (
            <RTLTextField {...field} type='number' error={Boolean(errors.price)} label='قیمت محصول' helperText={errors.price?.message} fullWidth />
          )}
        />

        <Box sx={{ mt: 4 }}>
          <Button type='submit' variant='contained' color='success'>
            ذخیره
          </Button>
          <Button variant='outlined' color='error' sx={{ mr: 2 }} onClick={onCancel}>
            انصراف
          </Button>
        </Box>
      </form>
    </Modal>
  );
};

export default ProductModal;
