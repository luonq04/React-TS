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

import { formAddCategorySchema } from "@/configs/formSchema";

import { toast } from "@/components/ui/use-toast";

import Loader from "@/components/Loader";
import { useQueryCategory } from "@/hooks/useQueryCategory";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUpdateCategory } from "@/hooks/useUpdateCategory";

export default function EditCategoryPage() {
  const { id } = useParams();

  const { category, isLoading } = useQueryCategory(id!);
  const { updateCate } = useUpdateCategory(id!);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formAddCategorySchema>>({
    resolver: zodResolver(formAddCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (!isLoading && category) {
      const { name } = category;
      form.reset({
        name,
      });
    }
  }, [isLoading, category, form]);

  type Values = {
    name: string;
  };

  // 2. Define a submit handler.
  async function onSubmit(values: Values) {
    try {
      await updateCate(values);
      return toast({
        className: "bg-green-400 text-white",
        title: "Edit product Success.",
        duration: 2000,
      });
    } catch (error) {
      return toast({
        className: "bg-red-400 text-white",
        title: "Add product Fail.",
        duration: 2000,
      });
    }
  }

  if (isLoading) return <Loader />;

  console.log(category);

  return (
    <>
      <h2 className="mb-5 text-2xl font-medium text-center">Edit Category</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
