"use client";

import { useEffect, useState } from "react";
import Panel from "../components/Panel";
import Sidebar from "../components/Sidebar";
import { DefaultApiFactory } from "../../client";
import Swal from "sweetalert2";

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
          concerts.map((c) => {
            return (
              <div
                key={c.id}
                className="w-full bg-white rounded-md border border-gray-200 py-10 my-2 px-8 flex flex-col"
              >
                <h1 className="text-3xl text-blue-500 mb-6">{c.name}</h1>
                <span className="border-b border-gray-300 w-full"></span>
                <p className="my-2"> {c.description}</p>
                <div className="flex justify-between items-center">
                  <p>👤 {c.seat}</p>
                  {c.isOwner && (
                    <button
                      className="bg-red-400 py-2 px-8 text-white rounded-sm"
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            Swal.fire({
                              title: "Deleted!",
                              text: "Your file has been deleted.",
                              icon: "success",
                            });
                            console.log(c.id);
                            caller
                              .concertControllerDeleteConcert(c.id, {
                                headers: { Role: role },
                              })
                              .then(() => {
                                const newConcerts = concerts.filter(
                                  (con) => con.id !== c.id
                                );
                                console.log(newConcerts);
                                setConcerts(newConcerts);
                              });
                          }
                        });
                      }}
                    >
                      Delete
                    </button>
                  )}
                  {(c.IsReserve == true || c.IsReserve == false) && (
                    <button
                      className={`${
                        c.IsReserve ? "bg-red-400" : "bg-blue-500"
                      } py-2 px-8 text-white rounded-sm`}
                      onClick={() => {
                        caller
                          .concertControllerReserveConcert(
                            {
                              concertId: c.id,
                            },
                            { headers: { Role: role } }
                          )
                          .then((d) => {
                            const newConcerts = concerts;
                            newConcerts.forEach((con) => {
                              if (c.id == con.id) {
                                con.IsReserve = !con.IsReserve;
                              }
                            });
                            setConcerts([...newConcerts]);
                          });
                      }}
                    >
                      {c.IsReserve ? "Cancel" : "Reserve"}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        ) : (
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
                );
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
        )}
      </div>
    </div>
  );
}
