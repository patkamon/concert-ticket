"use client";

import { useContext, useEffect, useState } from "react";
import { DefaultApiFactory } from "../../../client";
import Sidebar from "@/components/Sidebar";

export default function History() {
  const [role, setRole] = useState<String>("Admin");
  const [history, setHistory] = useState<any[]>([])

  const caller = DefaultApiFactory();

  useEffect(() => {
    caller
      .concertControllerGetReservationHistory(
      { headers: { Role: role } }
      ).then((d)=>{
        console.log(d.data!)
        setHistory([...d.data!].reverse())
      })
  }, [role]);

  

  return (
    <div className="flex w-screen">
      <Sidebar role={role} setRole={setRole} />
      <div className="flex flex-col w-full mx-10 mt-10">
        <table className="[&_*]:border-2 [&_*]:border-black">
          <thead>
            <tr>
              <th>Date/Time</th>
              <th>Username</th>
              <th>Concert Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h)=>{
              return (
                <tr>
                <td className="text-center">{h.created_at}</td>
                <td className="text-center">John doe</td>
                <td className="text-center">{h.concertId}</td>
                <td className="text-center">{h.status}</td>
              </tr>
              )
            })}
          
          </tbody>
        </table>
      </div>
    </div>
  );
}
