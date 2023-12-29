import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RHFTextField from "../components/common/RHFTextField";
import useUser from "../hooks/useUser";
// import PersianDatePicker from "../components/common/PersianDatePicker";

export interface FormValues {
  firstname: string;
  lastname: string;
  address: string;
  phoneNumber: string;
  [key: string]: any;
}

const message = "مقدار وارد شده صحیح نیست";

const inputs = {
  firstname: {
    name: "firstname",
    label: "نام",
    rules: { required: "نام ضروری است", pattern: { value: /^[\u0600-\u06FF\s]+$/u, message } }
  },
  lastname: {
    name: "lastname",
    label: "نام خانوادگی",
    rules: { required: "نام خانوادگی ضروری است", pattern: { value: /^[\u0600-\u06FF\s]+$/u, message } }
  },
  address: {
    name: "address",
    label: "آدرس",
    multiline: true,
    maxRows: 4,
    rules: { required: "آدرس ضروری است", pattern: { value: /^[\u0600-\u06FF\s\-]+$/, message } }
  },
  phoneNumber: {
    name: "phoneNumber",
    label: "شماره موبایل",
    rules: { required: "شماره موبایل ضروری است", pattern: { value: /^09[0|1|2|3][0-9]{8}$/, message } }
  }
};

const CheckoutPage = () => {
  const user = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const { firstname = "", lastname = "", address = "", phoneNumber = "" } = user ?? {};
  const defaultValues = { firstname, lastname, address, phoneNumber };

  useEffect(() => {
    if (!user) navigate("/login", { state: { from: location.pathname } });
  }, [user]);

  // prettier-ignore
  const { control, handleSubmit: validateForm, formState: { errors } } = useForm<FormValues>({ defaultValues });

  const handleSubmit = (_: FormValues) => {
    window.location.assign("http://127.0.0.1:5500/");
  };

  return (
    <Box width={600} mx='auto' p={5}>
      <Typography component='h2' variant='h4' textAlign='center' mb={5}>
        تکمیل خرید
      </Typography>

      <Box component='form' display='flex' flexDirection='column' onSubmit={validateForm(handleSubmit)}>
        <Box overflow='auto'>
          <Box display='flex' gap={3}>
            <RHFTextField {...inputs.firstname} error={errors} control={control} />
            <RHFTextField {...inputs.lastname} error={errors} control={control} />
          </Box>

          <RHFTextField {...inputs.address} error={errors} control={control} />
          <RHFTextField {...inputs.phoneNumber} error={errors} control={control} />

          {/* <PersianDatePicker /> */}
        </Box>

        <Button type='submit' variant='contained' color='success' fullWidth sx={{ mt: 5 }}>
          پرداخت
        </Button>
      </Box>
    </Box>
  );
};

export default CheckoutPage;
