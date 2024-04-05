import { FormItem, FormControl, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

type CheckboxFieldProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

const CheckboxField = ({ label, checked, onChange }: CheckboxFieldProps) => {
  return (
    <FormItem>
      <FormControl>
        <Checkbox checked={checked} onCheckedChange={onChange} />
      </FormControl>
      <FormLabel className="font-normal">{label}</FormLabel>
    </FormItem>
  );
};

export default CheckboxField;
