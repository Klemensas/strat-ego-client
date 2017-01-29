import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countdown'
})
export class CountdownPipe implements PipeTransform {
  transform(value: any, format: string): any {
    const sec = Math.floor(value / 1000) % 60;
    const min = Math.floor(value / 1000 / 60) % 60;
    const h = Math.floor(value / 1000 / 60 / 60);

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
