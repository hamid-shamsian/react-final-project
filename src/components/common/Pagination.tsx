import { ReactNode, useEffect } from "react";
import Box from "@mui/material/Box";
import MuiPagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface PaginationProps {
  children: ReactNode;
  itemsTitle: string;
  itemsCount: number;
  page: number;
  perPage: number;
  onPageChange: (value: number) => void;
  onPerPageChange: (value: number) => void;
}

const Pagination = ({ children, itemsTitle, itemsCount, page, perPage, onPageChange, onPerPageChange }: PaginationProps) => {
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event; // just to satisfy typescript :))
    onPageChange(value);
  };

  const handlePerPageChange = (event: SelectChangeEvent) => {
    onPerPageChange(+event.target.value);
  };

  const pagesCount = Math.ceil(itemsCount / perPage);
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, itemsCount);

  useEffect(() => {
    if (page > pagesCount) onPageChange(pagesCount);
  }, [page, pagesCount]);

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 5 }}>
        <Typography>
          نمایش موارد ( {start} تا {end} ) از {itemsCount} {itemsTitle}:
        </Typography>

        {itemsCount > 5 && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <InputLabel>تعداد در صفحه:</InputLabel>
            <FormControl size='small'>
              <Select value={String(perPage)} onChange={handlePerPageChange}>
                <MenuItem value={5}>۵</MenuItem>
                <MenuItem value={10}>۱۰</MenuItem>
                <MenuItem value={20}>۲۰</MenuItem>
                <MenuItem value={50}>۵۰</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}
      </Box>

      {children}

      {pagesCount > 1 && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <MuiPagination
            count={pagesCount}
            page={page}
            onChange={handlePageChange}
            renderItem={item => <PaginationItem slots={{ previous: ArrowForwardIcon, next: ArrowBackIcon }} {...item} />}
            sx={{ marginTop: 5 }}
          />
        </Box>
      )}
    </>
  );
};

export default Pagination;
