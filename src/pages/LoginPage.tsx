import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import CustomLink from "../components/common/CustomLink";
import RichRHFTextField from "../components/common/RichRHFTextField";
import PasswordInput from "../components/common/PasswordInput";
import authService from "../services/authService";
import { userActions } from "../redux/features/userSlice";
import loginImage from "../assets/images/login.webp";

interface FormValues {
  username: string;
  password: string;
}

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // prettier-ignore
  const { control, handleSubmit: validateForm, formState: {errors} } = useForm<FormValues>({ defaultValues: { username: '', password: '' }});

  const handleSubmit = async (data: FormValues) => {
    const { username, password } = data;

    try {
      const user = await authService.login(username, password);

      dispatch(userActions.setUser(user));

      if (user.role === "ADMIN") navigate("/admin");
      else navigate(location.state?.from ?? "/");
    } catch (error) {}
  };

  return (
    <Grid container component='main' sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${loginImage})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: t => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box sx={{ my: 8, mx: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component='h1' variant='h5'>
            ورود
          </Typography>

          <Box component='form' onSubmit={validateForm(handleSubmit)} sx={{ mt: 1 }}>
            <RichRHFTextField
              name='username'
              label='نام کاربری'
              error={errors}
              control={control}
              rules={{ required: "نام کاربری را وارد کنید" }}
              autoFocus
            />

            <PasswordInput name='password' error={errors} control={control} rules={{ required: "کلمه عبور را وارد کنید" }} />

            <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='مرا بخاطر بسپار' sx={{ ml: 0 }} />

            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              ورود
            </Button>

            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1, mt: 5, fontSize: 13 }}>
              <CustomLink to='#' colors={{ light: "red", dark: "yellow" }}>
                کلمه عبور را فراموش کرده‌اید؟
              </CustomLink>
              <CustomLink to='/signup'>حساب ندارید؟ عضو شوید</CustomLink>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
