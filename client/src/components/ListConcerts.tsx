"use client";

import Swal from "sweetalert2";
import { DefaultApiFactory } from "../../client";
import { Dispatch, SetStateAction } from "react";

export default function ListConcerts({ concerts, role, setConcerts }: { concerts: any[], role: String, setConcerts: Dispatch<SetStateAction<any[]>> }) {
  const caller = DefaultApiFactory();
  return (
    <div>
      {concerts.map((c) => {
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
                          text: "Your concert has been deleted.",
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
                            if (con.IsReserve){
                              Swal.fire({
                                title: "Cancel!",
                                text: "Your Concert has been cancel.",
                                icon: "success"
                              });
                            }else{
                              Swal.fire({
                                title: "Reserved!",
                                text: "Your Concert has been reserved.",
                                icon: "success"
                              });
                            }
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
      })}
    </div>
  );
}
