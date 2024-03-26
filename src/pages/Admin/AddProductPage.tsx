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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { uploadFile, uploadFiles } from "@/utils/helpers";
import { formAddSchema } from "@/configs/formSchema";

import { toast } from "@/components/ui/use-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryCategory } from "@/hooks/useQueryCategory";
import Loader from "@/components/Loader";
import { ICategory } from "@/interface/category";
import { useCreateProduct } from "@/hooks/useCreateProduct";

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
      price: 12000,
      // category: "Nike", // "60f1b0b3b3b3f40015f1f3b3
      sale: 0,
      tags: ["shoes", "trendy"],
      description: "",
    },
  });

  const { createProduct, isCreating } = useCreateProduct();
  const { category, isLoading } = useQueryCategory();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formAddSchema>) {
    // console.log(values);
    try {
      const url = values.image ? await uploadFile(values.image) : null;
      const urls = values.gallery ? await uploadFiles(values.gallery) : null;

      const newProduct = {
        ...values,
        price: +values.price,
        gallery: urls,
        image: url,
      };

      // console.log(newProduct);

      // const { data } = await axios.post(
      //   "http://localhost:8080/api/products",
      //   newProduct
      // );

      await createProduct(newProduct);
    } catch (error) {
      return toast({
        className: "bg-red-400 text-white",
        title: "Add product Fail.",
        duration: 2000,
      });
    }
  }

  if (isLoading || isCreating) return <Loader />;

  // console.log(isCreating);

  return (
    <>
      <h2 className="mb-5 text-2xl font-medium text-center">Add Product</h2>
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

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {category.map((cate: ICategory) => (
                      <SelectItem value={cate._id!} key={cate._id}>
                        {cate.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="price" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
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
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    placeholder="Picture"
                    type="file"
                    accept="image/*, application/pdf"
                    onChange={(event) =>
                      onChange(event.target.files && event.target.files[0])
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
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
