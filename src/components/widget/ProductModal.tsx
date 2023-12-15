import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "../../components/common/Modal";
import RHFTextField from "../common/RHFTextField";
import { Product } from "../../services/productService";

interface ProductModalProps {
  data: {
    open: boolean;
    product: Product | null;
  };
  onSubmit: (data: FormValues) => void;
  onCancel: () => void;
}

export interface FormValues {
  name: string;
  price: number;
}

const inputs = {
  name: { name: "name", label: "نام محصول", rules: { required: "نام محصول ضروری است" } },
  price: {
    name: "price",
    label: "قیمت محصول",
    type: "number",
    rules: { required: "قیمت محصول ضروری است", min: { value: 0, message: "قیمت باید عدد مثبتی باشد" } }
  },
  quantity: {
    name: "quantity",
    label: "تعداد موجودی",
    type: "number",
    rules: { required: "موجودی محصول ضروری است", min: { value: 0, message: "موجودی باید عدد مثبتی باشد" } }
  }
};

const ProductModal = ({ data, onSubmit, onCancel }: ProductModalProps) => {
  const { name = "", category = "", subcategory = "", price = 0, quantity = 0, description = "" } = data.product ?? {};
  const defaultValues = { name, category, subcategory, price, quantity, description };

  // prettier-ignore
  const { control, handleSubmit: validateForm, reset, formState: {errors} } = useForm<FormValues>({ defaultValues });

  useEffect(() => reset(defaultValues), [data]);

  return (
    <Modal open={data.open}>
      <Box component='form' width={500} onSubmit={validateForm(onSubmit)}>
        <RHFTextField {...inputs.name} error={errors} control={control} />

        <Box display='flex' mt={3} gap={3}>
          <RHFTextField {...inputs.price} error={errors} control={control} />
          <RHFTextField {...inputs.quantity} error={errors} control={control} />
        </Box>

        <Box sx={{ mt: 4 }}>
          <Button type='submit' variant='contained' color='success'>
            ذخیره
          </Button>
          <Button variant='outlined' color='error' sx={{ mr: 2 }} onClick={onCancel}>
            انصراف
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductModal;
