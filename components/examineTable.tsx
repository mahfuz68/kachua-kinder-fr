"use client";
/* eslint-disable react/no-unescaped-entities */

import { Avatar, Checkbox, Table } from "flowbite-react";
import { useState } from "react";

import { bang } from "@/lib/font";
import { englishToBanglaNumber, velidClass } from "@/lib/numberTranslate";
import { HiMiniPencilSquare, HiTrash } from "react-icons/hi2";
import DeleteStudentModal from "./deleteStudentModal";
import EditStudentModal from "./editStudentModal";
import EditResultModal from "./modal/editResultModal";
import { resultType, scholarshipType } from "./tableComponent";

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

export default function ExamineTable({
  data,
  examId,
  aptx,
}: {
  data: Array<any>;
  examId: string;
  aptx: any;
}) {
  const [openModal, setOpenModal] = useState("");
  const [openRModal, setOpenRModal] = useState("");

  const setStudent = aptx;

  const len = data.length > 0 ? data.length : false;
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
          <Table.HeadCell>প্রাপ্ত নম্বর</Table.HeadCell>
          <Table.HeadCell>বৃত্তির ধরন</Table.HeadCell>
          <Table.HeadCell>পিতার নাম</Table.HeadCell>
          <Table.HeadCell>মাতার নাম</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>

          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        {len &&
          data.map((user: any) => {
            const prop = {
              data,
              setStudent,
              openModal,
              setOpenModal,
              examId,
              user,
            };
            const ress = scholarshipType(
              user?.result,
              user?.student?.classRoll
            );
            const rProp = {
              id: user?.id,
              exampaperCode: user?.exampaperCode,
              marks: user?.marks,
              result: ress,
              classRoll: user?.student?.classRoll,
              openModal: openRModal,
              setOpenModal: setOpenRModal,
              data,
              setStd: aptx,
            };
            const dModal = String(user?.id) + "delete";

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
                      img={`${process.env.NEXT_PUBLIC_IMAGE_URL}/avatar/${user?.student?.avatar?.imageId}`}
                      rounded
                      stacked
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white text-[16px] font-semibold align-middle">
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
                    className={`tracking-wider text-[18px] dark:text-white font-bold ${bang.className}`}
                  >
                    {user?.marks > 0
                      ? englishToBanglaNumber(user?.marks)
                      : "নাই"}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-[16px] dark:text-white font-semibold">
                    {resultType[ress]}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-[16px] dark:text-white font-semibold">
                    {user?.student?.fatherName}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-[16px] dark:text-white font-semibold">
                    {user?.student?.motherName}
                  </Table.Cell>
                  <Table.Cell>
                    <div
                      className="font-medium text-cyan-600  dark:text-cyan-500
                    flex gap-x-3 items-center"
                    >
                      <button
                        onClick={() => setOpenRModal(user?.id)}
                        className="flex gap-x-2 text-[15px] px-3 py-2 rounded-lg font-semibold bg-primary-700 hover:bg-primary-800 text-white"
                      >
                        <HiMiniPencilSquare className="w-5 h-5" />
                        রেজাল্ট
                      </button>
                      <button
                        onClick={() => setOpenModal(user?.id)}
                        className="flex gap-x-2 text-[15px] px-3 py-2 rounded-lg font-semibold bg-primary-700 hover:bg-primary-800 text-white"
                      >
                        <HiMiniPencilSquare className="w-5 h-5" />
                        ইডিট
                      </button>
                      <button
                        onClick={(e) => {
                          setOpenModal(String(user?.id) + "delete");
                        }}
                        className="flex gap-x-1.5 text-[15px] px-3 py-2 rounded-lg bg-red-600  hover:bg-red-800 text-white font-semibold"
                      >
                        <HiTrash className="w-5 h-5" />
                        ডিলিট
                      </button>
                      {openRModal == user?.id && (
                        <EditResultModal prop={rProp} />
                      )}
                      {openModal == user?.id && (
                        <EditStudentModal prop={prop} />
                      )}
                      {openModal == dModal && (
                        <DeleteStudentModal prop={prop} />
                      )}
                    </div>
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
