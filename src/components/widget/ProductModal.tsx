import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "../../components/common/Modal";
import RichRHFTextField from "../common/RichRHFTextField";
import RHFSelect from "../common/RHFSelect";
import { Product } from "../../services/productService";
import useCategories from "../../hooks/useCategories";

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
  quantity: number;
  category: string;
  subcategory: string;
}

const inputs = {
  name: { name: "name", label: "نام محصول", rules: { required: "نام محصول ضروری است" } },
  price: {
    name: "price",
    label: "قیمت",
    unit: "تومان",
    type: "number",
    rules: { required: "قیمت محصول ضروری است", min: { value: 0, message: "قیمت باید عدد مثبتی باشد" } }
  },
  quantity: {
    name: "quantity",
    label: "موجودی در انبار",
    unit: "عدد",
    type: "number",
    rules: { required: "موجودی محصول ضروری است", min: { value: 0, message: "موجودی باید عدد مثبتی باشد" } }
  },
  category: {
    name: "category",
    label: "گروه",
    rules: { required: "گروه محصول ضروری است" }
  },
  subcategory: {
    name: "subcategory",
    label: "زیر گروه",
    rules: { required: "زیر گروه محصول ضروری است" }
  }
};

const ProductModal = ({ data, onSubmit, onCancel }: ProductModalProps) => {
  const { name = "", category = "", subcategory = "", price = 0, quantity = 0, description = "" } = data.product ?? {};
  const defaultValues = { name, category, subcategory, price, quantity, description };

  // prettier-ignore
  const { control, handleSubmit: validateForm, reset, formState: { errors }, watch } = useForm<FormValues>({ defaultValues });
  const selectedCat = watch("category");

  useEffect(() => reset(defaultValues), [data]);

  const { data: categories } = useCategories();

  return (
    <Modal open={data.open}>
      <Box component='form' width={500} onSubmit={validateForm(onSubmit)}>
        <RichRHFTextField {...inputs.name} error={errors} control={control} />

        <Box display='flex' gap={3}>
          <RHFSelect {...inputs.category} options={categories} error={errors} control={control} />
          {selectedCat && (
            <RHFSelect
              {...inputs.subcategory}
              options={categories?.find(c => c._id === selectedCat)?.subcategories}
              error={errors}
              control={control}
            />
          )}
        </Box>

        <Box display='flex' gap={3}>
          <RichRHFTextField {...inputs.price} error={errors} control={control} />
          <RichRHFTextField {...inputs.quantity} error={errors} control={control} />
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
