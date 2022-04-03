import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '@model/movie.model';
@Pipe({ name: 'filter' })
export class FilterPipe implements PipeTransform {
  transform(list: Movie[], searchText: string): any[] {
    if (!list) {
      return [];
    } else if (searchText === null || searchText === '') {
      return list;
    } else {
      const results = [];
      list.forEach(item => {
        if (item.Title.toLowerCase().includes(searchText)) {
          results.push(item);
        }
      });
      return results;
    }
  }
}
