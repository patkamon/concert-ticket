"use client";

import { useEffect, useState } from "react";
import Panel from "../components/Panel";
import Sidebar from "../components/Sidebar";
import { DefaultApiFactory } from "../../client";
import { headers } from "next/headers";

export default function Home() {
  const [selectOverview, setSelectOverview] = useState(true);
  const [role, setRole] = useState<String>("Admin");
  const [concerts, setConcerts] = useState<any[]>([]);

  const caller = DefaultApiFactory();

  useEffect(() => {
    caller
      .concertControllerGetAllConcert({ headers: { Role: role } })
      .then((d) => {
        console.log(d.data);
        setConcerts(d.data!);
      });
  }, [role]);

  return (
    <div className="flex w-screen">
      <Sidebar role={role} />
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
          concerts.map((c) => {
            return (
              <div
                key={c.id}
                className="w-full bg-teal-200 py-10 my-2 p-4 flex flex-col"
              >
                {c.name}
                <span className="border-b border-gray-300 w-full"></span>
                <p>{c.desc}</p>
                <div className="flex justify-between">
                  {c.seat}
                  <button className="bg-red-400" onClick={()=>{
                    console.log(c.id)
                    caller.concertControllerDeleteConcert(c.id, { headers: { Role: role } })
                    setRole(role)
                  }}>Delete</button>
                </div>
              </div>
            );
          })
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
