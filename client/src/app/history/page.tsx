"use client";

import { useEffect, useState } from "react";
import { DefaultApiFactory } from "../../../client";
import Sidebar from "@/components/Sidebar";

export default function History() {
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
            {/* <!-- Table rows will go here --> */}
            <tr>
              <td>2024-04-15</td>
              <td>JohnDoe</td>
              <td>Concert A</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
