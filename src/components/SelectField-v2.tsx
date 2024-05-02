import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "./ui/label";

type SelectFieldProps = {
  label?: string;
  options: { _id: string; name: string }[];
  value: string;
  className?: string;
  onChange: (newValue: string) => void;
};

const SelectField2 = ({
  label,
  options,
  value,
  onChange,
}: SelectFieldProps) => {
  const handleValueChange = (newValue: string) => {
    onChange(newValue); // Gọi hàm onChange và truyền giá trị mới
  };

  return (
    <>
      <Label>{label}</Label>
      <Select onValueChange={handleValueChange} defaultValue={value}>
        <SelectTrigger>
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem value={option._id} key={option._id}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default SelectField2;
