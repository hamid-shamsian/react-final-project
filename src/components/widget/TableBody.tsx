import TableBody from "@mui/material/TableBody";
import StyledTableRow from "../mui-customized/styledTableRow";
import StyledTableCell from "../mui-customized/StyledTableCell";
import { ColumnType } from "./TableHeader";

interface StripedTableBodyProps {
  columns: ColumnType[];
  rowsData: any[];
}

const renderCell = (row: any, column: ColumnType) => (column.content ? column.content(row) : row[column.path ?? "no-path"]);

const StripedTableBody = ({ columns, rowsData }: StripedTableBodyProps) => {
  return (
    <TableBody>
      {rowsData.map(row => (
        <StyledTableRow key={row._id}>
          {columns.map(column => (
            <StyledTableCell key={row._id + column.path ?? column.key} align='right'>
              {renderCell(row, column)}
            </StyledTableCell>
          ))}
        </StyledTableRow>
      ))}
    </TableBody>
  );
};

export default StripedTableBody;
