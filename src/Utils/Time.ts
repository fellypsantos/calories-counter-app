import dayjs from "dayjs";

export default {
  ISO8601Format: (date: dayjs.Dayjs | Date) => dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}
