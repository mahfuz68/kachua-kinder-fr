"use client";
/* eslint-disable react/no-unescaped-entities */

import { Avatar, Checkbox, Table } from "flowbite-react";

import { bang } from "@/lib/font";
import { englishToBanglaNumber, velidClass } from "@/lib/numberTranslate";
import { useState } from "react";
import { HiMiniPencilSquare } from "react-icons/hi2";
import EditResultModal from "../modal/editResultModal";

interface User {
  id: string;
  name: string;
  class: string;
  classRoll: number;
  fatherName: string;
  motherName: string;
  avatar: any;
  user: any;
}

const resultType: any = {
  NOTHING: "প্রযোজ্য নয়",
  TALENTPOOL: "ট্যালেন্ট পুল",
  GENERALGRADE: "সাধারণ গ্রেড",
  SPECIALGRADE: "স্পেশাল গ্রেড",
};

export default function CenterWiseStudentTable({
  data,
  setStd,
}: {
  data: Array<any>;
  setStd: any;
}) {
  const len = data.length > 0 ? data.length : false;
  const [openModal, setOpenModal] = useState("");
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg min-h-[70vh] dark:bg-gray-800">
      <Table hoverable className="rounded-none hover:rounded-none">
        <Table.Head>
          <Table.HeadCell className="p-4">
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell>ছবি</Table.HeadCell>
          <Table.HeadCell>পরীক্ষার্থীর নাম</Table.HeadCell>
          <Table.HeadCell>শ্রেনী</Table.HeadCell>
          <Table.HeadCell>রোল নং</Table.HeadCell>
          <Table.HeadCell className="whitespace-nowrap">
            খাতা কোড
          </Table.HeadCell>
          <Table.HeadCell className="whitespace-nowrap">
            প্রাপ্ত নম্বর
          </Table.HeadCell>
          <Table.HeadCell>বৃত্তি</Table.HeadCell>
          <Table.HeadCell className="whitespace-nowrap">
            ই আই আই এন
          </Table.HeadCell>
          <Table.HeadCell>স্কুলের নাম</Table.HeadCell>
          <Table.HeadCell>পিতার নাম</Table.HeadCell>
          <Table.HeadCell>মাতার নাম</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        {len &&
          data.map((user: any) => {
            const ress =
              user?.student?.classRoll && user?.student?.classRoll === 555
                ? "SPECIALGRADE"
                : user?.result;
            const prop = {
              id: user?.id,
              exampaperCode: user?.exampaperCode,
              marks: user?.marks,
              result: ress,
              classRoll: user?.student?.classRoll,
              openModal,
              setOpenModal,
              data,
              setStd,
            };
            return (
              <Table.Body
                key={Math.random() * 100}
                className="divide-y hover:bg-inherit text-[16px]"
                onDoubleClick={() => setOpenModal(user?.id)}
              >
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="p-4">
                    <Checkbox />
                  </Table.Cell>
                  <Table.Cell className="p-2">
                    <Avatar
                      img={`${process.env.NEXT_PUBLIC_IMAGE_URL}/avatar/${user?.student?.avatar?.imageId}`}
                      rounded
                      stacked
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white text-[16px] font-semibold flex gap-x-3 items-center ">
                    {user?.student?.name}
                  </Table.Cell>
                  <Table.Cell className="text-[16px] dark:text-white font-semibold">
                    {velidClass(user?.student?.classN)}
                  </Table.Cell>
                  <Table.Cell
                    className={`tracking-wider text-[18px] dark:text-white font-bold ${bang.className}`}
                  >
                    {user?.bnRoll}
                  </Table.Cell>
                  <Table.Cell
                    className={`tracking-wider text-[16px] dark:text-white font-semibold`}
                  >
                    {user?.exampaperCode}
                  </Table.Cell>
                  <Table.Cell
                    className={`tracking-wider text-[18px] dark:text-white font-bold ${bang.className}`}
                  >
                    {user?.marks < 1 ? (
                      <span className={bang.className}>নাই</span>
                    ) : (
                      englishToBanglaNumber(user?.marks)
                    )}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-[16px] dark:text-white font-semibold">
                    {resultType[ress]}
                  </Table.Cell>
                  <Table.Cell
                    className={`tracking-wider text-[16px] dark:text-white font-semibold text-center`}
                  >
                    {user?.ExamWiseSchool?.eiin}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-[16px] dark:text-white font-semibold">
                    {user?.ExamWiseSchool?.profile?.schoolName}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-[16px] dark:text-white font-semibold">
                    {user?.student?.fatherName}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-[16px] dark:text-white font-semibold">
                    {user?.student?.motherName}
                  </Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() => setOpenModal(user?.id)}
                      className="flex gap-x-2 text-[15px] px-3 py-2 rounded-lg font-semibold bg-primary-700 hover:bg-primary-800 text-white"
                    >
                      <HiMiniPencilSquare className="w-5 h-5" />
                      ইডিট
                    </button>
                    {openModal == user?.id && <EditResultModal prop={prop} />}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            );
          })}
      </Table>
      {/* <UploadGallary prop={prop} /> */}
    </div>
  );
}
