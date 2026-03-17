import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parentesis',
})
export class ParentesisPipe implements PipeTransform {

  transform(value: string): string {
    return `(${value})`;
  }

}
