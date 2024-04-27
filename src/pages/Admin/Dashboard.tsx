import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";

import Select from "react-select";

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
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

// import instance from "@/configs/axios";
import { useAtom } from "jotai";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAttributes } from "@/context/AttributeProvider";
import { useLocalStorage } from "@/hooks/useStorage";

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

export default function Dashboard() {
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
  const [variations, setVariations] = useLocalStorage("variations", []);

  // Variation
  const [display, setDisplay] = useState<number>(0);
  const [variation, setVariation] = useState<any[]>([]);
  const [valueVar, setValueVar] = useState<string[]>([]);

  const {
    attributesStore,
    variationsStore,
    addAttribute,
    variationArray,
    addVariation,
    completeVariation,
    deleteVariation,
  } = useAttributes();

  function handleAttribute(data: string) {
    setValueVar([]);
    const variationChoose = attributes.filter((attr, index) =>
      attr._id === data ? attr.values : null
    );
    setVariation(variationChoose);
  }

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

  function handleChange(selectedOption: string[]): void {
    setValueVar(selectedOption);
  }

  if (isLoading || isCreating || isLoadingAttribute) return <Loader />;

  const options =
    variation[0]?.values?.map((item) => {
      return { value: item._id, label: item.name };
    }) ?? [];

  function filterProductsByColor(products, colorsToFilter) {
    const filteredProducts = [];
    products.forEach((product) => {
      product.values.forEach((value) => {
        colorsToFilter.forEach((color) => {
          if (value._id === color.value) {
            filteredProducts.push({ id_Attribute: product._id, ...value });
          }
        });
      });
    });
    return filteredProducts;
  }

  function handleAddVariation() {
    const [addContext] = variation;
    // console.log(valueVar);

    const filteredProducts = filterProductsByColor(variation, valueVar);
    console.log("FILTERED PRODUCTS:", filteredProducts);
    setVariations([...variations, filteredProducts]);

    addVariation(filteredProducts);

    if (attributesStore.length === 0) return addAttribute(addContext);

    const existing =
      attributesStore.findIndex(
        (attr: object) => attr._id === addContext._id
      ) !== -1;

    if (!existing) {
      console.log("addContext", addContext);
      addAttribute(addContext);
    }
  }

  return (
    <>
      <h2 className="mb-5 text-2xl font-medium text-center">Add Product</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" grid grid-cols-2 gap-7"
        >
          <div className="flex flex-col gap-4">
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
          </div>

          <div className="flex flex-col gap-4 ">
            <div className="border p-4">
              <Tabs defaultValue="attributes" className="flex gap-3 ">
                <div className="min-h-96">
                  <TabsList className="flex flex-col pt-6 h-full w-full justify-start">
                    <TabsTrigger
                      value="attributes"
                      className="text-zinc-600 dark:text-zinc-200 "
                    >
                      Attributes
                    </TabsTrigger>
                    <TabsTrigger
                      value="variations"
                      className="text-zinc-600 dark:text-zinc-200"
                    >
                      Variations
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="attributes" className="m-0 w-full">
                  <Card className="border-none shadow-none">
                    <div className="flex">
                      <FormField
                        control={form.control}
                        name="attributes"
                        render={({ field }) => (
                          <SelectField
                            className=" w-40"
                            label="Attributes"
                            options={attributes}
                            value={field.value}
                            onChange={(newValue) => {
                              field.onChange(newValue);
                              handleAttribute(newValue);
                            }}
                          />
                        )}
                      />
                    </div>
                    {variation.length > 0 && (
                      <>
                        <Separator className="my-4" />
                        <h4 className=" font-semibold">XS</h4>
                        <Separator className="my-4" />

                        <Select
                          options={options ?? []}
                          onChange={handleChange}
                          isMulti
                          value={valueVar}
                        />
                        <Button
                          className="w-1/3 mt-4"
                          type="button"
                          onClick={() => {
                            handleAddVariation();
                            setDisplay(0);
                          }}
                        >
                          Save
                        </Button>
                      </>
                    )}
                  </Card>
                </TabsContent>
                <TabsContent value="variations" className="m-0 w-full">
                  {display === 0 && (
                    <>
                      <FormField
                        control={form.control}
                        name="chooseVariation"
                        render={({ field }) => (
                          <SelectField
                            label="Variation"
                            options={[
                              {
                                _id: "1",
                                name: "Create variation",
                              },
                            ]}
                            value={field.value}
                            onChange={field.onChange}
                          />
                        )}
                      />

                      <Button
                        className="w-1/3 mt-4"
                        type="button"
                        onClick={() => {
                          // form.trigger("name");
                          setDisplay(+form.getValues("chooseVariation"));
                          completeVariation();
                        }}
                      >
                        Add
                      </Button>
                    </>
                  )}

                  {display === 1 &&
                    variationArray.map((innerArray, index) => (
                      <Accordion
                        type="single"
                        collapsible
                        className="w-full"
                        key={`accordion-${index}`}
                      >
                        {innerArray.map((item, itemIndex, arr) => (
                          <AccordionItem
                            key={`accordion-item-${index}-${itemIndex}`}
                            value={`accordion-item-${index}-${itemIndex}`}
                          >
                            <div className="flex justify-between items-center">
                              <AccordionTrigger>TRIGGER</AccordionTrigger>
                              <Button
                                type="button"
                                onClick={() => {
                                  // console.log("INDEX: ", itemIndex);
                                  return deleteVariation(item);
                                }}
                              >
                                DELETE
                              </Button>
                            </div>
                            <AccordionContent>
                              {item.map((value, valueIndex) => {
                                const [options] = attributesStore.filter(
                                  (attr) => attr._id === value.id_Attribute
                                );
                                // console.log("options:", options);

                                return (
                                  <FormField
                                    key={`${index}-${itemIndex}-${valueIndex}`}
                                    control={form.control}
                                    name="allVariation"
                                    render={({ field }) => (
                                      <SelectField
                                        key={`${index}-${itemIndex}-select`}
                                        label="Variation"
                                        options={options.values}
                                        value={value._id}
                                        onChange={field.onChange}
                                      />
                                    )}
                                  />
                                );
                              })}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <Button className="w-2/3" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
