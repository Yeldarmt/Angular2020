import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumRouteBasedRoutingModule } from './album-route-based-routing.module';
import {RouteBasedAlbumsComponent} from './pages/route-based-albums/route-based-albums.component';
import {UsersListComponent} from '../components/users-list/users-list.component';
import {AlbumComponent} from '../components/album/album.component';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [RouteBasedAlbumsComponent, UsersListComponent, AlbumComponent],
  exports: [
    UsersListComponent,
    AlbumComponent
  ],
  imports: [
    CommonModule,
    AlbumRouteBasedRoutingModule,
    MatListModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AlbumRouteBasedModule { }
