/* eslint-disable react/no-unescaped-entities */

"use client";

import { Avatar, Checkbox, Table } from "flowbite-react";
import { useState } from "react";

import { bang } from "@/lib/font";
import { velidClass } from "@/lib/numberTranslate";
import UploadGallary from "./uploadGallary";

interface User {
  id: string;
  name: string;
  classN: string;
  classRoll: any;
  fatherName: string;
  motherName: string;
  avatar: any;
  user: any;
  ExamWiseStudent: any;
  ExamWiseSchool: any;
}
export const resultType: any = {
  NOTHING: "প্রযোজ্য নয়",
  TALENTPOOL: "ট্যালেন্ট পুল",
  GENERALGRADE: "সাধারণ গ্রেড",
  SPECIALGRADE: "স্পেশাল গ্রেড",
};

export const scholarshipType = (result: any, classRoll: number) => {
  return classRoll && classRoll === 555 ? "SPECIALGRADE" : result;
};

export default function TableComponet({ data }: { data: Array<any> }) {
  const [openModal, setOpenModal] = useState("");

  const len = data.length > 0 ? data.length : false;

  const prop = { openModal, setOpenModal };

  return (
    <div className="relative overflow-x-auto shadow-md min-h-[70vh] dark:bg-gray-800">
      <Table hoverable className="rounded-none -z-10 hover:rounded-none">
        <Table.Head>
          <Table.HeadCell className="p-4">
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell>ছবি</Table.HeadCell>
          <Table.HeadCell>পরীক্ষার্থীর নাম</Table.HeadCell>
          <Table.HeadCell>রোল নং</Table.HeadCell>
          <Table.HeadCell>শ্রেনী</Table.HeadCell>
          <Table.HeadCell>খাতা কোড</Table.HeadCell>
          <Table.HeadCell>প্রাপ্ত নম্বর</Table.HeadCell>
          <Table.HeadCell>বৃত্তি</Table.HeadCell>
          <Table.HeadCell>স্কুলের নাম</Table.HeadCell>
          <Table.HeadCell>পিতার নাম</Table.HeadCell>
          <Table.HeadCell>মাতার নাম</Table.HeadCell>
        </Table.Head>
        {len &&
          data.map((user: User) => {
            const ress = scholarshipType(
              user?.ExamWiseStudent?.result,
              user?.classRoll
            );

            return (
              <Table.Body
                key={Math.random() * 100}
                className="divide-y hover:bg-inherit text-[16px]"
              >
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="p-4">
                    <Checkbox />
                  </Table.Cell>
                  <Table.Cell className="p-2">
                    <Avatar
                      img={`${process.env.NEXT_PUBLIC_IMAGE_URL}/avatar/${user?.avatar?.imageId}`}
                      rounded
                      stacked
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white text-[16px] font-semibold">
                    {user.name}
                  </Table.Cell>
                  <Table.Cell
                    className={`text-[18px] dark:text-white font-semibold ${bang.className}`}
                  >
                    {user?.ExamWiseStudent?.bnRoll}
                  </Table.Cell>
                  <Table.Cell className="text-[16px] dark:text-white font-semibold">
                    {velidClass(user?.classN)}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-[16px] dark:text-white font-semibold">
                    {user?.ExamWiseStudent?.exampaperCode}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-[16px] dark:text-white font-semibold">
                    {user?.ExamWiseStudent?.marks > 0
                      ? user?.ExamWiseStudent?.marks
                      : "নাই"}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-[16px] dark:text-white font-semibold">
                    {resultType[ress]}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-[16px] dark:text-white font-semibold">
                    {user?.ExamWiseSchool?.profile?.schoolName}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap tracking-wider text-[16px] dark:text-white font-semibold">
                    {user?.fatherName}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-[16px] dark:text-white font-semibold">
                    {user?.motherName}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            );
          })}
      </Table>
      <UploadGallary prop={prop} />
    </div>
  );
}
