"use client";

import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export default function Sidebar({
  role,
  setRole,
}: {
  role: String;
  setRole: Dispatch<SetStateAction<String>>;
}) {
  return (
    <div className="h-screen sticky top-0 bg-fuchsia-300 w-1/6 min-w-[100px] flex flex-col gap-4 justify-between">
      <div className="flex flex-col">
        <span className="font-semibold text-3xl mx-auto my-10">{role}</span>

        <Link href="/" className="bg-green-200 py-4 active:bg-gray-400">
          Home
        </Link>
        <Link href="/history" className="bg-green-200 py-4 active:bg-gray-400">
          History
        </Link>
        <div
          className="bg-green-200 py-4 active:bg-gray-400"
          onClick={() => {
            setRole(role == "Admin" ? "User" : "Admin");
          }}
        >
          Switch to
        </div>
      </div>

      <div className="bg-green-200 py-4 active:bg-gray-400">Logout</div>
    </div>
  );
}
