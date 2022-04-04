import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Movie } from '@model/movie.model';
import { User } from '@model/user.model';
@Injectable()
export class MovieService {
  constructor(
    private httpClient: HttpClient
  ) {
  }

  searchMovies(keyword: string): Observable<any> {
      return this.httpClient.get("http://www.omdbapi.com/?apikey=69ea7f60&type=movie" + "&r=" + "json" + "&s=" + keyword);
  }

  getMovies(start: number, end: number): Observable<any> {
    const currentUser: User = JSON.parse(localStorage.getItem('user'));
    const allUsers: User[] = JSON.parse(localStorage.getItem('users'));
    const allMovies = allUsers.filter(user => user.username === currentUser.username)[0].movies;
    const data = {
      movies: allMovies.reverse().slice(start,end),
      totalCount: allMovies.length
    }
    return of(data);
  }

  deleteMovie(id: string): Observable<boolean> {
    const currentUser: User = JSON.parse(localStorage.getItem('user'));
    const allUsers: User[] = JSON.parse(localStorage.getItem('users'));
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].username === currentUser.username) {
        allUsers[i].movies = allUsers.filter(u => u.username === currentUser.username)[0].movies.filter(movie => movie.imdbID !== id);
        localStorage.setItem('users', JSON.stringify(allUsers));
        break;
      }
    }
    return of(true);    
  }

  getMovieDetail(id: string): Observable<Movie> {
    const currentUser: User = JSON.parse(localStorage.getItem('user'));
    const allUsers: User[] = JSON.parse(localStorage.getItem('users'));
    const movies = allUsers.filter(user => user.username === currentUser.username)[0].movies;
    return of(movies.filter(movie => movie.imdbID == id)[0]);
  }

  addMovie(movie: Movie): Observable<boolean> {
    const currentUser: User = JSON.parse(localStorage.getItem('user'));
    const allUsers: User[] = JSON.parse(localStorage.getItem('users'));
    const movies = allUsers.filter(user => user.username === currentUser.username)[0].movies;
    if (movies.filter(m => m.imdbID === movie.imdbID).length > 0) {
      return of(false);
    }
    movies.push(movie);
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].username === currentUser.username) {
        allUsers[i].movies = movies
        localStorage.setItem('users', JSON.stringify(allUsers));
        break;
      }
    }
    return of(true);   
  }

  editMovie(movie): Observable<boolean> {
    const currentUser: User = JSON.parse(localStorage.getItem('user'));
    const allUsers: User[] = JSON.parse(localStorage.getItem('users'));
    const movies = allUsers.filter(user => user.username === currentUser.username)[0].movies;
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].imdbID === movie.imdbID) {
        movies[i] = movie;
        break;
      }
    }
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].username === currentUser.username) {
        allUsers[i].movies = movies
        localStorage.setItem('users', JSON.stringify(allUsers));
        break;
      }
    }
    return of(true);   
  }
}