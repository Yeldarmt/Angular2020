import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AlbumPageComponent} from './pages/album-page/album-page.component';
import {AlbumComponent} from '../components/album/album.component';

const routes: Routes = [
  {
    path: '',
    component: AlbumPageComponent,
  },
  {
    path: ':userId',
    component: AlbumPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumContentProjectionBasedRoutingModule { }
