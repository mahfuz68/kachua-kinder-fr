/* eslint-disable react-hooks/exhaustive-deps */
"use Client";

import { useSession } from "next-auth/react";
import { useState } from "react";

type Props = {
  publish: boolean;
  id: string;
};

export default function TgButton({ publish, id }: Props) {
  const [published, setPublished] = useState(publish);
  const { data: session } = useSession();
  const user: any = session?.user;

  //   async function publishd() {
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/gallery/${id}`,
  //       {
  //         method: "PETCH",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + user?.accessToken,
  //         },
  //         body: JSON.stringify({ isPublished: published }),
  //       }
  //     );
  //     if (!res.ok) {
  //       throw new Error("Failed to fetch data");
  //     }
  //   }

  return (
    <div className=" p-1 flex justify-between text-white">
      <div>{published ? "পাবলিশ আছে" : "পাবলিশ হয়নি"}</div>
      <label className="relative mr-10 inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={published}
          onChange={() => {
            setPublished(!published);
          }}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600" />
      </label>
    </div>
  );
}
