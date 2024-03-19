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
import { useContext } from "react";
import { ProductContext } from "@/context/ProductProvider";
import { toast } from "@/components/ui/use-toast";
import { useCreateProduct } from "@/features/Admin/useCreateProduct";
import Loader from "@/components/Loader";

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
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
] as const;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  type: z.string().min(2, {
    message: "Type must be at least 2 characters.",
  }),
  price: z.coerce.number().gte(10000, {
    message: "Price must be at least 10000 VND.",
  }),

  image: z.any().refine((val) => val !== undefined, "File is required"),
  // val.length > 0, "File is required")
  // .refine(
  //   (files) =>
  //     Array.from(files).every(
  //       (file) =>
  //         file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type)
  //     ),
  //   "Only these types are allowed .jpg, .jpeg, .png and .webp"
  // ),
  // .instanceof(File)
  // .refine((val) => val.length > 0, "File is required")
  // .refine(
  //   (files) =>
  //     Array.from(files).every((file) =>
  //       ACCEPTED_IMAGE_TYPES.includes(file.type)
  //     ),
  //   "Only these types are allowed .jpg, .jpeg, .png and .webp"
  // )
  // .refine((val) => val.length !== 0, "File is required"),

  listImages: z.any(),
  tags: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  description: z.string(),
});

export default function AddProductPage() {
  const { addProduct } = useContext(ProductContext);

  // const { createProduct, isCreating } = useCreateProduct();

  // if (isCreating) return <Loader />;

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      price: 0,
      tags: ["recents", "home"],
      description: "",
    },
  });

  // 2. Define a submit handler.

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // console.log(values);
      // console.log(typeof values.image);
      // console.log(typeof values.listImages);
      const url = values.image ? await uploadFile(values.image) : null;
      const urls = values.listImages
        ? await uploadFiles(values.listImages)
        : null;

      const newProduct = {
        ...values,
        price: +values.price,
        listImages: urls,
        image: url,
      };

      console.log(newProduct);

      const { data } = await axios.post(
        "http://localhost:8080/api/products",
        newProduct
      );
      // createProduct(newProduct);

      addProduct(newProduct);

      toast({
        // variant: "destructive",
        className: "bg-green-400 text-white",
        title: "Add product Success.",
        duration: 2000,
        // description: "There was a problem with your request.",
      });
    } catch (error) {
      console.log(error);
    }
  }

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
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Input placeholder="type" {...field} />
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
                  <Input type="text" placeholder="price" {...field} />
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
            name="listImages"
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
