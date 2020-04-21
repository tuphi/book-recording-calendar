// Method use the shift number [0, 1, 2] and date as parameter
// Return a string in format:   // 2018-06-01T12:30:00-05:00
exports.getDetailTimeByShift = function(date, shift) {
  let startTime = date + " 09:00:00";
  let endTime = date + " 12:00:00";
  switch (shift) {
    case "0":
      startTime = date + " 09:00:00";
      endTime = date + " 12:00:00";
      break;
    case "1":
      startTime = date + " 14:00:00";
      endTime = date + " 17:00:00";
      break;
    case "2":
      startTime = date + " 18:00:00";
      endTime = date + " 20:00:00";
      break;
    default:
      console.log("Shift is not right");
    }
    return {
      startTime: startTime,
      endTime: endTime
    }
}
