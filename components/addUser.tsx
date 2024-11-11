/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Modal } from "flowbite-react";
import { ModalBody } from "flowbite-react/lib/esm/components/Modal/ModalBody";
import { ModalFooter } from "flowbite-react/lib/esm/components/Modal/ModalFooter";
import { ModalHeader } from "flowbite-react/lib/esm/components/Modal/ModalHeader";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";

type Props = {};

export default function AddUser({ prop }: any) {
  const rootRef = useRef(null);
  const inputRef: any = useRef(null);
  const { data: session } = useSession();
  const user: any = session?.user;

  useEffect(() => {
    inputRef?.current?.focus();
  }, [inputRef.current]);

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [eiin, setEiin] = useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const [loading, setLoading] = useState(false);
  const crateUser = async (
    name: string,
    mobile: string,
    schoolName: string,
    eiin: string,
    password: string
  ) => {
    setLoading(true);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
      method: "POST",
      body: JSON.stringify({
        name,
        mobile: mobile,
        role: ["TEACHER"],
        schoolName,
        eiin: Number(eiin),
        password,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user?.accessToken,
      },
    });
    const data = await res.json();
    if (data.error) {
      setError(data.error);
      setLoading(false);
    } else {
      prop.setAllUser([...prop.allUser, data]);
      prop.setOpenM(undefined);
      setLoading(false);
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
                      className="block mb-2 font-medium text-gray-900 dark:text-white"
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
                      placeholder="জাকির হোসেন মজুমদার"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-md font-semibold text-gray-900 dark:text-white"
                    >
                      মোবাইল নাম্বার
                    </label>
                    <input
                      ref={inputRef}
                      type="text"
                      name="email"
                      id="email"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="01**********"
                      required
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="school"
                      className="block mb-2 text-md font-semibold text-gray-900 dark:text-white"
                    >
                      স্কুলের নাম
                    </label>
                    <input
                      type="text"
                      name="school"
                      ref={inputRef}
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      id="school"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="বরুচর প্রগতি শিশু শিক্ষা নিকেতন"
                      required={true}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="position"
                      className="block mb-2 text-md font-semibold text-gray-900 dark:text-white"
                    >
                      EIIN
                    </label>
                    <input
                      type="text"
                      pattern="[0-9]*"
                      ref={inputRef}
                      value={eiin}
                      onChange={(e) => setEiin(e.target.value)}
                      name="position"
                      id="position"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="e.g. 183423"
                      required={true}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="current-password"
                      className="block mb-2 text-md font-semibold text-gray-900 dark:text-white"
                    >
                      পাসওয়ার্ড
                    </label>
                    <input
                      type="password"
                      name="current-password"
                      ref={inputRef}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="current-password"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="••••••••"
                      required={true}
                    />
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
                if (name && mobile && schoolName && eiin && password) {
                  crateUser(name, mobile, schoolName, eiin, password);
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
                setMobile("");
                setSchoolName("");
                setEiin("");
                setPassword("");
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
