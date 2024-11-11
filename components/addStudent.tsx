/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Modal } from "flowbite-react";
import { ModalBody } from "flowbite-react/lib/esm/components/Modal/ModalBody";
import { ModalFooter } from "flowbite-react/lib/esm/components/Modal/ModalFooter";
import { ModalHeader } from "flowbite-react/lib/esm/components/Modal/ModalHeader";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";

type Props = {};

export default function AddStudent({ prop }: any) {
  const rootRef = useRef(null);
  const inputRef: any = useRef(null);
  const { data: session } = useSession();
  const user: any = session?.user;

  useEffect(() => {
    inputRef?.current?.focus();
  }, [inputRef.current]);

  const [name, setName] = useState("");
  const [classRoll, setClassRoll] = useState("");
  const [cless, setClass] = useState("ONE");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = React.useState("");
  const [avatarId, setAvatarId] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);

  const [error, setError] = React.useState("");
  const [loading, setLoading] = useState(false);

  const formData = new FormData();
  const uploadFile = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/student/uploadavatar/`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: "Bearer " + user?.accessToken,
          },
        }
      );
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setLoading(false);
      } else {
        setAvatarId(data.imageId);
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const createStudent = async (
    name: string,
    classRoll: string,
    cless: string,
    fatherName: string,
    motherName: string,
    avatarId: string,
    examId: string
  ) => {
    try {
      if (avatarId && name && classRoll && cless && fatherName && motherName) {
        const body = {
          name,
          classRoll: +classRoll,
          classN: cless,
          fatherName,
          motherName,
          avatarId,
          examId,
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user?.accessToken,
          },
        });
        const data = await res.json();

        if (data) {
          setError("");
          //   setAvatarId("");
          prop.setAllUser([...prop.allUser, data]);
          prop.setOpenM(undefined);
          setLoading(false);
          setName("");
          setClassRoll("");
          setClass("");
          setFatherName("");
          setMotherName("");
          setAvatarId("");
        }
      }
    } catch (e: any) {
      setError(e.message);
      console.log(e);
    }
  };

  return (
    <div ref={rootRef}>
      <Modal
        dismissible
        root={rootRef.current ?? undefined}
        show={prop.openM === "form-elements"}
        size="2xl"
        popup
        onClose={() => prop.setOpenM(null)}
      >
        <ModalHeader />
        <ModalBody>
          <div className="space-y-6">
            <div className="p-6 space-y-6">
              <div className="font-semibold text-[15px]">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="name"
                      className="block mb-2 font-semibold text-md text-gray-900 dark:text-white"
                    >
                      নাম
                    </label>
                    <input
                      type="text"
                      ref={inputRef}
                      value={name}
                      name="name"
                      id="first-name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="মাহফুজ আনাম মজুমদার"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="countries"
                      className="block mb-2 text-md font-semibold text-gray-900 dark:text-white"
                    >
                      শ্রেনী
                    </label>
                    <select
                      id="countries"
                      value={cless}
                      name="countries"
                      onChange={(e) => setClass(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                    >
                      <option value="ONE">প্রথম শ্রেণী</option>
                      <option value="TWO">দ্বিতীয় শ্রেণী</option>
                      <option value="THREE">তৃতীয় শ্রেনী</option>
                      <option value="FOUR">চতুর্থ শ্রেনী</option>
                      <option value="FIVE">পঞ্চম শ্রেনী</option>
                    </select>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="school"
                      className="block mb-2 text-md font-semibold text-gray-900 dark:text-white"
                    >
                      ক্লাস রোল নং
                    </label>
                    <input
                      type="text"
                      name="school"
                      ref={inputRef}
                      value={classRoll}
                      onChange={(e) => setClassRoll(e.target.value)}
                      id="school"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="10"
                      required={true}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="position"
                      className="block mb-2 text-md font-semibold text-gray-900 dark:text-white"
                    >
                      পিতার নাম
                    </label>
                    <input
                      type="text"
                      ref={inputRef}
                      value={fatherName}
                      onChange={(e) => setFatherName(e.target.value)}
                      name="position"
                      id="position"
                      className="shadow-md font-semibold bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="জামাল হোসেন"
                      required={true}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="current"
                      className="block mb-2 text-md font-semibold text-gray-900 dark:text-white"
                    >
                      মাতার নাম
                    </label>
                    <input
                      type="text"
                      name="current"
                      ref={inputRef}
                      value={motherName}
                      onChange={(e) => setMotherName(e.target.value)}
                      id="current"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="হালিমা বেগম"
                      required={true}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <>
                      <label
                        className="block mb-2 text-md font-semibold text-gray-900 dark:text-white"
                        htmlFor="default_size"
                      >
                        ছবি আপলোড করুন
                      </label>
                      <input
                        required
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          console.log("fire onchange event");

                          const imageFile = e.target.files?.[0];

                          if (imageFile?.name) {
                            setFile(imageFile);

                            formData.append("file", imageFile);
                            uploadFile(e);
                          }
                        }}
                        className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        id="default_size"
                      />
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700 w-full flex gap-x-5">
            <button
              onClick={() => {
                console.log("fire onclick event");

                if (
                  name &&
                  fatherName &&
                  classRoll &&
                  cless &&
                  motherName &&
                  avatarId
                ) {
                  createStudent(
                    name,
                    classRoll,
                    cless,
                    fatherName,
                    motherName,
                    avatarId,
                    prop.examId
                  );
                  //   crateUser(name, mobile, schoolName, eiin, password);
                } else {
                  setError("অবশ্যই সকল তথ্য পূরণ করতে হবে");
                }
              }}
              className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              type="submit"
            >
              অ্যাড করুন
            </button>
            <button
              onClick={() => {
                prop.setOpenM(null);
                setName("");
                setFatherName("");
                setClass("");
                setClassRoll("");
                setMotherName("");
                setAvatarId("");
              }}
              className="text-white bg-gray-700 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-600"
              type="submit"
            >
              বাতিল করুন
            </button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
}
