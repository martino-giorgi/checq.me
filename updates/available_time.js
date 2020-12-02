const moment = require("moment");

//https://stackoverflow.com/questions/48407713/get-available-time-ranges-from-an-array-of-busy-time-ranges

function get_available_time(start_moment, end_moment, ar) {
  const timeRange = ar.map((a) => {
    return { start: moment(a[0], "YYYY-MM-DDTHH:mm", true).isBefore(start_moment)? start_moment : moment(a[0], "YYYY-MM-DDTHH:mm", true), 
            end: moment(a[1], "YYYY-MM-DDTHH:mm", true).isAfter(end_moment)? end_moment : moment(a[1], "YYYY-MM-DDTHH:mm", true) };
  });

  timeRange.sort((a, b) => {
    var utcA = a.start;
    var utcB = b.start;
    if (utcA.isBefore(utcB)) {
      return -1;
    }
    if (utcA.isAfter(utcB)) {
      return 1;
    }
    return 0;
  });
  const availableTimeArray = [];

  //   let endTimeFarthest = moment(start_moment);
  //   let startTimeMinimum = moment(end_moment);
  let endTimeFarthest = start_moment;
  let startTimeMinimum = end_moment;
  timeRange.forEach((element, index) => {
    // console.log(element, index);
    let currentEndTime = element.end;
    const currentStartTime = element.start;
    if (currentStartTime.isBefore(startTimeMinimum)) {
      startTimeMinimum = currentStartTime;
    }
    if (currentEndTime.isAfter(endTimeFarthest)) {
      endTimeFarthest = currentEndTime;
    }
    if (index === timeRange.length - 1) {
      if (timeRange.length === 1) {
        availableTimeArray.push({
          start: start_moment,

          end: currentStartTime,
        });
      }
      availableTimeArray.push({
        start: endTimeFarthest,
        end: end_moment,
      });
    } else {
      const nextBusyTime = timeRange[index + 1];
      const nextStartTime = nextBusyTime.start;
      if (index === 0) {
        availableTimeArray.push({
          start: start_moment,
          end: currentStartTime,
        });
      }
      let endTimeToCompare = currentEndTime.isBefore(endTimeFarthest)
        ? endTimeFarthest
        : currentEndTime;
      if (endTimeToCompare.isBefore(nextStartTime)) {
        availableTimeArray.push({
          start: endTimeToCompare,
          end: nextStartTime,
        });
      }
    }
  });
  let t = availableTimeArray.filter((item, index) => {
      return !(item.start.isSame(item.end));
  })
  console.log(t);
}

module.exports = {
  get_available_time,
};
