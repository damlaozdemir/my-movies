import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '@model/movie.model';
import { MovieService } from 'app/services/movie.service';
import { TypeaheadDirective, TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ToastrService } from 'ngx-toastr';
import { Observable, Observer, noop, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html'
})
export class MovieAddComponent implements OnInit {
  searchKeyword: string;
  selectedMovie: Movie;
  suggestions: Observable<Movie[]>;
  @ViewChild('typeahead') typeahead: TypeaheadDirective;
  constructor(
    private movieService: MovieService,
    private toastrService: ToastrService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.bindAsyncSearch();
  }

  bindAsyncSearch(): any {
    this.suggestions = new Observable((observer: Observer<string | undefined>) => {
      observer.next(this.searchKeyword);
    }).pipe(
      switchMap((keyword: string) => {
        if (keyword) {
          return this.movieService.searchMovies(keyword).pipe(
            map((data) => { if (data.Search) { return data.Search || []; } }),
            tap(() => noop, err => {
              return of([]);
            })
          );
        }
        return of([]);
      })
    );
  }

  selectMovie(match: TypeaheadMatch): void {
    this.selectedMovie = match.item;
    this.setSearchKeyword(match.value);
  }

  setSearchKeyword(value: string): void {
    this.searchKeyword = value;
  }

  closeOptions(): void {
    this.typeahead.hide()
  }

  submit(movie): void {
    this.movieService.addMovie(movie).subscribe(
      data => {
        if (data) {
          this.toastrService.success(this.selectedMovie.Title + ' filmi eklenmiştir');
          this.router.navigate(['/list']);
        } else {
          this.toastrService.error('Bu film daha önceden listenize eklenmiştir');
        }
      },
      error => {
        // Error handling
      }
    )
  }
}
