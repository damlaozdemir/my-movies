import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from '@model/movie.model';
@Injectable()
export class MovieService {
  constructor(
    private httpClient: HttpClient
  ) {}

  searchMovies(keyword: string): Observable<any> {
      return this.httpClient.get("http://www.omdbapi.com/?apikey=69ea7f60&type=movie" + "&r=" + "json" + "&s=" + keyword);
  }
}