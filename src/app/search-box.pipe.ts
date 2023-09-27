import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from './interfaces/product';

@Pipe({
  name: 'searchBox',
})
export class SearchBoxPipe implements PipeTransform {
  transform(data: IProduct[], searchText: string): IProduct[] {
    return data.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
