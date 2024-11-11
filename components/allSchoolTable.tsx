"use client";
/* eslint-disable react/no-unescaped-entities */

import { Checkbox, Table } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface User {
  id: string;
  name: string;
  mobile: string;
  profile: any;
  avatar: any;
  role: any;
}

export default function AllSchoolTable({ data }: { data: any }) {
  const router = useRouter();
  const schoolLength = data && data.length;

  const len = schoolLength > 0 ? schoolLength : false;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg min-h-[70vh] dark:bg-gray-800">
      <Table hoverable className="rounded-none hover:rounded-none">
        <Table.Head className="text-md dark:text-gray-200">
          <Table.HeadCell className="p-4 ">
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell className="">স্কুলের নাম</Table.HeadCell>
          <Table.HeadCell>কেন্দ্রের নাম</Table.HeadCell>
          <Table.HeadCell className="whitespace-nowrap">
            ই আই আই এন
          </Table.HeadCell>
          <Table.HeadCell className="whitespace-nowrap">
            মোট ছাত্র ছাত্রী
          </Table.HeadCell>
        </Table.Head>
        {len &&
          data.map((school: any) => {
            const handleClick = () => {
              router.push(`/examcenter/individual/${school?.id}`);
            };
            return (
              <React.Fragment key={Math.random() * 100}>
                <Table.Body className="divide-y  text-[16px]">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-transparent">
                    <Table.Cell className="p-4">
                      <Checkbox />
                    </Table.Cell>
                    <Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white text-[16px] font-semibold ">
                      <Link
                        href={`/dashboard/exam/student/${school?.id}`}
                        className="dark:hover:text-indigo-600"
                        rel="prefetch"
                      >
                        {school?.profile?.schoolName}
                      </Link>
                    </Table.Cell>
                    <Table.Cell className="text-[16px] dark:text-white font-semibold whitespace-nowrap">
                      {school?.examCenter?.name}
                    </Table.Cell>
                    <Table.Cell className="text-center tracking-wider text-[16px] dark:text-white font-semibold">
                      {school?.eiin}
                    </Table.Cell>
                    <Table.Cell className="text-center tracking-wider text-[16px] dark:text-white font-semibold">
                      {school?._count?.ExamWiseStudent}
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </React.Fragment>
            );
          })}
      </Table>
    </div>
  );
}
