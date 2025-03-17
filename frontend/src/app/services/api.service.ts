import { Injectable } from '@angular/core';
import { MovieDetail, Movie } from '../models/movie.model';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {'Content-Type': 'application/json'}
  });

  constructor() { }

  // list
  async getMovies(): Promise<MovieDetail[]> {
    try {
      const response = await this.api.get<MovieDetail[]>('movie/');
      return response.data;
    } catch (error) {
      console.error('Something went wrong.', error);
      throw error;
    }
  }

  // get
  async getMovie(id: string): Promise<MovieDetail> {
    try {
      const response = await this.api.get<MovieDetail>(`movie/${id}`);
      return response.data;
    } catch (error) {
      console.error('Something went wrong.', error);
      throw error;
    }
  }

  // post
  async postMovie(videoFile: File, title: string, description: string): Promise<any> {
    try {
      const formData = new FormData();
      formData.append('video_file', videoFile);
      formData.append('title', title);
      formData.append('description', description);

      const response = await this.api.post('movie/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error uploading movie:', error);
      throw error;
    }
  }

  // put
  async patchMovie(id: string, videoFile: File | null | undefined, title: string, description: string): Promise<any> {
    try {
      const formData = new FormData();

      if (videoFile != null && videoFile != undefined) {
        formData.append('video_file', videoFile);
      }

      if (title) {
        formData.append('title', title);
      }

      if (description) {
        formData.append('description', description);
      }

      const response = await this.api.patch(`movie/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error uploading movie:', error);
      throw error;
    }
  }

  // delete
  async deleteMovie(id: string): Promise<any> {
    try {
      const response = await this.api.delete(`movie/${id}`)
    } catch (error) {
      console.error('Error uploading movie:', error);
      throw error;
    }
  }
}
