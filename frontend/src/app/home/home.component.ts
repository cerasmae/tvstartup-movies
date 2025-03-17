import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MovieDetail } from '../models/movie.model';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NavbarComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  postMovieForm: FormGroup<any> = new FormGroup({});
  isCreatingMovie: boolean = false;

  movieId: string = '1';
  movieFile!: File;
  movieTitle: string = '';
  movieDescription: string = '';

  movies: MovieDetail[] = [];
  newMovie?: MovieDetail;
  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  async ngOnInit() {
    this.fetchMovies();

    this.postMovieForm = new FormGroup({
      title: new FormControl(''),
      file: new FormControl(''),
      description: new FormControl('')
    });
  }

  async fetchMovies() {
    try {
      this.movies = await this.apiService.getMovies();
    } catch (error) {
      this.errorMessage = 'Something went wrong.'
    }
  }

  onSubmit(form: FormGroup) {
    this.movieTitle = form.value.title;
    this.movieDescription = form.value.description;

    this.uploadMovie();
  }

  async uploadMovie() {
    if (!this.movieFile) {
      
      console.error('Please select a video file');
      return;
    }

    try {
      const response = await this.apiService.postMovie(this.movieFile, this.movieTitle, this.movieDescription)
        .then(
          response => {
            console.log('Movie uploaded successfully:', response);
            window.location.reload();
          }
        )
        .catch(error => console.error('Upload failed:', error));

    } catch (error) {
      console.error('Error uploading movie:', error);
      throw error;
    }
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput.files && fileInput.files.length > 0) {
      this.movieFile = fileInput.files[0];
    }
  }

  createMovieToggle(bool: boolean) {
    this.isCreatingMovie = bool;
  }
}
