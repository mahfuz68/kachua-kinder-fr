"use client";
/* eslint-disable react/no-unescaped-entities */

import { Avatar, Checkbox, Table } from "flowbite-react";

import { velidClass } from "@/lib/numberTranslate";

export default function StudentTable({
  data,
  isPub,
}: {
  data: Array<any>;
  isPub: boolean;
}) {
  console.log(isPub);

  const len = data.length > 0 ? data.length : false;
  const generateResult = (res: any, roll: any) => {
    let result = "";
    if (roll && roll === 555) {
      result = "ট্যলেন্টপুল";
    } else if (res) {
      const rx: any = {
        TALENTPOOL: "ট্যলেন্টপুল",
        NOTHING: "প্রযোজ্য নয়",
        GENERALGRADE: "সাধারণ গ্রেডে",
      };
      result = rx[res];
    }
    return result;
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg min-h-[80vh] dark:bg-gray-800">
      <Table hoverable className="rounded-none hover:rounded-none">
        <Table.Head>
          <Table.HeadCell className="p-4">
            <Checkbox />
          </Table.HeadCell>
          <Table.HeadCell>ছবি</Table.HeadCell>
          <Table.HeadCell>পরীক্ষার্থীর নাম</Table.HeadCell>
          <Table.HeadCell>শ্রেনী</Table.HeadCell>
          <Table.HeadCell>রোল নং</Table.HeadCell>
          {isPub && <Table.HeadCell>রেজাল্ট</Table.HeadCell>}
          <Table.HeadCell>পিতার নাম</Table.HeadCell>
          <Table.HeadCell>মাতার নাম</Table.HeadCell>
        </Table.Head>
        {len &&
          data.map((user: any) => {
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
                  <Table.Cell className="text-[16px] dark:text-white font-bold">
                    {user?.bnRoll}
                  </Table.Cell>
                  {isPub && (
                    <Table.Cell className="text-[16px] dark:text-white font-bold">
                      {generateResult(user?.result, user?.student?.classRoll)}
                    </Table.Cell>
                  )}
                  <Table.Cell className="whitespace-nowrap text-[16px] dark:text-white font-semibold">
                    {user?.student?.fatherName}
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap text-[16px] dark:text-white font-semibold">
                    {user?.student?.motherName}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            );
          })}
      </Table>
    </div>
  );
}
