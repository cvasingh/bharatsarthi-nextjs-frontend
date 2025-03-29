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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import QRCode from "react-qr-code";
import { useUpdateDetails } from "../api/use-update-details";
import { profileSchema } from "../schemas";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetUserById } from "../api/use-get-user-by-id";
import { useEffect } from "react";

const formFields = [
  { name: "name", type: "text", label: "Name" },
  { name: "age", type: "text", label: "Age" },
  { name: "gender", type: "text", label: "Gender" },
  { name: "phoneNumber", type: "text", label: "Phone Number" },
  { name: "dlNumber", type: "text", label: "DL Number" },
  { name: "aadharNumber", type: "text", label: "Aadhar Number" },
  { name: "permanentJob", type: "checkbox", label: "Permanent Job" },
  { name: "employerDetails", type: "text", label: "Employer Details" },
  { name: "lastEmployerDetails", type: "text", label: "Last Employer Details" },
  { name: "salary", type: "text", label: "Salary" },
  { name: "healthInsurance", type: "checkbox", label: "Health Insurance" },
  { name: "carModel", type: "text", label: "Car Model" },
  { name: "pucExpiryDate", type: "text", label: "PUC Expiry Date" },
  { name: "jobChange", type: "checkbox", label: "Job Change" },
];

export const EditForm = ({ user }) => {
  const { data, isLoading } = useGetUserById(user["$id"]);

  const { mutate, isPending } = useUpdateDetails();

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      age: "",
      gender: "",
      phoneNumber: "",
      dlNumber: "",
      aadharNumber: "",
      permanentJob: false,
      employerDetails: "",
      lastEmployerDetails: "",
      salary: "",
      healthInsurance: false,
      carModel: "",
      pucExpiryDate: "",
      jobChange: false,
    },
  });
  useEffect(() => {
    if (data) {
      form.setValue("name", data.name ?? "");
      form.setValue("email", data.email ?? "");
      form.setValue("age", data.age ?? "");
      form.setValue("gender", data.gender ?? "");
      form.setValue("phoneNumber", data.phoneNumber ?? "");
      form.setValue("dlNumber", data.dlNumber ?? "");
      form.setValue("aadharNumber", data.aadharNumber ?? "");
      form.setValue("permanentJob", data.permanentJob ?? false);
      form.setValue("employerDetails", data.employerDetails ?? "");
      form.setValue("lastEmployerDetails", data.lastEmployerDetails ?? "");
      form.setValue("salary", data.salary ?? "");
      form.setValue("healthInsurance", data.healthInsurance ?? false);
      form.setValue("carModel", data.carModel ?? "");
      form.setValue("pucExpiryDate", data.pucExpiryDate ?? "");
      form.setValue("jobChange", data.jobChange ?? false);
    }
  }, [isLoading]);

  console.log(form.formState.errors);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onSubmit = (values) => {
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
      <Card className="w-full h-full border-none shadow-none mx-auto">
        <CardHeader className="flex flex-col gap-4 items-center justify-center text-center px-7">
          <CardTitle className="text-xl">Update Your Details</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="px-7">
          <Form {...form}>
            <form
              className="grid grid-cols-2 gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {formFields.map(({ name, label, type }) => {
                if (type === "checkbox") {
                  return (
                    <FormField
                      key={name}
                      name={name}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2 space-y-0 rounded-md border px-3 py-2.5">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>{label}</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  );
                } else {
                  return (
                    <FormField
                      key={name}
                      name={name}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem className="relative">
                          <FormLabel
                            className={
                              "absolute -top-1 left-3 text-[8px] px-1 bg-white"
                            }
                          >
                            {label}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={`Enter ${label}`}
                              type={type}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                }
              })}

              <Button
                disabled={isPending}
                size="lg"
                className="w-full"
                type="submit"
              >
                Update
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};
