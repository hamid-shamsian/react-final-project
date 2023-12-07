import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import StyledTableCell from "../mui-customized/StyledTableCell";

export interface ColumnType {
  label?: string;
  content?: any;
  path?: string;
  key?: string;
}

interface TableHeaderProps {
  columns: ColumnType[];
}

const TableHeader = ({ columns }: TableHeaderProps) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map(column => (
          <StyledTableCell key={column.path ?? column.key} align='right'>
            {column.label}
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
