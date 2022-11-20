import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Sidebar from "../../components/sidebar/Sidebar";
import moment from "moment";
import "./calendar.scss";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import axiosInstance from "../../api/axiosInstance";

export default function BookingCalendar() {
  const [Reservations, setReservations] = useState([]);

  let groups = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
    return {
      id: num,
      title: `Room #2${num}`,
      rightTitle: "title in the right sidebar",
      stackItems: true,
      height: 50,
    };
  });

  let reservations = [
    {
      reservation_id: 1,
      guest_id: 1,
      user_id: 1,
      start_date: moment().add("day", -5),
      end_date: Date.now(),
      ts_created: Date.now(),
      ts_updated: Date.now(),
      total_price: 509,
      form_of_booking: "form of booking",
      company_name: "company name",
      number_of_adults: 3,
      number_of_children: 4,
      payment_date: Date.now(),
    },
    {
      reservation_id: 3,
      guest_id: 1,
      user_id: 1,
      start_date: moment().add("day", -3),
      end_date: moment().add("day", 4),
      ts_created: Date.now(),
      ts_updated: Date.now(),
      total_price: 509,
      form_of_booking: "form of booking",
      company_name: "company name",
      number_of_adults: 3,
      number_of_children: 4,
      payment_date: Date.now(),
    },
    {
      reservation_id: 6,
      guest_id: 1,
      user_id: 1,
      start_date: moment(),
      end_date: moment().add("day", 4),
      ts_created: Date.now(),
      ts_updated: Date.now(),
      total_price: 509,
      form_of_booking: "form of booking",
      company_name: "company name",
      number_of_adults: 3,
      number_of_children: 4,
      payment_date: Date.now(),
    },
    {
      reservation_id: 7,
      guest_id: 1,
      user_id: 1,
      start_date: moment(),
      end_date: moment().add("day", 5),
      ts_created: Date.now(),
      ts_updated: Date.now(),
      total_price: 509,
      form_of_booking: "form of booking",
      company_name: "company name",
      number_of_adults: 3,
      number_of_children: 4,
      payment_date: Date.now(),
    },
  ].map((res) => {
    return {
      id: res.reservation_id,
      group: res.reservation_id,
      title: res.company_name,
      start_time: res.start_date,
      end_time: res.end_date,
      canMove: false,
      canResize: false,
      canChangeGroup: false,
    };
  });

  const getAllReservations = async () => {
    let all = await axiosInstance.get("/reservations");
    console.log(all);
    setReservations(
      all.data.map((res) => {
        res.start_time = res.start_date;
        res.end_time = res.end_date;
        res.group = 1;
        res.key = res.reservation_id;
        return res;
      })
    );
  };

  useEffect(() => {
    getAllReservations();
  }, []);

  return (
    <div className="calendar">
      <Sidebar />
      <div className="calendarContainer">
        <Container style={{ margin: "4rem" }}>
          <Row>
            <h1>Calendario</h1>
            <Timeline
              groups={groups}
              items={reservations}
              defaultTimeStart={moment().add("day", -10)}
              defaultTimeEnd={moment().add("day", 18)}
            />
          </Row>
        </Container>
      </div>
    </div>
  );
}
