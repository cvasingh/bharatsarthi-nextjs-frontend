"use client";

import DottedSeparator from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { profileSchema } from "../schemas";
import QRCode from "react-qr-code";
import { useUpdateDetails } from "../api/use-update-details";

export const EditForm = ({ user }) => {
  const { mutate, isPending } = useUpdateDetails();

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
    },
  });
  console.log(form.formState.errors);

  const onSubmit = (values) => {
    alert("Updated Successfully");
    console.log(values);
    mutate({ json: values });
  };

  return (
    <>
      <div className="border rounded-2xl mx-auto shadow-md p-4 w-[156px] mb-6">
        <QRCode
          value={`${process.env.NEXT_PUBLIC_APP_URL}/preview/${user?.["$id"]}`}
          size="124"
        />
        <p className="text-xs font-bold mt-2 text-center">Your QR Code</p>
      </div>
      <div className="px-7 mb-2">
        <DottedSeparator />
      </div>
      <Card className="w-full h-full md:w-[487px] border-none shadow-none mx-auto">
        <CardHeader className="flex flex-col gap-4 items-center justify-center text-center px-7">
          <CardTitle className="text-xl">Update Your Details</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>

        <CardContent className="px-7">
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Enter your name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter email address"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <FormField
                name="details"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="details"
                        placeholder="Enter the details"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <Button disabled={isPending} size="lg" className="w-full">
                Update
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};
