"use client";

export default function Panel() {
  return (
    <div className="flex justify-between w-full flex-col md:flex-row items-center gap-2">
      <div className="rounded-md md:w-48 md:h-48 xl:w-80 xl:h-80  w-44 h-44  relative bg-sky-700 flex flex-col justify-evenly items-center">
        <div className="text-6xl">👤</div>
        <div className="md:text-3xl text-white text-2xl">Total of seats</div>
        <div className="text-6xl text-white">500</div>
      </div>
      <div className="rounded-md md:w-48 md:h-48 xl:w-80 xl:h-80 w-44 h-44 relative bg-teal-600 flex flex-col justify-evenly items-center">
        <div className="text-6xl">🏅</div>
        <div className="text-3xl text-white">Reserve</div>
        <div className="text-6xl text-white">120</div>
      </div>

      <div className="rounded-md md:w-48 md:h-48 xl:w-80 xl:h-80 w-44 h-44 relative bg-red-400 flex flex-col justify-evenly items-center">
        <div className="text-6xl">❌</div>
        <div className="text-3xl text-white">Cancel</div>
        <div className="text-6xl text-white">12</div>
      </div>
    </div>
  );
}
