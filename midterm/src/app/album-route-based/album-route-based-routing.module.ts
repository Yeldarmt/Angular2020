import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RouteBasedAlbumsComponent} from './pages/route-based-albums/route-based-albums.component';
import {AlbumComponent} from '../components/album/album.component';
import {SelectUserComponent} from '../components/select-user/select-user.component';

const albumRoutes: Routes = [
  {
    path: '',
    component: SelectUserComponent,
  },
  {
    path: ':userId',
    component: AlbumComponent,
  }
];

const routes: Routes = [
  {
    path: '',
    redirectTo: 'album',
    pathMatch: 'full',
  },
  {
    path: 'album',
    component: RouteBasedAlbumsComponent,
    children: albumRoutes,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlbumRouteBasedRoutingModule { }
