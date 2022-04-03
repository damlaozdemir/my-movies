import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '@model/movie.model';
import { MovieService } from 'app/services/movie.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html'
})
export class MovieEditComponent {
  imdbId: string;
  movie: Movie;
  constructor(
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private movieService: MovieService,
    public router: Router
  ) {
    this.route.params.subscribe(() => {
      this.imdbId = this.route.snapshot.paramMap.get('id');
      this.getMovieDetail()
    });
  }

  getMovieDetail(): void {
    this.movieService.getMovieDetail(this.imdbId).subscribe(
      data => this.movie = data
    )
  }

  submit(movie): void {
    this.movieService.editMovie(movie).subscribe(
      data => {
        if(data) {
          this.toastrService.success('Film düzenlendi');
          this.router.navigate(['/list']);
        } else {
          this.toastrService.success('Sistemsel bir hata oluştu');
        }
      }
    );
  }
}
