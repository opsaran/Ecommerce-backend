import pino from "pino";
import dayjs from "dayjs";
import PinoPretty from "pino-pretty";
const log = pino({
  transport: {
    target: "pino-pretty",
    options: {
      translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
      ignore: "pid,hostname",
      colorize: false,
    },
  },
});

export default log;
