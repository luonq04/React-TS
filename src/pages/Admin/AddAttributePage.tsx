import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { formAddAttributeSchema } from "@/configs/formSchema";

import { toast } from "@/components/ui/use-toast";

import instance from "@/configs/axios";
import { useQueryAllProduct } from "@/hooks/useQueryAllProduct";
import Loader from "@/components/Loader";
import SelectField from "@/components/SelectField";

export default function AddAttributePage() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formAddAttributeSchema>>({
    resolver: zodResolver(formAddAttributeSchema),
    defaultValues: {
      name: "",
    },
  });

  type Values = {
    name: string;
  };

  const { allProducts, isLoading } = useQueryAllProduct();

  // 2. Define a submit handler.
  async function onSubmit(values: Values) {
    console.log(values);

    try {
      if (!values.product) {
        console.log("NOT PRODUCT");
        const { data } = await instance.post("/attributes", values);
        form.reset();
        toast({
          className: "bg-green-400 text-white",
          title: "Add attribute success.",
          duration: 2000,
        });
      } else {
        console.log("HAVE PRODUCT");
        const { data } = await instance.post(
          `/attributes/${values.product}/product`,
          values
        );
        form.reset();
        toast({
          className: "bg-green-400 text-white",
          title: "Add attribute success.",
          duration: 2000,
        });
      }
    } catch (error) {
      return toast({
        className: "bg-red-400 text-white",
        title: "Add attribute fail.",
        duration: 2000,
      });
    }
  }

  if (isLoading) return <Loader />;

  return (
    <>
      <h2 className="mb-5 text-2xl font-medium text-center">Add Attribute</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="product"
            render={({ field }) => (
              <SelectField
                label="Product"
                options={allProducts}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
