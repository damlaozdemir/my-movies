import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Movie } from '@model/movie.model';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html'
})
export class MovieFormComponent implements OnChanges {
  showScoreError: boolean;
  form: FormGroup;
  @Input() title: string;
  @Input() movie: Movie;
  @Output() submitEmitter = new EventEmitter();
  constructor( private fb: FormBuilder ) { }

  ngOnChanges(): void {
    this.createForm();
    this.setFormData();
  }

  setFormData(): void {
    if(this.movie) {
      this.form?.setValue({
        title: this.movie.Title, 
        poster: this.movie.Poster, 
        score: this.movie.score || ''
      });
    }
  }

  createForm(): void {
    this.form = this.fb.group({
      title: [{value:'', disabled: true}, Validators.required],
      poster: [{value:'', disabled: true}],
      score: [{value:'', disabled: false}],
    });
  }

  submit(): void {
    const data = this.movie;
    if(this.form.value.score > 10) {
      this.showScoreError = true;
      return;
    }
    data['score'] = this.form.value.score;
    data['date'] = new Date();
    this.submitEmitter.emit(data);
  }

  handleScore(e): void {
    if (e.which < 48 || e.which > 57)
    {
      e.preventDefault();
    }
  }
}
