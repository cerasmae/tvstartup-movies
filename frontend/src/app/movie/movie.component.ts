import { Component, OnInit } from '@angular/core';
import { MovieDetail } from '../models/movie.model';
import { ApiService } from '../services/api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-movie',
  imports: [
    ReactiveFormsModule,
    NavbarComponent,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent implements OnInit {
  postMovieForm: FormGroup<any> = new FormGroup({
    title: new FormControl(),
    file: new FormControl(),
    description: new FormControl()
  });
  id = '';
  isEditingMovie: boolean = false;
  isChangingVideo: boolean = false;

  movie!: MovieDetail;
  movieId: string = '1';
  movieFile?: File| null;
  movieTitle: string = '';
  movieDescription: string = '';

  errorMessage: string = '';

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.fetchMovieById(this.id);


  }

  onSubmit(form: FormGroup, action: string) {
    this.movieTitle = form.value.title;
    this.movieDescription = form.value.description;

    if (!this.isChangingVideo) {
      this.movieFile = null;
    }

    if (action == 'delete') {

    } else if (action == 'edit') {
      this.updateMovie();
    }
  }

  async fetchMovieById(movieId: string) {
    if (!movieId) {
      console.error('enter a valid number');
      return;
    }

    try {
      this.movie = await this.apiService.getMovie(movieId);
      this.postMovieForm.setValue({
        title: this.movie.title,
        file: null,
        description: this.movie.description,
      });

      console.log(this.postMovieForm);
    } catch (error) {
      console.error(error);
      this.errorMessage = 'Movie not found.'
    }
  }

  async updateMovie() {
    try {
      const response = await this.apiService.patchMovie(this.id, this.movieFile, this.movieTitle, this.movieDescription)
        .then(response => console.log('Movie uploaded successfully:', response))
        .catch(error => console.error('Upload failed:', error));
      window.location.reload();
    } catch (error) {
      console.error('Error uploading movie:', error);
      throw error;
    }
  }

  async deleteMovie() {
    try {
      const response = await this.apiService.deleteMovie(this.id)
      .then(response => console.log('Movie deleted successfully:', response))
      .catch(error => console.error('Upload failed:', error));

      window.location.href = '/';
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

  editMovieToggle(bool: boolean) {
    this.isEditingMovie = bool;
  }

  changeVideoToggle(bool: boolean) {
    this.isChangingVideo = bool;
  }

  isModalOpen: boolean = false;

  openModal() {
    console.log('open model');
    this.isModalOpen = true;
    console.log(this.isModalOpen);
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
