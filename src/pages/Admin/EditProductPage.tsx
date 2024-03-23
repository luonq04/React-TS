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
import { useEffect } from "react";

import { toast } from "@/components/ui/use-toast";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Loader from "@/components/Loader";
import { IProduct } from "@/interface/product";
import { useEditProduct } from "@/hooks/useEditProduct";
import { formEditSchema } from "@/configs/formSchema";

const items = [
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desk",
    label: "Desk",
  },
  {
    id: "chair",
    label: "Chair",
  },
  {
    id: "sofa",
    label: "Sofa",
  },
] as const;

export default function EditProductPage() {
  const { id } = useParams();
  const { updateProduct, isUpdating } = useEditProduct(id);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formEditSchema>>({
    resolver: zodResolver(formEditSchema),
  });

  const getProductEdit = async () => {
    return axios.get(`http://localhost:8080/api/products/${id}`);
  };

  const { isLoading, data } = useQuery(["productEdit", id], getProductEdit);

  useEffect(() => {
    if (!isLoading && data) {
      const {
        type,
        tags,
        name,
        price,
        sale = 0,
        image,
        description,
        listImages,
      } = data.data;
      form.reset({
        name,
        type,
        price,
        sale,
        tags,
        image,
        description,
        listImages,
      });
    }
  }, [isLoading, data, form]);

  if (isLoading || isUpdating) return <Loader />;

  async function onSubmit(values: z.infer<typeof formEditSchema>) {
    console.log(values);

    try {
      const url =
        typeof values.image !== "string"
          ? await uploadFile(values.image)
          : values.image;

      const urls =
        typeof values.listImages?.[0] !== "string"
          ? await uploadFiles(values.listImages)
          : values.listImages;

      const newProduct: IProduct = {
        ...values,
        price: +values.price,
        image: url,
        listImages: urls,
      };

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
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input disabled={isUpdating} placeholder="type" {...field} />
                </FormControl>

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
            name="listImages"
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
