import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHeader, { ColumnType } from "./TableHeader";
import StripedTableBody from "./TableBody";

interface DataTableProps {
  columns: ColumnType[];
  rowsData: any[];
}

const StripedTable = ({ columns, rowsData }: DataTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }}>
        <TableHeader columns={columns} />
        <StripedTableBody columns={columns} rowsData={rowsData} />
      </Table>
    </TableContainer>
  );
};

export default StripedTable;
