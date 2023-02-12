import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToKebabCase'
})
export class ConvertToKebabCasePipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/([A-Z])/g, '-$1').toLowerCase();
  }

}
