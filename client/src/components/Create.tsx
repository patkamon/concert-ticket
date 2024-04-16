"use client";

import Swal from "sweetalert2";
import { DefaultApiFactory } from "../../client";

export default function Create({ role  }: { role: String}) {
  const caller = DefaultApiFactory();
  return (
    <div className="w-full bg-white rounded-md border border-gray-200 py-10 my-2 px-8 flex flex-col">
    <h1 className="text-3xl text-blue-500 mb-6">Create</h1>
    <span className="border-b border-gray-300 w-full"></span>
    <form
      onSubmit={(e) => {
        const form = e.target as any;
        caller.concertControllerCreateConcert(
          {
            name: form[0].value,
            seat: form[1].value,
            description: form[2].value,
          },
          { headers: { Role: role } }
        ).then((e)=>{
          Swal.fire({
            title: "Created!",
            text: "Your Concert has been created.",
            icon: "success"
          });
        });
      }}
    >
      <div className="flex justify-between gap-4 py-4 items-end">
        <div className="w-full">
          <label className="text-xl mt-4" htmlFor="name">
            Concert Name
          </label>
          <input
            className="w-full border border-gray-500 mt-4"
            placeholder=" Please input concert name"
            required
            id="name"
          ></input>
        </div>
        <div className="w-full">
          <label className="text-xl mt-4" htmlFor="seat">
            Seat
          </label>
          <input
            defaultValue={500}
            className="w-full border border-gray-500 mt-4"
            type="number"
            min="1"
            max="10000"
            step="1"
            required
            id="seat"
          ></input>
        </div>
      </div>

      <label className="text-xl mt-4" htmlFor="description">
        Description
      </label>
      <textarea
        className="w-full border border-gray-500 mt-4"
        placeholder=" Please input description"
        required
        id="description"
      ></textarea>

      <div className="flex flex-row-reverse">
        <button
          type="submit"
          className="bg-blue-500 py-2 px-8 text-white rounded-sm"
        >
          💾 Save
        </button>
      </div>
    </form>
  </div>
  );
}
