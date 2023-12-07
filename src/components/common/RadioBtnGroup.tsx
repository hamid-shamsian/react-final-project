import { ChangeEvent } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

interface OptionsType {
  value: string;
  label: string;
}

interface RadioBtnGroupProps {
  title?: string;
  options: OptionsType[];
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function RadioBtnGroup({ title, options, ...restProps }: RadioBtnGroupProps) {
  return (
    <FormControl>
      {title && <FormLabel>{title}</FormLabel>}
      <RadioGroup {...restProps}>
        {options.map((o, i: number) => (
          <FormControlLabel key={i} value={o.value} control={<Radio />} label={o.label} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
