"use client";

import { useEffect, useState } from "react";
import Panel from "../components/Panel";
import Sidebar from "../components/Sidebar";
import { DefaultApiFactory } from "../../client";
import Swal from "sweetalert2";
import ListConcerts from "@/components/ListConcerts";
import Create from "@/components/Create";

export default function Home() {
  const [selectOverview, setSelectOverview] = useState(true);
  const [selectHome, setSelectHome] = useState<boolean>(true);
  const [role, setRole] = useState<String>("User");
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
    <div className="flex bg-gray-50">
      <Sidebar
        role={role}
        setRole={setRole}
        selectHome={selectHome}
        setSelectHome={Home}
      />
      <div className="flex flex-col w-full mx-10 mt-10">
        {role == "Admin" && <Panel />}

        {role == "Admin" && (
          <div className="w-full flex py-5 gap-4 text-xl">
            <button
              className={
                selectOverview ? "border-b-2 border-blue-500 text-blue-500" : ""
              }
              onClick={() => setSelectOverview(true)}
            >
              Overview
            </button>
            <button
              className={
                selectOverview ? "" : "border-b-2 border-blue-500 text-blue-500"
              }
              onClick={() => setSelectOverview(false)}
            >
              Create
            </button>
          </div>
        )}

        {selectOverview ? (
          <ListConcerts
            setConcerts={setConcerts}
            role={role}
            concerts={concerts}
          />
        ) : (
          <Create role={role}/>
        )}
      </div>
    </div>
  );
}
