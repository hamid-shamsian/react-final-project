import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const UserFooter = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box component='footer' sx={{ py: 3, px: 2, mt: "auto", backgroundColor: "gray", textAlign: "center" }}>
        <Container maxWidth='sm'>
          <Typography variant='h4' color='white'>
            فوتر
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default UserFooter;
