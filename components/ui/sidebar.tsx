"use client";
import { FC, Fragment, ReactElement, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { IoMdDesktop, IoMdLogOut, IoMdSettings } from "react-icons/io";
import { AiFillCaretDown } from "react-icons/ai";
import { FaUserClock } from "react-icons/fa";
import { PiUsersThreeFill } from "react-icons/pi";
import Link from "next/link";
import { useQueryState } from "next-usequerystate";
import { TUser } from "@/entities";
import { hasCommonElements } from "@/utils";
import { FaUsersCog, FaUserEdit } from "react-icons/fa";
import Avatar from "react-avatar";
import { Typography } from "./typography";

export const Sidebar: FC<{ user: TUser }> = ({ user }): ReactElement => {
  const [isSidebarOpen, setIsSidebarOpen] = useQueryState("isSidebarOpen");
  const [open, setOpen] = useState("");
  const userName = useMemo(() => user?.fullname, [user]);
  const roleName = useMemo(() => user?.role?.name, [user]);
  const pathname = usePathname();

  const selectedMenu = (url: string) =>
    clsx(
      "flex cursor-pointer items-center font-normal py-3 px-2 text-green-500 rounded-lg group hover:text-success-800 hover:shadow-md hover:bg-white",
      {
        "bg-white shadow-md font-[600] text-green-500": pathname === url,
      }
    );

  const sidebarClassName = clsx(
    "fixed top-0 left-0 z-40 w-64 h-screen transition-transform",
    {
      "translate-x-0":
        isSidebarOpen === "open" || isSidebarOpen === "null" || !isSidebarOpen,
      "-translate-x-full": isSidebarOpen === "close",
    }
  );

  const iconClassName = (url: string) =>
    clsx(
      "flex-shrink-0  w-auto h-auto transition duration-75 group-hover:text-white group-hover:bg-green-500 group-hover:p-2 group-hover:rounded-lg hover:text-white",
      {
        "text-success-800 bg-white shadow-sm p-2 rounded-lg": pathname !== url,

        "text-white bg-green-500 p-2 rounded-lg": pathname === url,
      }
    );

  const sidebarData = [
    {
      name: "Kelola Dosen",
      icon: <FaUserEdit className={iconClassName("/dashboard/guest")} />,
      path: "guest",
      permissions: ["Read Dosen"],
      children: [
        {
          name: "Data Dosen",
          icon: <FaUserClock className={iconClassName("/dashboard/guest")} />,
          path: "/dashboard/dosen",
          url: `/dashboard/dosen`,
          permissions: ["Read Dosen"],
        },
        {
          name: "Hasil Evaluasi",
          icon: (
            <PiUsersThreeFill className={iconClassName("/dashboard/user")} />
          ),
          path: "/dashboard/result",
          url: `/dashboard/result`,
          permissions: ["Read Dosen"],
        },
      ],
    },

    {
      name: "Kelola Pertanyaan",
      icon: <FaUsersCog className={iconClassName("/dashboard/user")} />,
      path: "role",
      permissions: ["Read Dosen"],
      children: [
        {
          name: "Data Pertanyaan",
          icon: (
            <PiUsersThreeFill className={iconClassName("/dashboard/user")} />
          ),
          path: "/dashboard/question",
          url: `/dashboard/question`,
          permissions: ["Read Dosen"],
        },
      ],
    },
  ];

  return (
    <aside
      id="default-sidebar"
      className={sidebarClassName}
      aria-label="Sidebar"
    >
      <div className="h-screen px-3 pt-4 pb-28 overflow-y-hidden bg-grey-50 shadow-md justify-between">
        <div className="flex flex-col h-full">
          <div className="flex flex-col gap-y-4 mb-4">
            <div className="flex gap-x-3 items-center justify-center">
              <span className="text-success-800 text-center font-bold  w-full block text-2xl">
                EDOM Uninus
              </span>
            </div>

            <Link href={"/dashboard/setting?menu=account"}>
              <div className="p-2 rounded-lg flex flex-col items-center justify-center gap-y-4 cursor-pointer">
                <Avatar
                  name={userName}
                  size="100"
                  className="rounded-full w-[100px] h-auto"
                />
                <div className="flex flex-col gap-y-1 items-center">
                  <Typography variant="bold" color="text-success-800">
                    {userName}
                  </Typography>
                  <Typography variant="reguler" color="text-success-800">
                    {roleName}
                  </Typography>
                </div>
              </div>
            </Link>

            <hr className="text-grey-300" />
          </div>
          <ul className="space-y-2 font-medium">
            {hasCommonElements(["Dashboard"], user?.role?.permissions) && (
              <li>
                <Link
                  href={`/dashboard?title=Dashboard&isSidebarOpen=${isSidebarOpen}`}
                  className={selectedMenu("/dashboard")}
                >
                  <IoMdDesktop className={iconClassName("/dashboard")} />
                  <Typography color="ms-3">Beranda</Typography>
                </Link>
              </li>
            )}
            {sidebarData.map((item, index) => (
              <Fragment key={index}>
                {hasCommonElements(
                  item.permissions,
                  user?.role?.permissions
                ) && (
                  <li key={index}>
                    <div
                      onClick={() =>
                        open === "" || open !== item.path
                          ? setOpen(item.path)
                          : setOpen("")
                      }
                      className={selectedMenu("") + " justify-between"}
                    >
                      <div className="flex gap-x-3 items-center group">
                        {item.icon}
                        {item.name}
                      </div>
                      <AiFillCaretDown
                        className={clsx(
                          "flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75  group-hover:text-green-500",
                          {
                            "rotate-180": open === item.path,
                          }
                        )}
                      />
                    </div>
                    <div className="my-3" />
                    {open === item.path && (
                      <div className="flex flex-col gap-y-2 p-2 bg-green-50 ml-2 rounded-lg">
                        {item.children?.map((child, index) => (
                          <Fragment key={index}>
                            {hasCommonElements(
                              child.permissions,
                              user?.role?.permissions
                            ) && (
                              <Link
                                key={index}
                                href={child.url}
                                className={selectedMenu(child.path)}
                              >
                                {child.icon}
                                <span className="flex-1 ms-3">
                                  {child.name}
                                </span>
                              </Link>
                            )}
                          </Fragment>
                        ))}
                      </div>
                    )}
                  </li>
                )}
              </Fragment>
            ))}
          </ul>
        </div>
        <li className="cursor-pointer">
          <div className={selectedMenu("")}>
            <IoMdLogOut className={iconClassName("")} />
            <Typography color="ms-3">Logout</Typography>
          </div>
        </li>
      </div>
    </aside>
  );
};
