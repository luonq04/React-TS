import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FixedSizeList } from "react-window";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { FormField } from "@/components/ui/form";

import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

function SettingPage() {
  const { control, handleSubmit } = useForm();
  const [numberOfFields, setNumberOfFields] = useState(1); // Số lượng trường input mặc định, bắt đầu từ 1 để có trường nhập đầu tiên

  const onSubmit = (data) => {
    console.log(data);
  };

  const addFields = () => {
    setNumberOfFields((prev) => prev + 1); // Tăng số lượng trường input lên 1 khi nhấn nút "Thêm trường"
  };

  const Row = ({ index, style }) => {
    return (
      <div className="flex flex-col mb-4">
        <h3>Values {index + 1}</h3>
        <Controller
          name={`items[${index}].name`}
          control={control}
          render={({ field }) => (
            <Input
              className="mb-4 ml-1 w-2/3"
              {...field}
              placeholder={`name ${index + 1}`}
            />
          )}
        />

        <Controller
          name={`items[${index}].quantity`}
          control={control}
          render={({ field }) => (
            <div>
              <Label htmlFor="picture">Name</Label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
        />
        <Controller
          name={`items[${index}].price`}
          control={control}
          render={({ field }) => (
            <Input
              className="mb-4 ml-1 w-2/3"
              {...field}
              placeholder={`price  ${index + 1}`}
            />
          )}
        />
      </div>
    );
  };

  return (
    <div>
      <div className="flex items-center mb-7">
        <h2 className="text-2xl font-medium">Add values</h2>

        <Button className="ml-auto" onClick={addFields} variant="outline">
          Thêm trường
        </Button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              <FixedSizeList
                height={200} // Chiều cao của danh sách phụ thuộc vào số lượng trường input và margin
                width={500} // Độ rộng của danh sách
                itemSize={60} // Chiều cao của mỗi mục trong danh sách
                itemCount={numberOfFields} // Số lượng trường input
              >
                {Row}
              </FixedSizeList>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button className="mt-4" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default SettingPage;
