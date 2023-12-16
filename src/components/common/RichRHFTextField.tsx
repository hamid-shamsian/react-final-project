import InputAdornment from "@mui/material/InputAdornment";
import RHFTextField from "./RHFTextField";

interface RichRHFTextFieldProps {
  name: string;
  label: string;
  unit?: string;
  type?: string;
  error: any;
  control: any;
  rules: any;
  autoFocus?: boolean;
}

const RichRHFTextField = ({ unit, control, rules, ...restProps }: RichRHFTextFieldProps) => {
  const adornment = unit
    ? {
        endAdornment: <InputAdornment position='end'>{unit}</InputAdornment>
      }
    : {};

  return <RHFTextField control={control} rules={rules} {...restProps} InputProps={adornment} />;
};

export default RichRHFTextField;
