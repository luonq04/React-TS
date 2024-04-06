import useCart from "@/hooks/useCart";
import Loader from "./Loader";
import { formatCurrency } from "@/utils/helpers";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormFieldInput from "./FormField";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useMutation } from "react-query";
import { useLocalStorage } from "@/hooks/useStorage";
import instance from "@/configs/axios";
import { toast } from "./ui/use-toast";

type ItemIncart = {
  productID: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
  color: string;
  size: string;
};

const Bill = () => {
  const form = useForm();
  const { data, isLoading, calculateTotal } = useCart();
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;

  const { mutate } = useMutation({
    mutationFn: async (order: {
      userId: string;
      items: [];
      customerInfo: object;
      totalPrice: number;
    }) => {
      const { data } = await instance.post("/order", order);
      return data;
    },

    onSuccess: () => {
      form.reset();
      toast({
        title: "Order success",
        message: "Your order has been placed",
        className: "bg-green-500 text-white",
      });
    },
  });

  if (isLoading) return <Loader />;

  const onSubmit = (dataForm: object) => {
    // userId, items, customerInfo, totalPrice
    mutate({
      userId,
      items: data,
      totalPrice: calculateTotal(),
      customerInfo: dataForm,
    });
  };

  return (
    <section className="bill">
      <div className="container">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="bill-detail">
              {/* <InfoUser /> */}
              <div className="info-user">
                <div className="info-user__wrapper">
                  <h2 className="title-form">Billing details</h2>
                  {/* Wrapper  */}
                  <div className="info-user__form">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormFieldInput label="Name">
                          <Input
                            className="py-6"
                            placeholder="Name product"
                            {...field}
                          />
                        </FormFieldInput>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormFieldInput label="Phone">
                          <Input
                            className="py-6"
                            placeholder="Phone number"
                            {...field}
                          />
                        </FormFieldInput>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormFieldInput label="Email">
                          <Input
                            className="py-6"
                            placeholder="Email user"
                            {...field}
                          />
                        </FormFieldInput>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormFieldInput label="City">
                          <Input
                            className="py-6"
                            placeholder="City user"
                            {...field}
                          />
                        </FormFieldInput>
                      )}
                    />

                    {/* <Button type="submit">Submit Order</Button> */}
                  </div>
                </div>
              </div>
              {/* Method Payment */}
              <div className="method-pay">
                <div className="price-checkout">
                  <div className="wrapper-info__checkout">
                    <h2 className="heading-info__checkout">Product</h2>
                    <h2 className="heading-info__checkout">Subtotal</h2>
                  </div>
                  {/* ==== Thong tin gio hang ==== */}
                  {data.map((product: ItemIncart) => (
                    <div
                      className="wrapper-info__checkout"
                      key={product.productID}
                    >
                      <div className="product-wrapper">
                        <h4 className="product-name">{product.name}</h4>
                        <span>x {product.quantity}</span>
                      </div>
                      <span className="product-price">
                        {formatCurrency(product.price)} đ
                      </span>
                    </div>
                  ))}

                  <div className="wrapper-info__checkout">
                    <p>Total</p>
                    <span className="total-price">
                      {formatCurrency(calculateTotal())} đ
                    </span>
                  </div>
                </div>
                {/* ==== Thong tin gio hang ==== */}

                <div className="method-pay__description">
                  <div className="method-pay__more">
                    <FormField
                      control={form.control}
                      name="payment"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="DBT" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Direct Bank Transfer
                                </FormLabel>
                              </FormItem>

                              <p className="bank-policy">
                                Make your payment directly into our bank
                                account. Please use your Order ID as the payment
                                reference. Your order will not be shipped until
                                the funds have cleared in our account.
                              </p>

                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="COD" />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  Cash On Delivery
                                </FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="place-order">
                    <button className="btn-order">Place order</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default Bill;
