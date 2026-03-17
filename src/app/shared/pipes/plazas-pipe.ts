import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plazas',
})
export class PlazasPipe implements PipeTransform {

  transform(value: number): string {
    if (value === 0){
     return `No cuenta con garaje`;
    }else if (value === 1) {
       return `${value} plaza`;
    }else{
       return `${value} plazas`;
    }
  }

}
