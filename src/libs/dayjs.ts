import dayjs from "dayjs";
import "dayjs/locale/ja";
import relativeTime from "dayjs/plugin/relativeTime";

export const dayjsInstance = dayjs;

dayjsInstance.extend(relativeTime);
dayjsInstance.locale("ja");
