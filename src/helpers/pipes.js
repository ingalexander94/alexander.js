import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es");

const formatDate = (date = new Date()) =>
  date ? dayjs(date).format("D MMMM, YYYY") : "Presente";

export { formatDate };
