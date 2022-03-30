import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.sass']
})
export class MovieListComponent implements OnInit {
  movies = [];
  constructor() { }

  ngOnInit(): void {
    this.movies = JSON.parse(localStorage.getItem('movies')) || [];
  }


}
