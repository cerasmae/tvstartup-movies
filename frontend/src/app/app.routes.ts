import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MovieComponent } from './movie/movie.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'movie/:id', component: MovieComponent},
];
