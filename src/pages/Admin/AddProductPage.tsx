import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { formAddSchema } from "@/configs/formSchema";
import { uploadFile, uploadFiles } from "@/utils/helpers";

import { toast } from "@/components/ui/use-toast";

import FormFieldInput from "@/components/FormField";
import Loader from "@/components/Loader";
import SelectField from "@/components/SelectField";
import { useCreateAttriVal } from "@/hooks/useCreateAttriVal";
import { useCreateProduct } from "@/hooks/useCreateProduct";

import { useQueryAllCategory } from "@/hooks/useQueryAllCategory";
import { useQueryAllAttribute } from "@/hooks/useQueryAllAttribute";
// import instance from "@/configs/axios";

const items = [
  {
    id: "shoes",
    label: "Shoes",
  },
  {
    id: "style",
    label: "Style",
  },
  {
    id: "trendy",
    label: "Trendy",
  },
  {
    id: "limited",
    label: "Limited",
  },
  {
    id: "likenew",
    label: "Like New",
  },
] as const;

export default function AddProductPage() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formAddSchema>>({
    resolver: zodResolver(formAddSchema),
    defaultValues: {
      name: "",
      // price: 12000,
      // category: "Nike", // "60f1b0b3b3b3f40015f1f3b3
      // sale: 0,
      tags: ["shoes", "trendy"],
      description: "",
    },
  });

  const { createProduct, isCreating } = useCreateProduct();
  const { category, isLoading } = useQueryAllCategory();
  const { attributes, isLoadingAttribute } = useQueryAllAttribute();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formAddSchema>) {
    console.log(values);
    try {
      const url = values.image ? await uploadFile(values.image) : null;
      const urls = values.gallery ? await uploadFiles(values.gallery) : null;

      // const { data } = await instance.post("/attributes", {
      //   name: values.nameAttr,
      // });

      const newProduct = {
        name: values.name,
        price: +values.price,
        sale: +values.sale,
        category: values.category,
        tags: values.tags,
        description: values.description,
        gallery: urls,
        image: url,
      };

      // await createProduct(newProduct);
    } catch (error) {
      return toast({
        className: "bg-red-400 text-white",
        title: "Add product Fail.",
        duration: 2000,
      });
    }
  }

  if (isLoading || isCreating) return <Loader />;

  console.log(attributes);

  return (
    <>
      <h2 className="mb-5 text-2xl font-medium text-center">Add Product</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormFieldInput label="Name">
                <Input placeholder="Name product" {...field} />
              </FormFieldInput>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <SelectField
                label="Category"
                options={category}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormFieldInput label="Price">
                <Input
                  type="number"
                  placeholder="Price"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormFieldInput>
            )}
          />

          <FormField
            control={form.control}
            name="sale"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sale</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="sale" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormFieldInput label="Image">
                <Input
                  {...fieldProps}
                  placeholder="Picture"
                  type="file"
                  accept="image/*, application/pdf"
                  onChange={(event) =>
                    onChange(event.target.files && event.target.files[0])
                  }
                />
              </FormFieldInput>
            )}
          />

          <FormField
            control={form.control}
            name="gallery"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>List Images</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    placeholder="Picture"
                    type="file"
                    accept="image/*, application/pdf"
                    multiple
                    onChange={(event) =>
                      onChange(event.target.files && event.target.files)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tags"
            render={() => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="tags"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
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
