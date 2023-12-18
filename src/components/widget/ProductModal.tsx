import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "../../components/common/Modal";
import RichRHFTextField from "../common/RichRHFTextField";
import RHFSelect from "../common/RHFSelect";
import ImageInput from "../common/ImageInput";
import TinyMCE from "./TinyMCE";
import { Product } from "../../services/productService";
import { Category } from "../../services/catService";

interface ProductModalProps {
  data: {
    open: boolean;
    product: Product | null;
  };
  categories?: Category[];
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

export interface FormValues {
  name: string;
  price: number;
  quantity: number;
  category: string;
  subcategory: string;
  description: string;
  thumbnail: File;
  images: File[];
  [key: string]: any;
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

const ProductModal = ({ data, categories = [], onSubmit, onCancel }: ProductModalProps) => {
  const { name = "", category = "", subcategory = "", price = "" as any, quantity = "" as any, description = "" } = data.product ?? {};
  const defaultValues = { name, category, subcategory, price, quantity };

  // prettier-ignore
  const { control, handleSubmit: validateForm, reset, formState: { errors }, watch, setValue } = useForm<FormValues>({ defaultValues });

  const selectedCat = watch("category") || defaultValues.category;

  const subCatOptions = categories.find(c => c._id === selectedCat)?.subcategories ?? [];

  useEffect(() => {
    setValue("subcategory", "");
  }, [selectedCat]);

  useEffect(() => reset(defaultValues), [data]);

  const editorRef = useRef<any>(null);
  const thumbImageRef = useRef<any>(null);
  const mainImagesRef = useRef<any>(null);

  const handleSubmit = (data: FormValues) => {
    data.description = editorRef.current?.getContent() || "<p></p>";

    const thumbnail = thumbImageRef.current?.getImages()[0];
    if (thumbnail) data.thumbnail = thumbnail;

    const formData = new FormData();
    for (const key in data) formData.append(key, data[key]);

    const images = mainImagesRef.current?.getImages();
    if (images.length) images.forEach((img: File) => formData.append("images", img));

    onSubmit(formData);
  };

  return (
    <Modal open={data.open}>
      <Box component='form' width={600} height='80vh' display='flex' flexDirection='column' onSubmit={validateForm(handleSubmit)}>
        <Typography component='h2' variant='h5' textAlign='center' mt={-1}>
          {data.product ? "ویرایش محصول" : "محصول جدید"}
        </Typography>

        <Box overflow='auto' marginY={2} paddingLeft={2}>
          <RichRHFTextField {...inputs.name} error={errors} control={control} />

          <Box display='flex' gap={3}>
            <RHFSelect {...inputs.category} options={categories} error={errors} control={control} />
            {selectedCat && <RHFSelect {...inputs.subcategory} options={subCatOptions} error={errors} control={control} />}
          </Box>

          <Box display='flex' gap={3} mb={2}>
            <RichRHFTextField {...inputs.price} error={errors} control={control} />
            <RichRHFTextField {...inputs.quantity} error={errors} control={control} />
          </Box>

          <ImageInput title='تصویر انگشتی' ref={thumbImageRef} />
          <ImageInput title='تصاویر محصول' multiple ref={mainImagesRef} />

          <Box mt={3}>
            <TinyMCE ref={editorRef} initialValue={description} />
          </Box>
        </Box>

        <Box>
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
