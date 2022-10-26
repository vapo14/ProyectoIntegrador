import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import send from "../../util/message-emitter";
import moment from "moment";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";

export default function BookingCalendar() {
  const [Reservations, setReservations] = useState([]);
  const [Rows, setRows] = useState([]);

  const groups = [
    { id: 1, title: "group 1" },
    { id: 2, title: "group 2" },
  ];

  const handleClick = async () => {
    // let reservation = { reservation_id: 1, total_price: 2342423 };
    // let message = { action: "UPDATE", reservation };
    // let res = await send(message, "reservation");
    // console.log(res);
    let all = await send({ action: "GET_ALL" }, "reservation");
  };

  const getAllReservations = async () => {
    let all = await send({ action: "GET_ALL" }, "reservation");
    console.log(all);
    setReservations(
      all.map((res) => {
        res.start_time = res.start_date;
        res.end_time = res.end_date;
        res.group = 1;
        return res;
      })
    );
  };

  useEffect(() => {
    getAllReservations();
  }, []);

  return (
    <div>
      <h1>Reservations</h1>
      <Timeline
        groups={groups}
        items={Reservations}
        defaultTimeStart={moment().add(-12, "hour")}
        defaultTimeEnd={moment().add(12, "hour")}
      />
    </div>
  );
}
