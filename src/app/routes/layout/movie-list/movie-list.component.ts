import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from '@model/movie.model';
import { ConfirmationModalComponent } from '@shared/confirmation-modal/confirmation-modal.component';
import { MovieService } from 'app/services/movie.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.sass']
})
export class MovieListComponent implements OnInit {
  count: number = 10;
  selectedMovie: Movie;
  movies: Movie[] = [];
  loggedInUserMoviesAll: Movie[] = [];
  @ViewChild(ConfirmationModalComponent) confirmationModalComponent: ConfirmationModalComponent;
  constructor(
    private toastrService: ToastrService,
    private movieService: MovieService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies().subscribe(
      data => this.movies = data.reverse().slice(0, this.count)
    )
  }

  openConfirmationModal(e): void {
    e.stopPropagation();
    this.confirmationModalComponent.openModal();
  }

  setSelectedMovie(movie: Movie): void {
    this.selectedMovie = movie;
  }

  deleteMovie(): void {
    this.movieService.deleteMovie(this.selectedMovie.imdbID).subscribe(
      data => {
        this.toastrService.success(this.selectedMovie.Title + ' adlı film silindi');
        this.getMovies();
      }
    )
  }

  setSort(sort: string, type: string): void {
    switch (sort) {
      case 'score':
        this.movies.sort((a, b) => {
          if (a.score === b.score) {
            let da = new Date(a.date),
              db = new Date(b.date);
            return Number(db) - Number(da);
          } else {
            return type === 'dsc' ? Number(b.score) - Number(a.score) : Number(a.score) - Number(b.score);
          }
        });
        break;
      default:
    }
  }

  onKeyUpEvent(event: any) {
    this.movies = this.movies.filter(movie => { movie.Title.includes(event.target.value) });
  }

  onScrollDown() {
    this.count += 10;
    this.getMovies();
  }
}
