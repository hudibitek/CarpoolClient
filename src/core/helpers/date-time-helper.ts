import * as moment from 'moment';

export class DateTimeHelper {
  static stringToDateUTC(value: string): Date {
    if (value && value.slice(-1) !== 'Z') {
      value += 'Z';
    }
    return new Date(value);
  }
  static toDateUTC(value: Date | string): Date {
    return this.stringToDateUTC(value.toString());
  }

  static dateToLocalString(value: Date | string, format: string = 'DD.MM.YYYY. HH:mm'): string {
    return moment.utc(value).local().format(format);
  }

  static dateToUTCString(value: Date, format: string = 'DD.MM.YYYY. HH:mm'): string {
    return moment.utc(value).format(format);
  }

  static minutesPassed(dateStart: Date, dateEnd: Date): number {
    return moment.utc(dateEnd).diff(moment.utc(dateStart), 'minutes');
  }

  static dateDiffToDaysHoursMinutesSeconds(startDate: Date | string, endDate: Date | string, shortLabels, showSeconds, includeZeroes): string {
    const duration = moment.duration(moment.utc(endDate).diff(moment.utc(startDate)));
    return this.durationToDaysHoursMinutesSeconds(duration, shortLabels, showSeconds, includeZeroes);
  }

  static durationToDaysHoursMinutesSeconds(duration: moment.Duration, shortLabels, showSeconds, includeZeroes): string {
    let response = '';
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    const pluralSign = shortLabels ? '' : 's';
    const characterBetweenValueAndLabel = shortLabels ? '' : ' ';

    response += days > 0 ? this.timeToPrettyTime(days, shortLabels ? 'd' : 'day', pluralSign, includeZeroes, characterBetweenValueAndLabel) : '';
    response += days > 0 || hours > 0 ? ' ' + this.timeToPrettyTime(hours, shortLabels ? 'h' : 'hour', pluralSign, includeZeroes, characterBetweenValueAndLabel) : '';
    response += days > 0 || hours > 0 || minutes > 0 ? ' ' + this.timeToPrettyTime(minutes, shortLabels ? 'm' : 'minute', pluralSign, includeZeroes, characterBetweenValueAndLabel) : '';
    if (showSeconds) {
      response += ' ' + this.timeToPrettyTime(seconds, shortLabels ? 's' : 'second', pluralSign, includeZeroes, characterBetweenValueAndLabel);
    }

    return response.trim();
  }

  static minutesToDaysHoursMinutes(totalMinutes: number): string {
    const duration = moment.duration(totalMinutes * 60 * 1000);
    return this.durationToDaysHoursMinutesSeconds(duration, false, false, false);
  }

  static timeToPrettyTime(value: number, timePartName: string, plural = 's', includeZeroes = false, delimiter = ' '): string {
    let response = '';
    if ((includeZeroes && value >= 0) || (!includeZeroes && value > 0)) {
      response += value + delimiter + timePartName;
      if (value !== 1) {
        response += plural;
      }
    }
    return response;
  }

  static getDateFromValue(value: any): Date {
    if (!moment.isDate(value)) {
      value = DateTimeHelper.stringToDateUTC(value);
    }
    return value;
  }
}
