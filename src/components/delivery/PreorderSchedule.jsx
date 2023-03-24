import React, { useEffect, useState, Fragment } from "react";
import ScrollContainer from "react-indiana-drag-scroll";

function PreorderSchedule({ orderMode, info, setInfo, initialInfo }) {
  const [schedule, setSchedule] = useState(null);
  const [selectedDate, setSelectedDate] = useState(initialInfo[0]);
  const [selectedTime, setSelectedTime] = useState(initialInfo[1]);
  const [selectedIndex, setSelectedIndex] = useState(initialInfo[2]);

  let now = new Date();
  let date = now.getDate();
  let time = now.getHours();

  const getTodayIndex = () => {
    if (schedule) {
      let i = 0;
      for (let s of schedule) {
        if (parseInt(s.date.slice(-2)) == date) {
          return i;
        }
        i++;
      }
      return null;
    }
  };

  const handleDateBtn = (index, date) => {
    setSelectedIndex(index);
    setSelectedDate(date);
    setSelectedTime(null);
    let newinfo = info;
    newinfo.schedule = null;
    setInfo(newinfo);
  };

  const handleTimeBtn = (time) => {
    setSelectedTime(time);

    let newinfo = info;
    newinfo.schedule = { date: selectedDate, time: time };
    setInfo(newinfo);
  };

  const dateColour = (date) => {
    if (date == selectedDate) {
      return {
        width: "4.5em",
        backgroundColor: "#D1D1D1",
        color: "black",
        fontWeight: "bold",
      };
    } else {
      return { width: "4.5em", backgroundColor: "#F2F2F2", color: "#B0B0B0" };
    }
  };

  const timeColour = (date, time) => {
    if (date == selectedDate && time == selectedTime) {
      return { color: "black", fontWeight: "bold" };
    } else {
      return { color: "grey" };
    }
  };

  const displayDate = () => {
    if (schedule) {
      return (
        <ScrollContainer className="scroll-container row flex-row flex-nowrap overflow-4em mt-2 mb-2">
          {displayToday(getTodayIndex())}
          {schedule.map(
            (schedule, index) =>
              date < schedule.date.slice(-2) && (
                <button
                  className="btn btn-light btn-sm me-1"
                  style={dateColour(schedule.date)}
                  onClick={(e) => handleDateBtn(index, schedule.date)}
                  key={parseInt(schedule.date.slice(-2))}
                >
                  <p className="m-0">{schedule.day}</p>
                  <p className="m-0">{parseInt(schedule.date.slice(-2))}</p>
                </button>
              )
          )}
        </ScrollContainer>
      );
    }
  };

  const displayToday = (index) => {
    if (index !== null) {
      return (
        parseInt(
          schedule[index].time[schedule[index].time.length - 1].slice(0, 2) - 2
        ) > time && (
          <button
            className="btn btn-light btn-sm me-1"
            style={dateColour(schedule[index].date)}
            onClick={(e) => handleDateBtn(index, schedule[index].date)}
          >
            <p className="m-0">Today</p>
            <p className="m-0">{parseInt(schedule[index].date.slice(-2))}</p>
          </button>
        )
      );
    }
  };

  const displayTime = (index) => {
    if (schedule) {
      if (index !== null) {
        if (schedule[index].time) {
          return (
            <ScrollContainer style={{ height: "100px" }}>
              <div className="container">
                {schedule[index].time.map((clock) =>
                  parseInt(schedule[index].date.slice(-2)) == date ? (
                    time < parseInt(clock.slice(0, 2)) - 2 && (
                      <div className="row" key={clock}>
                        <button
                          className="btn border-bottom rounded-0 "
                          style={timeColour(schedule[index].date, clock)}
                          onClick={(e) => handleTimeBtn(clock)}
                        >
                          {clock}
                        </button>
                      </div>
                    )
                  ) : (
                    <div className="row" key={clock}>
                      <button
                        className="btn border-bottom rounded-0"
                        style={timeColour(schedule[index].date, clock)}
                        onClick={(e) => handleTimeBtn(clock)}
                      >
                        {clock}
                      </button>
                    </div>
                  )
                )}
              </div>
            </ScrollContainer>
          );
        }
      }
    }
  };

  const displaySchedule = () => {
    if (info) {
      if (info.orderMode == "preorder") {
        return (
          <div className="container mt-4">
            <div className="row">
              <div className="col">{displayDate()}</div>
            </div>
            <div className="row mt-2">
              <div className="col">{displayTime(selectedIndex)}</div>
            </div>
          </div>
        );
      }
    }
  };

  useEffect(() => {
    if (orderMode) setSchedule(JSON.parse(orderMode.preorder_option).option);
  }, [orderMode]);

  return <div>{displaySchedule()}</div>;
}

export default PreorderSchedule;
