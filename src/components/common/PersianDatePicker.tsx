import { useState } from "react";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, DateValidationError } from "@mui/x-date-pickers";

interface PersianDatePickerProps {
  title?: string;
  value: Date | null;
  onChange: (value: Date | null) => void;
  invalid?: boolean;
}

const PersianDatePicker = ({ title = "", value, onChange, invalid = false }: PersianDatePickerProps) => {
  const [error, setError] = useState<DateValidationError | null>(null);
  const untouched = invalid && !value;

  const errorMessage = () => {
    if (untouched) return `تاریخ ${title} ضروری است`;
    switch (error) {
      case "invalidDate":
        return "تاریخ وارد شده معتبر نیست";
      case "disablePast":
        return `تاریخ ${title} نمی‌تواند در گذشته باشد!`;
      default:
        return "";
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
      <DatePicker
        label={"تاریخ " + title}
        value={value}
        onChange={onChange}
        sx={{ width: "100%", mt: 2 }}
        disablePast
        onError={error => setError(error)}
        slotProps={{
          textField: {
            error: !!error || untouched,
            helperText: errorMessage()
          }
        }}
      />
    </LocalizationProvider>
  );
};

export default PersianDatePicker;
