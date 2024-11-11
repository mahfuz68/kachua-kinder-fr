"use client";
/* eslint-disable react/no-unescaped-entities */

import { Checkbox, Table } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

import { HiMiniPencilSquare, HiTrash } from "react-icons/hi2";
import DeleteSchoolModal from "./deletesSchoolModal";
import EditSchoolModal from "./editSchoolModal";

interface User {
  id: string;
  name: string;
  mobile: string;
  profile: any;
  avatar: any;
  role: any;
}

export default function SchoolTable({
  data,
  name,
  examData,
}: {
  data: any;
  name: string;
  examData: any;
}) {
  // const [alluser, setAllUser] = useState<any>([]);
  const router = useRouter();
  const [openModal, setOpenModal] = useState<string | undefined>(undefined);
  const schoolLength = data && data.length;
  const setExamWiseSchool = examData;

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
          <Table.HeadCell>Actions</Table.HeadCell>

          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        {len &&
          data.map((school: any) => {
            const prop = {
              data,
              setExamWiseSchool,
              openModal,
              setOpenModal,
              school,
            };

            const handleClick = () => {
              router.push(`/examcenter/individual/${school?.id}`);
            };
            const dModal = String(school?.id) + "delete";
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
                      {name}
                    </Table.Cell>
                    <Table.Cell className="text-center tracking-wider text-[16px] dark:text-white font-semibold">
                      {school?.profile?.eiin}
                    </Table.Cell>
                    <Table.Cell className="text-center tracking-wider text-[16px] dark:text-white font-semibold">
                      {school?._count?.ExamWiseStudent}
                    </Table.Cell>

                    <Table.Cell>
                      <div className="font-medium  text-cyan-600  dark:text-cyan-500 flex gap-x-3 items-center">
                        <button
                          onClick={(e) => {
                            setOpenModal(prop?.school?.id);
                          }}
                          className="flex gap-x-2 text-[15px] px-3 py-2 rounded-lg bg-primary-700 hover:bg-primary-800 text-white font-semibold"
                        >
                          <HiMiniPencilSquare className="w-5 h-5" />
                          ইডিট
                        </button>
                        <button
                          onClick={(e) => {
                            setOpenModal(String(prop?.school?.id) + "delete");
                          }}
                          className="flex gap-x-1.5 text-[15px] px-3 py-2 rounded-lg bg-red-600  hover:bg-red-800 text-white font-semibold"
                        >
                          <HiTrash className="w-5 h-5" />
                          ডিলিট
                        </button>
                        {openModal === school?.id && (
                          <EditSchoolModal prop={prop} />
                        )}
                        {openModal === dModal && (
                          <DeleteSchoolModal prop={prop} />
                        )}
                      </div>
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
