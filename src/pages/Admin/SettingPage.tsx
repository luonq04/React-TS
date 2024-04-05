import { memo, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

import AutoSizer from "react-virtualized-auto-sizer";
import { VariableSizeList as List } from "react-window";

// =====================================

const WindowedRow = memo(({ index, style, data }) => {
  console.log(index, style, data);

  const { register } = useFormContext();
  const nmKey = `${index}.name`;
  const prKey = `${index}.price`;
  const qtyKey = `${index}.quantity`;

  return (
    <div className="flex flex-col">
      <label>Name</label>
      <input
        type="text"
        className=" bg-slate-300 block my-5 border border-gray-400"
        {...register(nmKey)}
      />
      <label>Quantity</label>
      <input
        type="text"
        className=" bg-slate-300 block my-5 border border-gray-400"
        {...register(qtyKey)}
      />
      <label>Price</label>
      <input
        type="text"
        className=" bg-slate-300 block my-5 border border-gray-400"
        {...register(prKey)}
      />
    </div>
  );
});

// const FormSchema = z.object({
//   email: z
//     .string({
//       required_error: "Please select an email to display.",
//     })
//     .email(),
//   name: z.string(),
//   quantity: z.coerce.number(),
//   price: z.string(),
// });

const SettingPage = () => {
  let [count, setCount] = useState(1);
  console.log(count);

  function increase() {
    if (count < 2) setCount(count + 1);
    else return;
  }

  const items = Array.from(Array(count).keys()).map((i) => ({
    // title: `List ${i}`,
    // quantity: Math.floor(Math.random() * 10),
  }));

  const onSubmit = (data) => console.log(Object.values(data));
  const formMethods = useForm({ defaultValues: items });

  return (
    <>
      <button className="mb-4" onClick={increase}>
        Add
      </button>

      <form
        className="form max-w-96 max-h-96"
        onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        <FormProvider {...formMethods}>
          <AutoSizer>
            {({ height, width }) => (
              <div className="">
                <List
                  height={height}
                  itemCount={items.length}
                  itemSize={() => 100}
                  width={width}
                  itemData={items}
                >
                  {WindowedRow}
                </List>
              </div>
            )}
          </AutoSizer>
        </FormProvider>
        <button className="mt-96" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default SettingPage;
