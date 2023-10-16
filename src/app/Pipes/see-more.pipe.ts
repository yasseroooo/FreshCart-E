import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seeMore'
})
export class SeeMorePipe implements PipeTransform {

  transform(value: string, limit:number): unknown {
    return value.split(" ").splice(0,limit).join(" ");
  }

}
