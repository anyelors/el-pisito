import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'metrosCuadrados',
})
export class MetrosCuadradosPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return `${value} m2`;
  }

}
