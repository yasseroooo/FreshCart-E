import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../Interfaces/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Product[],searchTerm:string): Product[] {
    return value.filter((product)=>product.title.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
  }

}
