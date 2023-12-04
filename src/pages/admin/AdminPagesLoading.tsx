import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const AdminPagesLoading = ({ wholePage = false }: { wholePage?: boolean }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {wholePage && <Skeleton variant='rectangular' height={64} animation='wave' />}

      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {wholePage && (
          <Box sx={{ width: "80px", bgcolor: "grey.200" }}>
            {[1, 2, 3, 4, 5].map(i => (
              <Skeleton key={i} variant='rectangular' height={50} sx={{ m: 2 }} />
            ))}
          </Box>
        )}

        <Box sx={{ flex: 1, p: 3 }}>
          <Skeleton variant='rectangular' height={50} sx={{ mb: 2 }} />

          {[1, 2, 3].map(i => (
            <Skeleton key={i} variant='rectangular' height={118} sx={{ mb: 2 }} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminPagesLoading;
