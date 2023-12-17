import RHFTextField from "./RHFTextField";
import MenuItem from "@mui/material/MenuItem";

interface RHFSelectProps {
  name: string;
  label: string;
  error: any;
  control: any;
  rules: any;
  options: any[] | undefined;
  onChange?: (value: React.ChangeEvent<HTMLSelectElement>) => void;
}

const RHFSelect = ({ options = [], ...restProps }: RHFSelectProps) => {
  return (
    <RHFTextField select {...restProps}>
      {options.map(o => (
        <MenuItem key={o._id} value={o._id}>
          {o.name}
        </MenuItem>
      ))}
    </RHFTextField>
  );
};

export default RHFSelect;
