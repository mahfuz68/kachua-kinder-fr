"use client";
/* eslint-disable react/no-unescaped-entities */

import { Avatar, Checkbox, Table } from "flowbite-react";
import { useState } from "react";

import { HiMiniPencilSquare } from "react-icons/hi2";
import UpdateUserModal from "./editUserModal";

interface User {
  id: string;
  name: string;
  mobile: string;
  profile: any;
  avatar: any;
  role: any;
}

export default function UserTable({
  data,
  sdata,
}: {
  data: Array<any>;
  sdata: any;
}) {
  // const [alluser, setAllUser] = useState<any>([]);
  const [openModal, setOpenModal] = useState<string | undefined>(undefined);

  const len = data.length > 0 ? data.length : false;
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg min-h-[70vh] dark:bg-gray-800">
      <Table hoverable className="rounded-none hover:rounded-none ">
        <Table.Head className="text-[14px]">
          <Table.HeadCell>
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell>ছবি</Table.HeadCell>
          <Table.HeadCell>নাম</Table.HeadCell>
          <Table.HeadCell>EIIN</Table.HeadCell>
          <Table.HeadCell>স্কুলের নাম নাম</Table.HeadCell>
          <Table.HeadCell>মোবাইল নম্বর</Table.HeadCell>

          <Table.HeadCell>রোল</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>

          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        {len &&
          data.map((user: User) => {
            const prop = { user, openModal, setOpenModal, data, sdata };
            return (
              <Table.Body
                key={user?.profile.eiin}
                className="divide-y hover:bg-inherit text-[16px]"
              >
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="p-4">
                    <Checkbox />
                  </Table.Cell>
                  <Table.Cell className="px-2">
                    <Avatar
                      alt="avatar"
                      img="/imgx.webp"
                      className="w-12 h-6"
                      rounded
                      stacked
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white text-[16px] font-semibold">
                    {user.name}
                  </Table.Cell>
                  <Table.Cell className="tracking-wider text-[16px] font-hind dark:text-white font-semibold">
                    {user?.profile.eiin}
                  </Table.Cell>
                  <Table.Cell className="tracking-wider text-[16px] font-hind dark:text-white font-semibold whitespace-nowrap">
                    {user?.profile.schoolName}
                  </Table.Cell>

                  <Table.Cell className="text-[16px] tracking-wider dark:text-white font-semibold">
                    {user?.mobile}
                  </Table.Cell>
                  <Table.Cell className="text-[16px] dark:text-white font-semibold">
                    {user?.role}
                  </Table.Cell>
                  <Table.Cell>
                    <a className="font-medium  text-cyan-600  dark:text-cyan-500">
                      <button
                        onClick={(e) => {
                          setOpenModal(user?.id);
                        }}
                        className="flex gap-x-2 text-[15px] px-3 py-2 rounded-lg bg-primary-700 hover:bg-primary-800 text-white font-semibold"
                      >
                        <HiMiniPencilSquare className="w-5 h-5" />
                        ইডিট
                      </button>
                      {openModal === user?.id && (
                        <UpdateUserModal prop={prop} />
                      )}
                    </a>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            );
          })}
      </Table>
    </div>
  );
}
