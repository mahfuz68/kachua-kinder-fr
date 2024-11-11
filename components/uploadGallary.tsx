"use client";

import axios from "axios";
import { Progress } from "flowbite-react";
import { useSession } from "next-auth/react";
import { useRef, useState } from "react";

type Props = {};

export default function UploadGallary({ prop }: any) {
  const { data: session } = useSession();
  const user: any = session?.user;
  const inputFile = useRef<any>(null);

  const [file, setFile] = useState<File | null>(null);
  const [imageId, setImageId] = useState("");
  const [published, setPublished] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [upLoading, setUpLoading] = useState(false);

  const clearFileInput = () => {
    if (inputFile.current) {
      inputFile.current.value = "";
      inputFile.current.type = "text";
      inputFile.current.type = "file";
    }
  };

  const clearState = () => {
    setFile(null);
    setError("");
    setLoading(false);
    setPublished(false);
    setUploadProgress(0);
    setUpLoading(false);
    setImageId("");
    clearFileInput();
  };

  const formData = new FormData();
  // const uploadFile = async (e: any) => {
  //   e.preventDefault();
  //   try {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/gallery/upload`,
  //       {
  //         method: "POST",
  //         body: formData,
  //         headers: {
  //           Authorization: "Bearer " + user?.accessToken,
  //         },
  //       }
  //     );
  //     const data = await res.json();
  //     setImageId(data.imageId);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  const uploadFile = async (e: any) => {
    e.preventDefault();
    try {
      setError("");
      setUploadProgress(0);
      setUpLoading(true);
      const req = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/gallery/upload`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + user?.accessToken,
          },
          onUploadProgress: (progressEvent: any) => {
            const progress = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
          },
        }
      );

      const data = await req.data;

      if (data.error) {
        setError(data.message);
        setUploadProgress(0);
        clearFileInput();
        setLoading(false);
      } else {
        setImageId(data.imageId);
        setUpLoading(false);
      }
    } catch (e: any) {
      setUpLoading(false);
      setUploadProgress(0);
      clearFileInput();
      setError(e.message);
    }
  };

  const createGallery = async (imageId: string, isPublished: boolean) => {
    try {
      setLoading(true);
      setError("");
      if (imageId) {
        const body = { imageId, isPublished };
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery`, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user?.accessToken,
          },
        });
        const data = await res.json();
        if (data.error) {
          setError(error);
          setImageId("");
          setFile(null);
          setLoading(false);
          setPublished(false);
          setUploadProgress(0);
          setUpLoading(false);
          setPublished(false);
        } else {
          setError("");
          setImageId("");
          setFile(null);
          setLoading(false);
          setPublished(false);
          setUploadProgress(0);
          setUpLoading(false);
          prop?.setAllUser([data, ...prop.allUser]);
          prop.setOpenModal(undefined);
        }
      }
    } catch (e: any) {
      setLoading(false);
      setError(e?.message);
    }
  };

  return (
    <div
      id="defaultModal"
      tabIndex={-1}
      aria-hidden="false"
      className={`${
        prop.openModal === "gallery-modal" ? "block" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed flex z-50 justify-center items-center w-full inset-0 md:inset-0 h-[84vh] md:h-full bg-opacity-50 dark:bg-opacity-80 bg-gray-900`}
    >
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        {/* Modal content */}
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          {/* Modal header */}
          <div className="flex justify-between items-center pb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg ml-6 font-semibold text-gray-900 dark:text-white">
              ছবি আপলোড করুন
            </h3>
            <button
              onClick={(e) => {
                clearState();
                prop.setOpenModal(undefined);
              }}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="defaultModal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="space-y-6">
            <div className="p-6 space-y-6">
              <form action="#">
                <div className="grid grid-cols-6 gap-6">
                  <div
                    className={`flex items-center justify-center w-full col-span-6 ${
                      !upLoading && uploadProgress === 100 && "hidden"
                    }`}
                  >
                    <label
                      htmlFor="dropzone-file"
                      onDrop={(e) => setFile(e.dataTransfer.files[0])}
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">
                            আপলোড করতে ক্লিক করুন
                          </span>{" "}
                          অথবা ফাইল টেনে আনুন
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        required
                        type="file"
                        ref={inputFile}
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
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="w-full whitespace-nowrap">
                    {upLoading && (
                      <Progress
                        className="w-44"
                        color="green"
                        progress={uploadProgress}
                      />
                    )}
                    {!upLoading && uploadProgress === 100 && (
                      <div className="bg-gray-700 bg-opacity-50 rounded-md px-3 py-2 flex items-center">
                        <svg
                          className="stroke-2 stroke-current text-green-500 h-8 w-8 mr-2 flex-shrink-0"
                          viewBox="0 0 24 24"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M0 0h24v24H0z" stroke="none" />
                          <circle cx={12} cy={12} r={9} />
                          <path d="M9 12l2 2 4-4" />
                        </svg>
                        <div className="text-green-500">
                          <div className="font-bold text-md">
                            ফাইল আপলোড সম্পূর্ণ হয়েছে
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-span-6">
                    <div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={published}
                          onChange={(e) => {
                            setPublished(e.target.checked);
                          }}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 border-2 p-2  bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                        <span className="ml-3 text-md font-semibold text-gray-900 dark:text-primary-50">
                          পাবলিশ করুন
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            {/* Modal footer */}
          </div>

          <div>
            {error && (
              <p className="ml-6 text-red-500 text-md font-semibold">
                ইরর ম্যাসেজ: {error}
              </p>
            )}
          </div>
          <div className="mt-6 ml-6 flex gap-x-4 pb-4">
            <button
              disabled={loading}
              onClick={() => {
                if (imageId) {
                  createGallery(imageId, published);
                } else {
                  setError("অবশ্যই সকল তথ্য পূরণ করতে হবে");
                }
              }}
              type="submit"
              className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-md px-3 md:px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <svg
                className={`mr-1 -ml-1 w-6 h-6 ${loading ? "hidden" : ""}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx={12}
                    cy={12}
                    r={10}
                    stroke="currentColor"
                    strokeWidth={4}
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <p>
                  <span className="hidden">ছবি</span> আপলোড করুন
                </p>
              )}
            </button>
            <button
              onClick={() => {
                clearState();
                prop.setOpenModal(undefined);
              }}
              className="text-white bg-gray-700 hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 font-semibold rounded-lg text-md px-2 md:px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-600"
              type="submit"
            >
              বাতিল করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
