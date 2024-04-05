import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type FormFieldProps = {
  label: string;
  children: React.ReactNode;
};

const FormFieldInput = ({ label, children }: FormFieldProps) => {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>{children}</FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default FormFieldInput;
