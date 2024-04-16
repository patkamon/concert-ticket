"use client";


export default function Sidebar({ role }: { role: String }) {
  return ( <div className="h-screen sticky top-0 bg-fuchsia-300 w-1/6 min-w-[100px] flex flex-col gap-4 justify-between">
      <div className="flex flex-col">
        <span className="font-semibold text-3xl mx-auto my-10">{role}</span>

        <div className="bg-green-200 py-4 active:bg-gray-400">Home</div>
        <div className="bg-green-200 py-4 active:bg-gray-400">History</div>
        <div className="bg-green-200 py-4 active:bg-gray-400">Switch to</div>
      </div>

      <div className="bg-green-200 py-4 active:bg-gray-400">Logout</div>
    </div>
  );
}