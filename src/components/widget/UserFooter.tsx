import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const UserFooter = () => {
  return (
    <Box component='footer' sx={{ p: 2, backgroundColor: "gray", textAlign: "center" }}>
      <Container maxWidth='sm'>
        <Typography variant='h4' color='white' sx={{ py: 10 }}>
          فوتر
        </Typography>
      </Container>
      <Typography>گیک‌شاپ &copy; ۲۰۲۳ | کلیه حقوق این وبسایت محفوظ است.</Typography>
    </Box>
  );
};

export default UserFooter;
