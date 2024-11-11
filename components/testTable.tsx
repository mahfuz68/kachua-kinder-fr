"use client";
/* eslint-disable react/no-unescaped-entities */

import { Avatar, Checkbox, Table } from "flowbite-react";

import { FaEdit } from "react-icons/fa";

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

export default function TestTable({ data }: { data: Array<any> }) {
  // const [alluser, setAllUser] = useState<any>([]);

  const len = data.length > 0 ? data.length : false;

  const imgaddress =
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg3cv7Qpgv8kERJvDuTcedfAiHvUA4qOHIdKRMg5lY4yL8r8Hhqax00kx0NAFB8de-g4J4UwWJ2L4PvxjsswQQDDwABTovM8dLo7f9PoxKdx7FVI0eWDjzjsI373u8ck9cTfKwQMJCB2uD4eVaYNnba6tO2zfalNYbQlECQNodmI2GaaiUZv_dIglAA/s836/%E0%A6%95%E0%A6%BF%E0%A6%89%E0%A6%9F%20%E0%A6%AE%E0%A7%87%E0%A6%AF%E0%A6%BC%E0%A7%87%E0%A6%A6%E0%A7%87%E0%A6%B0%20%E0%A6%AA%E0%A7%8D%E0%A6%B0%E0%A7%8B%E0%A6%AB%E0%A6%BE%E0%A6%87%E0%A6%B2%20%E0%A6%AA%E0%A6%BF%E0%A6%95%20-%20%E0%A6%AE%E0%A7%87%E0%A6%AF%E0%A6%BC%E0%A7%87%E0%A6%A6%E0%A7%87%E0%A6%B0%20%E0%A6%AA%E0%A6%BF%E0%A6%95%E0%A6%9A%E0%A6%BE%E0%A6%B0%20%E0%A7%A8%E0%A7%A6%E0%A7%A8%E0%A7%A9%20-%20%E0%A6%AE%E0%A7%87%E0%A6%AF%E0%A6%BC%E0%A7%87%E0%A6%A6%E0%A7%87%E0%A6%B0%20%E0%A6%AB%E0%A6%9F%E0%A7%8B%20%E0%A6%A1%E0%A6%BF%E0%A6%9C%E0%A6%BE%E0%A6%87%E0%A6%A8%20-%20meye%20pic%20-%20NeotericIT.com%20(1).jpg";

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg min-h-[70vh] dark:bg-gray-800">
      <Table hoverable className="rounded-none hover:rounded-none">
        <Table.Head>
          <Table.HeadCell className="p-4">
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell>ছাত্রের নাম</Table.HeadCell>
          <Table.HeadCell>শ্রেনী</Table.HeadCell>
          <Table.HeadCell>পিতার নাম</Table.HeadCell>
          <Table.HeadCell>মাতার নাম</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>

          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        {len &&
          data.map((user: User) => (
            <Table.Body
              key={Math.random() * 100}
              className="divide-y hover:bg-inherit text-[16px]"
            >
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="p-4">
                  <Checkbox />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap text-gray-900 dark:text-white text-[16px] font-semibold flex gap-x-3 items-center ">
                  <Avatar
                    img={`${process.env.NEXT_PUBLIC_IMAGE_URL}/avatar/${user?.avatar?.imageId}`}
                    rounded
                    stacked
                  />
                  {user.name}
                </Table.Cell>
                <Table.Cell className="text-[16px] dark:text-white font-semibold">
                  {user?.class}
                </Table.Cell>
                <Table.Cell className="tracking-wider text-[16px] dark:text-white font-semibold">
                  {user?.fatherName}
                </Table.Cell>
                <Table.Cell className="text-[16px] dark:text-white font-semibold">
                  {user?.motherName}
                </Table.Cell>
                <Table.Cell>
                  <a className="font-medium  text-cyan-600  dark:text-cyan-500">
                    <button className="flex gap-x-2 text-[14px] px-3 py-2 rounded-lg bg-indigo-600 text-white">
                      <FaEdit className="w-5 h-5" />
                      Edit
                    </button>
                  </a>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
      </Table>
    </div>
  );
}
