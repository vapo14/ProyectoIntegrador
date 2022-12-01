import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Sidebar from "../../components/sidebar/Sidebar";
import moment from "moment";
import "react-calendar-timeline/lib/Timeline.css";
import "./calendar.css";
import Timeline, {
  TimelineMarkers,
  TodayMarker,
} from "react-calendar-timeline";
import axiosInstance from "../../api/axiosInstance";
import itemRenderer from "./ItemRenderer";

export default function BookingCalendar() {
  const [Reservations, setReservations] = useState([]);
  const [Groups, setGroups] = useState([]);
  let roomMap = [];

  // group
  //{ id: 1, title: 'group 1' }

  // item
  // {
  //   id: 1,
  //   group: 1,
  //   title: 'item 1',
  //   start_time: moment(),
  //   end_time: moment().add(1, 'hour')
  // },

  const getAllReservations = async () => {
    let all = await axiosInstance.get("/reservations");
    let groups = convertRoomsToGroups(all.data);
    setGroups(groups);
    setReservations(
      all.data.map((res, idx) => {
        let item = {};
        item.id = idx;
        item.start_time = moment(res.start_date);
        item.end_time = moment(res.end_date);
        item.group = roomMap.indexOf(res.rooms[0].room_number);
        item.title = res.guest_name;
        item.key = idx;
        item.className = "confirm";
        return item;
      })
    );
  };

  const convertRoomsToGroups = (reservationsArray) => {
    let groups = [];
    let seenRooms = [];
    for (const res of reservationsArray) {
      for (const room of res.rooms) {
        if (!seenRooms.includes(room.room_number)) {
          seenRooms.push(room.room_number);
          groups.push({
            id: seenRooms.length - 1,
            title: `Room #${room.room_number}`,
          });
        }
      }
    }
    roomMap = seenRooms;
    return groups;
  };

  console.log("Items", Reservations);
  console.log(Groups);

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
              groups={Groups}
              items={Reservations}
              lineHeight={75}
              itemRenderer={itemRenderer}
              defaultTimeStart={moment().add(-10, "days")}
              defaultTimeEnd={moment().add(10, "days")}
              maxZoom={1.5 * 365.24 * 86400 * 1000}
              minZoom={1.24 * 86400 * 1000 * 7 * 3}
              fullUpdate
              itemTouchSendsClick={false}
              stackItems
              itemHeightRatio={0.75}
              showCursorLine
            >
              <TimelineMarkers>
                <TodayMarker>
                  {({ styles, date }) => (
                    <div
                      style={{
                        ...styles,
                        width: "0.5rem",
                        backgroundColor: "rgba(255,0,0,0.5)",
                      }}
                    />
                  )}
                </TodayMarker>
              </TimelineMarkers>
            </Timeline>
          </Row>
        </Container>
      </div>
    </div>
  );
}
