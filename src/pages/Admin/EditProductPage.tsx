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

import { uploadFile, uploadFiles } from "@/utils/helpers";
import { useEffect } from "react";

import { toast } from "@/components/ui/use-toast";
import { useParams } from "react-router-dom";

import Loader from "@/components/Loader";
import { IProduct } from "@/interface/product";
import { useEditProduct } from "@/hooks/useEditProduct";
import { formEditSchema } from "@/configs/formSchema";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ICategory } from "@/interface/category";
import { useProductQuery } from "@/hooks/useProductQuery";
import { useQueryAllCategory } from "@/hooks/useQueryAllCategory";

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

export default function EditProductPage() {
  const { id } = useParams();
  const { updateProduct, isUpdating } = useEditProduct(id);
  const { category, isLoading: isLoadingCategory } = useQueryAllCategory();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formEditSchema>>({
    resolver: zodResolver(formEditSchema),
  });

  const { data, isLoading } = useProductQuery(id);

  // if (isLoading) return <Loader />;
  // console.log(data);

  // const getProductEdit = async () => {
  //   return axios.get(`http://localhost:8080/api/products/${id}`);
  // };

  // const { isLoading, data } = useQuery(["productEdit", id], getProductEdit);

  useEffect(() => {
    if (!isLoading && data) {
      // const
      const {
        tags,
        name,
        category: { _id, name: categoryName },

        price,
        sale = 0,
        image,
        description,
        gallery,
      } = data;
      form.reset({
        name,
        category: categoryName,
        price,
        sale,
        tags,
        image,
        description,
        gallery,
      });
    }
  }, [isLoading, data, form]);

  if (isLoading || isUpdating || isLoadingCategory) return <Loader />;

  // console.log(data);

  async function onSubmit(values: z.infer<typeof formEditSchema>) {
    console.log(values);

    try {
      const url =
        typeof values.image !== "string"
          ? await uploadFile(values.image)
          : values.image;

      const urls =
        typeof values.gallery?.[0] !== "string"
          ? await uploadFiles(values.gallery)
          : values.gallery;

      const categoryNew = isNaN(parseInt(values.category[0]))
        ? data.category._id
        : values.category;

      const newProduct: IProduct = {
        ...values,
        price: +values.price,
        category: categoryNew,
        image: url,
        gallery: urls,
      };

      console.log("newProduct", newProduct);

      await updateProduct({ id, newProduct });

      toast({
        className: "bg-green-400 text-white",
        title: "Edit product Success.",
        duration: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(data);

  return (
    <>
      <h2 className="mb-5 text-2xl font-medium text-center">Edit Product</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={isUpdating}
                    placeholder="shadcn"
                    {...field}
                  />
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
                  defaultValue={data.category._id}
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
                  <Input
                    disabled={isUpdating}
                    type="number"
                    placeholder="price"
                    {...field}
                  />
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
                  <Input
                    disabled={isUpdating}
                    type="number"
                    placeholder="sale"
                    {...field}
                  />
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
                    disabled={isUpdating}
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
                <FormLabel>List Image</FormLabel>
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                {items.map((item) => (
                  // {data?.data.tags.map((item) => (
                  <FormItem
                    key={item.id}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          let updatedTags = [...field.value];
                          if (checked && !updatedTags.includes(item.id)) {
                            updatedTags.push(item.id);
                          } else if (
                            !checked &&
                            updatedTags.includes(item.id)
                          ) {
                            updatedTags = updatedTags.filter(
                              (tag) => tag !== item.id
                            );
                          }
                          field.onChange(updatedTags);
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{item.label}</FormLabel>
                  </FormItem>
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
                    disabled={isUpdating}
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isUpdating} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
