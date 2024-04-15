"use client";

import { useState } from "react";
import Panel from "./components/Panel";
import Sidebar from "./components/Sidebar";

export default function Home() {
  const [selectOverview, setSelectOverview] = useState(true);

  return (
    <div className="flex w-screen">
      <Sidebar />
      <div className="flex flex-col w-full mx-10 mt-10">
        <div className="flex justify-between bg-blue-300 w-full">
          <Panel />
          <Panel />
          <Panel />
        </div>

        <div className="w-full flex py-5 gap-4">
          <button
            className="border-b-2 border-blue-500"
            onClick={() => setSelectOverview(true)}
          >
            Overview
          </button>
          <button
            className="border-b-2 border-blue-500"
            onClick={() => setSelectOverview(false)}
          >
            Create
          </button>
        </div>

        {selectOverview ? (
          <div className="w-full bg-teal-200 py-10 my-2 p-4 flex flex-col">
            Concert name 1
            <span className="border-b border-gray-300 w-full"></span>
            <p>desc</p>
            <div className="flex justify-between">
              Seat
              <button className="bg-red-400">Delete</button>
            </div>
          </div>
        ) : (
          <div className="w-full bg-yellow-200 py-10 my-2 flex flex-col p-4">
            Create
            <span className="border-b border-gray-300 w-full"></span>
            <form>
              <div className="flex justify-between gap-4">
                <div className="w-full">
                  <label htmlFor="name">Concert Name</label>
                  <input className="w-full" id="name"></input>
                </div>
                <div className="w-full">
                  <label htmlFor="seat">Seat</label>
                  <input className="w-full" id="seat" type="number"></input>
                </div>
              </div>

              <label htmlFor="description">Description</label>
              <textarea className="w-full" id="description"></textarea>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
