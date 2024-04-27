import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectFieldProps = {
  label?: string;
  options: { _id: string; name: string }[];
  value: string;
  className?: string;
  onChange: (newValue: string) => void;
};

const SelectField = ({
  label,
  options,
  value,
  onChange,
  className,
}: SelectFieldProps) => {
  const handleValueChange = (newValue: string) => {
    onChange(newValue); // Gọi hàm onChange và truyền giá trị mới
  };

  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <Select onValueChange={handleValueChange} defaultValue={value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={`Select ${label}`} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map((option) => (
            <SelectItem value={option._id} key={option._id}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};

export default SelectField;
