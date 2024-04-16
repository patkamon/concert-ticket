"use client";

export default function Panel() {
  return (
    <div className="flex justify-between w-full">
      <div className="rounded-md w-[20rem] h-[20rem] relative bg-sky-700 flex flex-col justify-evenly items-center">
      <div className="text-6xl">👤</div>
      <div className="text-3xl text-white">Total of seats</div>
        <div className="text-6xl text-white">500</div>
      </div>
      <div className="rounded-md w-[20rem] h-[20rem] relative bg-teal-600 flex flex-col justify-evenly items-center">
      <div className="text-6xl">🏅</div>
      <div className="text-3xl text-white">Reserve</div>
        <div className="text-6xl text-white">120</div>
      </div>

      <div className="rounded-md w-[20rem] h-[20rem] relative bg-red-400 flex flex-col justify-evenly items-center">
      <div className="text-6xl">❌</div>
      <div className="text-3xl text-white">Cancel</div>
        <div className="text-6xl text-white">12</div>
      </div>
    </div>
  );
}
