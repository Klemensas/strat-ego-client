import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countdown'
})
export class CountdownPipe implements PipeTransform {
  transform(value: any, format: string): any {
    let sec = Math.floor(value / 1000) % 60;
    let min = Math.floor(value / 1000 / 60) % 60;
    let h = Math.floor(value / 1000 / 60 / 60);

    if (sec < 0 || min < 0 || h < 0) {
      sec = 0;
      min = 0;
      h = 0;
    }

    const timeData = {
      'HH': ('0' + h).slice(-2),
      'mm': ('0' + min).slice(-2),
      'ss': ('0' + sec).slice(-2)
    };

    return format.replace(/(HH|mm|ss)/g, (match) => {
      return timeData[match];
    });
  }
}
