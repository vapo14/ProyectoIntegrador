import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import send from "../../util/message-emitter";

export default function BookingCalendar() {
  const [Reservations, setReservations] = useState([]);

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
    setReservations(all);
  };

  useEffect(() => {
    getAllReservations();
  }, []);

  return (
    <div>
      <h1>Reservations</h1>
      {Reservations.map((reservation) => {
        return (
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Text>
                <ul>
                  <li>${reservation.total_price}</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}
