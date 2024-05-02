import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";

import Select from "react-select";

import {
  // Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

// import instance from "@/configs/axios";

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
import SelectField2 from "@/components/SelectField-v2";

export default function Dashboard() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    // reset,
  } = useForm();

  const { createProduct, isCreating } = useCreateProduct();
  const { category, isLoading } = useQueryAllCategory();
  const { attributes, isLoadingAttribute } = useQueryAllAttribute();
  const [variations, setVariations] = useLocalStorage("variations", []);

  // Variation
  const [display, setDisplay] = useState<number>(0);
  const [variation, setVariation] = useState<any[]>([]);
  const [valueVar, setValueVar] = useState<string[]>([]);

  const options =
    variation[0]?.values?.map((item) => {
      return { value: item._id, label: item.name };
    }) ?? [];

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
    console.log("data:", data);
    setValueVar([]);
    const variationChoose = attributes.filter((attr, index) =>
      attr._id === data ? attr.values : null
    );
    console.log("variationChoose:", variationChoose);
    setVariation(variationChoose);
  }

  // console.log("variation:", variation);

  // 2. Define a submit handler.
  async function onSubmit(values) {
    console.log(values);
    // try {
    //   const url = values.image ? await uploadFile(values.image) : null;
    //   const urls = values.gallery ? await uploadFiles(values.gallery) : null;

    //   // const { data } = await instance.post("/attributes", {
    //   //   name: values.nameAttr,
    //   // });

    //   const newProduct = {
    //     name: values.name,
    //     category: values.category,
    //     tags: values.tags,
    //     description: values.description,
    //     gallery: urls,
    //     image: url,
    //   };

    //   // await createProduct(newProduct);
    // } catch (error) {
    //   return toast({
    //     className: "bg-red-400 text-white",
    //     title: "Add product Fail.",
    //     duration: 2000,
    //   });
    // }
  }

  function handleChange(selectedOption: string[]): void {
    // console.log("selectedOption:", selectedOption);
    setValueVar(selectedOption);
  }

  if (isLoading || isCreating || isLoadingAttribute) return <Loader />;

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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" grid grid-cols-2 gap-7"
      >
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="picture">Name</Label>
            <Input
              className="mt-2"
              type="input"
              placeholder="Name Product"
              {...register("name")}
            />
          </div>

          <Controller
            name="category"
            control={control}
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <SelectField2
                label="Category"
                options={category}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />

          {errors.category && (
            <span style={{ color: "red" }}>{errors.category.message}</span>
          )}

          <div>
            <Label htmlFor="picture">Image</Label>
            <Input className="mt-2" type="file" {...register("image")} />
          </div>
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
                  <Controller
                    name="attribute"
                    control={control}
                    rules={{ required: "This field is required" }}
                    render={({ field }) => (
                      <SelectField2
                        label="Attribute"
                        options={attributes}
                        value={field.value}
                        onChange={(newValue) => {
                          field.onChange(newValue);
                          handleAttribute(newValue);
                        }}
                      />
                    )}
                  />

                  {variation.length > 0 && (
                    <>
                      <Separator className="my-4" />
                      <h4 className=" font-semibold">{variation[0].name}</h4>
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
                    <Controller
                      name="chooseVariation"
                      control={control}
                      rules={{ required: "This field is required" }}
                      render={({ field }) => (
                        <SelectField2
                          label="Attribute"
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
                        if (+control._formValues.chooseVariation === 1) {
                          setDisplay(+control._formValues.chooseVariation);
                          completeVariation();
                        }
                      }}
                    >
                      Add
                    </Button>
                  </>
                )}

                {display === 1 &&
                  variationArray.map((innerArray, index) => (
                    <Accordion
                      key={index}
                      type="single"
                      collapsible
                      className="w-full flex flex-col gap-4"
                    >
                      {innerArray.map((item, itemIndex) => (
                        <AccordionItem
                          className=""
                          key={`accordion-item-${index}-${itemIndex}`}
                          value={`accordion-item-${index}-${itemIndex}`}
                        >
                          <div className="flex justify-between items-center mb-5">
                            <div className="flex gap-3">
                              {item.map((value, valueIndex) => {
                                const [options] = attributesStore.filter(
                                  (attr) => attr._id === value.id_Attribute
                                );

                                return (
                                  <div
                                    key={`${index}-${itemIndex}-${valueIndex}`}
                                  >
                                    <Controller
                                      name="chooseVariation"
                                      control={control}
                                      rules={{
                                        required: "This field is required",
                                      }}
                                      render={({ field }) => (
                                        <SelectField2
                                          label="Attribute"
                                          options={options.values}
                                          value={value._id}
                                          onChange={field.onChange}
                                        />
                                      )}
                                    />
                                  </div>
                                );
                              })}
                              <AccordionTrigger>TRIGGER</AccordionTrigger>
                            </div>

                            <Button
                              type="button"
                              onClick={(e) =>
                                console.log(e.target.parentElement)
                              }
                            >
                              DELETE
                            </Button>
                          </div>
                          <AccordionContent>
                            <div>
                              <Label htmlFor="picture">Name</Label>
                              <Input
                                className="mt-2"
                                type="input"
                                placeholder="Name Product"
                                {...register(`items[${itemIndex}].quan`, {
                                  required: true,
                                })}
                              />
                            </div>
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
    </>
  );
}
