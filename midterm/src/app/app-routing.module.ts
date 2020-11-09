import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from './pages/auth/auth.component';
import {PostsComponent} from './pages/posts/posts.component';
import {CreatePostComponent} from './pages/create-post/create-post.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: AuthComponent},
  {path: 'posts', component: PostsComponent},
  {path: 'create-post', component: CreatePostComponent},
  {
    path: 'route-based',
    loadChildren: async () => {
      const module = await import(
        './album-route-based/album-route-based.module'
        );
      return module.AlbumRouteBasedModule;
    },
  },
  {
    path: 'content-projection-based',
    loadChildren: async () => {
      const module = await import(
        './album-content-projection-based/album-content-projection-based.module'
        );
      return module.AlbumContentProjectionBasedModule;
    },
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
