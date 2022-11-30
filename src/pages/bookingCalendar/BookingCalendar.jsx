import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Sidebar from "../../components/sidebar/Sidebar";
import moment from "moment";
import "./calendar.css";
import Timeline, {
  TimelineMarkers,
  TodayMarker,
} from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import axiosInstance from "../../api/axiosInstance";
import itemRenderer from "./ItemRenderer";

export default function BookingCalendar() {
  const [Reservations, setReservations] = useState([]);
  const [Groups, setGroups] = useState([]);

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
      all.data.map((res) => {
        res.start_time = moment(res.start_date);
        res.end_time = moment(res.end_date);
        res.group = res.rooms.length > 0 ? res.rooms[0].room_number : 0;
        res.title = "reservation";
        res.key = res._id;
        res.canMove = true;
        res.canResize = false;
        res.canChangeGroup = false;
        res.className = "confirm";
        return res;
      })
    );
  };

  const convertRoomsToGroups = (reservationsArray) => {
    let groups = [];
    let seenRooms = [];
    let idx = 0;
    for (const res of reservationsArray) {
      for (const room of res.rooms) {
        if (!seenRooms.includes(room.room_number)) {
          seenRooms.push(room.room_number);
          groups.push({ id: idx, title: `Room #${room.room_number}` });
          idx++;
        }
      }
    }
    return groups;
  };

  useEffect(() => {
    getAllReservations();
  }, []);
  console.log(Groups);

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
              defaultTimeStart={moment().add("days", -10)}
              defaultTimeEnd={moment().add("days", 10)}
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
