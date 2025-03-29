"use client";

import { Edit, Loader } from "lucide-react";
import { useGetUserById } from "../api/use-get-user-by-id";
import Link from "next/link";

export const UserCardWithId = ({ id, user }) => {
  const { data, isLoading } = useGetUserById(id);

  if (isLoading) {
    return (
      <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300">
        <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const {
    userId,
    name,
    email,
    age,
    gender,
    phone,
    dlNumber,
    aadharNumber,
    permanentJob,
    employerDetails,
    lastEmployer,
    salary,
    healthInsurance,
    carModel,
    pucExpiryDate,
    lookingForJobChange,
  } = data;

  return (
    <section className="relative pt-20 pb-24">
      <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-center flex-col sm:flex-row max-sm:gap-5 sm:justify-between mb-5">
          <div>
            <h3 className="font-bold text-4xl text-gray-900 mb-1 text-center">
              {name || "User"}
            </h3>
          </div>
          {user?.["$id"] === userId && (
            <Link href="/edit">
              <Edit className="size-6 text-muted-foreground" />
            </Link>
          )}
        </div>

        <div className="mb-8 flex items-center justify-center flex-col sm:flex-row max-sm:gap-5 sm:justify-between ">
          {email && (
            <Link
              href={`mailto:${email}`}
              class="py-3.5 px-5 flex rounded-full bg-indigo-600 items-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.3011 8.69881L8.17808 11.8219M8.62402 12.5906L8.79264 12.8819C10.3882 15.6378 11.1859 17.0157 12.2575 16.9066C13.3291 16.7974 13.8326 15.2869 14.8397 12.2658L16.2842 7.93214C17.2041 5.17249 17.6641 3.79266 16.9357 3.0643C16.2073 2.33594 14.8275 2.79588 12.0679 3.71577L7.73416 5.16033C4.71311 6.16735 3.20259 6.67086 3.09342 7.74246C2.98425 8.81406 4.36221 9.61183 7.11813 11.2074L7.40938 11.376C7.79182 11.5974 7.98303 11.7081 8.13747 11.8625C8.29191 12.017 8.40261 12.2082 8.62402 12.5906Z"
                  stroke="white"
                  stroke-width="1.6"
                  stroke-linecap="round"
                />
              </svg>
              <span class="px-2 font-semibold text-base leading-7 text-white">
                {email}
              </span>
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoField label="Age" value={age} />
          <InfoField label="Gender" value={gender} />
          <InfoField label="Phone" value={phone} />
          <InfoField label="DL Number" value={dlNumber} />
          <InfoField label="Aadhar Number" value={aadharNumber} />
          <InfoField
            label="Permanent Job"
            value={permanentJob ? "Yes" : "No"}
          />
          {permanentJob && (
            <InfoField label="Employer Details" value={employerDetails} />
          )}
          <InfoField label="Last Employer" value={lastEmployer} />
          <InfoField label="Salary" value={salary} />
          <InfoField
            label="Health Insurance"
            value={healthInsurance ? "Yes" : "No"}
          />
          <InfoField label="Car Model" value={carModel} />
          <InfoField label="PUC Expiry Date" value={pucExpiryDate} />
          <InfoField
            label="Looking for Job Change"
            value={lookingForJobChange ? "Yes" : "No"}
          />
        </div>
      </div>
    </section>
  );
};

const InfoField = ({ label, value }) =>
  value ? (
    <div className="bg-gray-100 p-3 rounded-lg">
      <strong>{label}:</strong> {value}
    </div>
  ) : null;
