import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
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
import RTLTextField from "../components/common/RTLTextField";
import LoginImage from "../assets/images/login.jpg";
import auth from "../services/authService";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = e.currentTarget;

    try {
      const user = await auth.login(username.value, password.value);

      if (user.role === "ADMIN") navigate("/admin");
      else navigate("/");
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
          backgroundImage: `url(${LoginImage})`,
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

          <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <RTLTextField margin='normal' required fullWidth id='username' label='نام کاربری' name='username' autoComplete='username' autoFocus />

            <RTLTextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='کلمه عبور'
              type='password'
              id='password'
              autoComplete='current-password'
            />

            <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='مرا بخاطر بسپار' sx={{ mr: 0 }} />

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
