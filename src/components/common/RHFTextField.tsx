import { Control, Controller } from "react-hook-form";
import RTLTextField from "../mui-customized/RTLTextField";

interface RHFTextFieldProps {
  name: string;
  label: string;
  type?: string;
  rules: any;
  error: any;
  control: Control<any, any>;
  InputProps: any;
}

const RHFTextField = ({ name, rules, error, control, ...restProps }: RHFTextFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <RTLTextField {...field} error={Boolean(error[name])} helperText={error[name]?.message} {...restProps} fullWidth margin='normal' />
      )}
    />
  );
};

export default RHFTextField;
