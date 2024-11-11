import Link from "next/link";
import { AiFillClockCircle } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";

type Props = {};

export default function examList({}: Props) {
  return (
    <div>
      <Link href="/exam/1" rel="prefetch">
        <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-between mb-5">
            <div className="flex items-center gap-x-1 text-primary-800 text-sm font-medium  dark:bg-primary-200 dark:text-primary-800 px-2.5 py-0.5 rounded">
              <AiFillClockCircle />
              <h2>14 day</h2>
            </div>
            <button>
              <FaEdit className="w-5 h-5" />
            </button>
          </div>
          <div className=" mb-5 text-gray-500">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              How to quickly deploy a static website
            </h2>
          </div>

          <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
            Static websites are now used to bootstrap lots of websites and are
            becoming the basis for a variety of tools that even influence both
            web designers and developers influence both web designers and
            developers.
          </p>
        </article>
      </Link>
    </div>
  );
}
