const toMoney = (num) => (num.replace(/\d(?=(\d{3})+\.)/g, '$&,'));

const timeConverter = (timestamp) => {
  const a = new Date(timestamp);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours() > 12 ? a.getHours() - 12 : a.getHours();
  const ampm = a.getHours() > 11 ? 'PM' : 'AM';
  const min = a.getMinutes() < 10 ? `0${a.getMinutes()}` : a.getMinutes();
  const sec = a.getSeconds() < 10 ? `0${a.getSeconds()}` : a.getSeconds();
  // const time = `${date} ${month} ${year}-${hour}:${min}:${sec}${ampm}`;
  const time = `${hour}:${min}:${sec}${ampm}`;
  return time;
};

export { toMoney, timeConverter };
