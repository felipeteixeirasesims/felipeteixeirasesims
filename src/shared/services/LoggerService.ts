import { eachDayOfInterval, format, parse } from 'date-fns';
import fs from 'fs';

class LoggerService {
  public async execut({ initialDate, finalDate, level }: any): Promise<any> {
    try {
      const data = fs.readFileSync('nodeexpressboilerplate.log', 'utf8');

      const dateFormat = 'yyyy-MM-dd';
      const start = parse(initialDate, dateFormat, new Date());
      const end = parse(finalDate, dateFormat, new Date());

      const dates = eachDayOfInterval({ start, end }).map(date =>
        format(date, dateFormat)
      );

      var result = '';

      let text = data.split(/\r?\n/);
      text.forEach((line: any) => {
        if (initialDate === undefined && finalDate === undefined) {
          if (line.includes(level + ':')) {
            result += line + ',';
          }
        }
        dates.forEach(e => {
          if (level === undefined) {
            if (line.slice(0, 10).includes(e)) {
              result += line + ',';
            }
          } else if (
            line.slice(0, 10).includes(e) &&
            line.includes(level + ':')
          ) {
            result += line + ',';
          }
        });
      });
    } catch (err) {
      return err;
    }
    var output = result.split(',');
    return output.filter(line => line !== '');
  }
}

export default LoggerService;
