import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

interface PersianDatePickerProps {
  value: Date | null;
  onChange: (value: Date | null) => void;
}

const PersianDatePicker = ({ value, onChange }: PersianDatePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFnsJalali}>
      <DateTimePicker label='تاریخ ارسال' minDate={new Date()} value={value} onChange={onChange} sx={{ width: "100%", mt: 2 }} />
    </LocalizationProvider>
  );
};

export default PersianDatePicker;
