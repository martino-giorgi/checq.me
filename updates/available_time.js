const moment = require("moment");

//https://stackoverflow.com/questions/48407713/get-available-time-ranges-from-an-array-of-busy-time-ranges

// function get_available_time(start_moment, end_moment, ar) {
//   const timeRange = ar.map((a) => {
//     return { start: moment(a[0], "YYYY-MM-DDTHH:mm", true).isBefore(start_moment)? start_moment : moment(a[0], "YYYY-MM-DDTHH:mm", true), 
//             end: moment(a[1], "YYYY-MM-DDTHH:mm", true).isAfter(end_moment)? end_moment : moment(a[1], "YYYY-MM-DDTHH:mm", true) };
//   });

//   timeRange.sort((a, b) => {
//     var utcA = a.start;
//     var utcB = b.start;
//     if (utcA.isBefore(utcB)) {
//       return -1;
//     }
//     if (utcA.isAfter(utcB)) {
//       return 1;
//     }
//     return 0;
//   });
//   const availableTimeArray = [];

//   //   let endTimeFarthest = moment(start_moment);
//   //   let startTimeMinimum = moment(end_moment);
//   let endTimeFarthest = start_moment;
//   let startTimeMinimum = end_moment;
//   timeRange.forEach((element, index) => {
//     console.log(element, index);
//     let currentEndTime = element.end;
//     const currentStartTime = element.start;
//     if (currentStartTime.isBefore(startTimeMinimum)) {
//       startTimeMinimum = currentStartTime;
//     }
//     if (currentEndTime.isAfter(endTimeFarthest)) {
//       endTimeFarthest = currentEndTime;
//     }
//     if (index === timeRange.length - 1) {
//       if (timeRange.length === 1) {
//         availableTimeArray.push({
//           start: start_moment,

//           end: currentStartTime,
//         });
//       }
//       availableTimeArray.push({
//         start: endTimeFarthest,
//         end: end_moment,
//       });
//     } else {
//       const nextBusyTime = timeRange[index + 1];
//       const nextStartTime = nextBusyTime.start;
//       if (index === 0) {
//         availableTimeArray.push({
//           start: start_moment,
//           end: currentStartTime,
//         });
//       }
//       let endTimeToCompare = currentEndTime.isBefore(endTimeFarthest)
//         ? endTimeFarthest
//         : currentEndTime;
//       if (endTimeToCompare.isBefore(nextStartTime)) {
//         availableTimeArray.push({
//           start: endTimeToCompare,
//           end: nextStartTime,
//         });
//       }
//     }
//   });
//   let t = availableTimeArray.filter((item, index) => {
//       return !(item.start.isSame(item.end));
//   })
//   console.log(t);
// }

//threshold is IN MINUTES
function get_available_time2(start_moment, end_moment, ar, minutes_threshold = 0) {
  const timeRange = ar.map(a => {
    return [moment(a[0], "YYYY-MM-DDTHH:mm", true).isBefore(start_moment)? start_moment : moment(a[0], "YYYY-MM-DDTHH:mm", true),
    moment(a[1], "YYYY-MM-DDTHH:mm", true).isAfter(end_moment)? end_moment : moment(a[1], "YYYY-MM-DDTHH:mm", true)]
  })

  

  // console.log(timeRange);

  timeRange.sort((a, b) => {
    var utcA = a[0];
    var utcB = b[0];
    if (utcA.isBefore(utcB)) {
      return -1;
    }
    if (utcA.isAfter(utcB)) {
      return 1;
    }
    return 0;
  });
  const availableTimeArray = [];

  let endTimeFarthest = start_moment;
  let startTimeMinimum = end_moment;
  timeRange.forEach((element, index) => {
    // console.log(element, index);
    let currentEndTime = element[1];
    const currentStartTime = element[0];
    console.log(index, currentStartTime, currentEndTime);
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
      const nextStartTime = nextBusyTime[0];
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

  let result = [];
  //removes slots with the same exact times;
  // for (let i = 0; i < availableTimeArray.length; i++) {
  //   if(!(availableTimeArray[i].start.isSame(availableTimeArray[i].end))){
  //     result.push(availableTimeArray[i]);
  //   }
  // }

  //removes the time slots with a range lower than the threshold.
  for (let i = 0; i < availableTimeArray.length; i++) {
    let duration = moment.duration(availableTimeArray[i].end.diff(availableTimeArray[i].start));
    let mins = parseInt(duration.asMinutes())%60;
    if(!(availableTimeArray[i].start.isSame(availableTimeArray[i].end))
      && mins>=minutes_threshold){
      result.push(availableTimeArray[i]);
    }
  }
  return result;
}


module.exports = {
  // get_available_time,
  get_available_time2
};
