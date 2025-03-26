"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

// Define validation schema with Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  fullName: z
    .string()
    .min(2, { message: "Full Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." }),
  location: z
    .string()
    .min(5, { message: "Location must be at least 5 characters." }),
  postalCode: z
    .string()
    .min(5, { message: "Postal code must be at least 5 digits." }),
});

export function ProfileForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      location: "",
      postalCode: "",
    },
  });

  // Submit handler
  function onSubmit(values) {
    // Handle the submitted form values
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" w-full grid grid-cols-2 gap-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Sara" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Tancredi" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="SaraTancredi@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="(+98) 9123728167" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g., New York, USA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input placeholder="23728167" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="col-span-2 flex justify-center">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Form>
  );
}
