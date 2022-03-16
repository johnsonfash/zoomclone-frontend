class TimeFrame {
  constructor() {
    this.date = this.unixChecker(arguments);
    this.startDate = Date.now();
    this.lang = 'en';
  }
  language(locale) {
    this.lang = locale;
  }
  startingDate() {
    this.startDate = this.unixChecker(arguments);
  }
  now() {
    return Date.now();
  }
  unixChecker(data) {
    if (Number.isInteger(data[0]) && data[0].toString().length == 10) {
      return new Date(data[0] * 1000);
    } else {
      return new Date(...data);
    }
  }
  unix() {
    return parseInt((this.date.getTime() / 1000).toFixed(0));
  }
  milliseconds() {
    return this.date.getMilliseconds();
  }
  seconds() {
    return this.date.getSeconds();
  }
  minutes() {
    return this.date.getMinutes();
  }
  hours() {
    var x;
    let hours = this.date.getHours();
    let shortHours = hours % 12;
    shortHours = shortHours ? shortHours : 12;
    shortHours = shortHours < 10 ? '0' + shortHours : shortHours;
    return { long: function () { return hours; }, short: function () { return shortHours; } };
  }
  ampm() {
    let ampm = parseInt(this.hours().long()) >= 12 ? 'pm' : 'am';
    return ampm;
  }
  setDate() {
    this.date = this.unixChecker(arguments);
    return this;
  }
  day() {
    return this.date.getDate();
  }
  month() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[this.date.getMonth()];
  }
  year() {
    return this.date.getFullYear();
  }
  moment() {
    const ago = new Intl.RelativeTimeFormat(this.lang, { style: 'long', numeric: 'auto' });
    let multiplier = -1;
    let milliseconds = this.startDate - this.date.getTime();
    if (milliseconds < 0) {
      milliseconds = this.date.getTime() - this.startDate;
      multiplier = 1;
    }

    let calcTime = milliseconds / 31536000000; //years

    if (calcTime > 1) return ago.format(highOrLow(multiplier), 'years');

    calcTime = milliseconds / 2592000000; //months

    if (calcTime > 1) return ago.format(highOrLow(multiplier), 'months');

    calcTime = milliseconds / 86400000; //days

    if (calcTime > 1) return ago.format(highOrLow(multiplier), 'days');

    calcTime = milliseconds / 3600000; //hours

    if (calcTime > 1) return ago.format(highOrLow(multiplier), 'hours');

    calcTime = milliseconds / 60000; //minutes

    if (calcTime > 1) return ago.format(highOrLow(multiplier), 'minutes');

    calcTime = milliseconds / 1000; //seconds

    if (calcTime > 1) return ago.format(highOrLow(multiplier), 'seconds');

    if (milliseconds > 1) return 'just now'; //recent


    function highOrLow(num) {
      return (num == 1 ? Math.floor(calcTime * multiplier) : Math.ceil(calcTime * multiplier));
    }
  }
}


export default new TimeFrame();