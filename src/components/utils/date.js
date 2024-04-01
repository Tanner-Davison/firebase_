const today = new Date();
const date = {
  month: today.getMonth()+1,
  year: today.getFullYear(),
  date: today.getDate(),
}
export const currentDate =  date.month +'/' + date.date + "/" + date.year;