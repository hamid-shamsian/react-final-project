import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import StyledTableCell from "../mui-customized/StyledTableCell";

export interface ColumnType {
  label?: string;
  content?: any; // be more specific later... (its so challenging...)
  path?: string;
  key?: string;
  align?: "left" | "right" | "center";
}

interface TableHeaderProps {
  columns: ColumnType[];
}

const TableHeader = ({ columns }: TableHeaderProps) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map(column => (
          <StyledTableCell key={column.path ?? column.key} align={column.align ?? "center"}>
            {column.label}
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
