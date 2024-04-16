"use client";

import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export default function Sidebar({
  role,
  setRole,
  selectHome,
}: {
  role: String;
  setRole: Dispatch<SetStateAction<String>>;
  selectHome: boolean;
  setSelectHome: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="h-screen sticky top-0 bg-white border-r border-gray-200 w-1/6 min-w-[100px] flex flex-col gap-4 justify-between">
      <div className="flex flex-col mx-4">
        <span className="font-semibold xl:text-3xl text-xl mx-auto my-10">{role}</span>

        {role == "Admin" && (
          <Link
            href="/"
            className={`py-4 px-2 ${selectHome && "bg-gray-200 rounded-md"}`}
          >
            🏠 Home
          </Link>
        )}
        {role == "Admin" && (
          <Link
            href="/history"
            className={`py-4 px-2 ${!selectHome && "bg-gray-200 rounded-md"}`}
          >
            📥 History
          </Link>
        )}
        <Link
          className={`py-4 px-2 `}
          href="/"
          onClick={() => {
            setRole(role == "Admin" ? "User" : "Admin");
          }}
        >
          🔄 Switch to
        </Link>
      </div>

      <div className={`py-4 px-2 mx-4`}>↪ Logout</div>
    </div>
  );
}
