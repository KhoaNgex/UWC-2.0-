export const convertDateToStr = (date) => {
  if (!date) return "";
  var dateStr = date.toISOString().split("T")[0];
  var realDate = new Date(dateStr);
  realDate.setDate(realDate.getDate() + 1);
  var realDateStr = realDate.toISOString().split("T")[0];
  return realDateStr;
};

export const convertTimeToStr = (inputDate) => {
  let tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  let localISOTime = new Date(inputDate - tzoffset).toISOString().slice(0, -1);
  let tmpTimeStr = localISOTime.split("T")[1];
  let tmpTimeArr = tmpTimeStr.split(":");
  let resultTimeStr = [tmpTimeArr[0], tmpTimeArr[1]].join(":");
  return resultTimeStr;
};