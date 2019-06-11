
const toMoney = (num) => (num.replace(/\d(?=(\d{3})+\.)/g, '$&,'));

export { toMoney };
