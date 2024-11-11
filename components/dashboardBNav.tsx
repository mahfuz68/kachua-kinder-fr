import Link from "next/link";
import { useState } from "react";
import { BiHomeSmile } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { PiExamBold } from "react-icons/pi";
import { RiGalleryFill } from "react-icons/ri";

const BottomNavigation = () => {
  const hIcon = <BiHomeSmile />;
  const eIcon = <PiExamBold />;
  const uIcon = <FiUsers />;
  const gIcon = <RiGalleryFill />;
  const Menus = [
    {
      name: "ড্যাশবোর্ড",
      icon: hIcon,
      dis: "translate-x-0",
      link: "/dashboard",
    },
    {
      name: "পরীক্ষা",
      icon: eIcon,
      dis: "translate-x-16",
      link: "/dashboard/exam",
    },
    {
      name: "ইউজার",
      icon: uIcon,
      dis: "translate-x-32",
      link: "/dashboard/users",
    },
    {
      name: "গ্যালারী",
      icon: gIcon,
      dis: "translate-x-48",
      link: "/dashboard/gallery",
    },
    {
      name: "Settings",
      icon: "settings-outline",
      dis: "translate-x-64",
      link: "/dashboard/settings",
    },
  ];
  const [active, setActive] = useState(0);

  return (
    <div className="bg-white max-h-[4.4rem] px-6 rounded-t-xl md:hidden fixed bottom-0 left-0">
      <ul className="flex relative">
        <span
          className={`bg-rose-600 duration-500 ${Menus[active].dis} border-4 border-gray-900 h-16 w-16 absolute
         -top-5 rounded-full`}
        >
          <span
            className="w-3.5 h-3.5 bg-transparent absolute top-4 -left-[18px] 
          rounded-tr-[11px] shadow-myShadow1"
          ></span>
          <span
            className="w-3.5 h-3.5 bg-transparent absolute top-4 -right-[18px] 
          rounded-tl-[11px] shadow-myShadow2"
          ></span>
        </span>
        {Menus.map((menu, i) => (
          <li key={i} className="w-16">
            <Link href={menu.link}>
              <div
                className="flex flex-col text-center pt-6"
                onClick={() => setActive(i)}
              >
                <span
                  className={`text-xl cursor-pointer duration-500 ${
                    i === active && "-mt-6 text-white"
                  }`}
                >
                  {menu.icon}
                </span>
                <span
                  className={` ${
                    active === i
                      ? "translate-y-4 duration-700 opacity-100"
                      : "opacity-0 translate-y-10"
                  } `}
                >
                  {menu.name}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BottomNavigation;
