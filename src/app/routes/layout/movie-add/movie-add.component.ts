import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Movie } from '@model/movie.model';
import { MovieService } from 'app/services/movie.service';
import { TypeaheadDirective, TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Observable, Observer, noop, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-movie-add',
  templateUrl: './movie-add.component.html',
  styleUrls: ['./movie-add.component.sass']
})
export class MovieAddComponent implements OnInit {
  searchKeyword: string;
  @ViewChild('typeahead') typeahead: TypeaheadDirective;
  suggestions: any;
  selectedMovie: Movie;
  form: FormGroup;
  constructor(private movieService: MovieService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.bindAsyncSearch();
    this.createForm();
  }

  createForm(): void {
    this.form = this.fb.group({
      title: [{value:'', disabled: true}, Validators.required],
      poster: [{value:'', disabled: true}],
      score: [{value:'', disabled: false}],
    });
  }


  bindAsyncSearch(): any {
    this.suggestions = new Observable((observer: Observer<string | undefined>) => {
      observer.next(this.searchKeyword);
    }).pipe(
      switchMap((keyword: string) => {
        if (keyword) {
          return this.movieService.searchMovies(keyword).pipe(
            map((data) => {if(data.Search) { return data.Search || []; } } ),
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
    this.form.setValue({
      title: this.selectedMovie.Title, 
      poster: this.selectedMovie.Poster, 
      score: ''
    });
    this.setSearchKeyword(match.value);
  }

  setSearchKeyword(value: string): void {
    this.searchKeyword = value;
  }

  closeOptions(): void {
    this.typeahead.hide()
  }

  submit(): void {
    const movies = JSON.parse(localStorage.getItem('movies'));
    const data = this.selectedMovie;
    data['score'] = this.form.value.score;
    if (movies !== null) {
      movies.push(data);
      localStorage.setItem('movies', JSON.stringify(movies));
    } else {
      localStorage.setItem('movies', JSON.stringify([data]));
    }
    this.router.navigate(['/list']);
  }
}
