import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './../../components/main/main.component';
import { NotFoundComponent } from './../../components/not-found/not-found.component';
import { ProtectedComponent } from './../../components/protected/protected.component';
import { PlaylistsComponent } from './../../components/playlists/playlists.component';
import { ProfileComponent } from './../../components/profile/profile.component';
import { CallbackComponent } from './../../components/callback/callback.component';
import { AuthenticatedGuard } from './../../guards/authenticated.guard';
import { PlaylistComponent } from './../../components/playlist/playlist.component'
import { NotAuthenticatedGuard } from './../../guards/not-authenticated.guard';

const routes: Routes = [
  { path: 'notfound', component: NotFoundComponent},
  { path: 'profile', component: ProfileComponent, canActivate:[AuthenticatedGuard]},
  { path: 'playlist/:id', component: PlaylistComponent, canActivate:[AuthenticatedGuard]},
  { path: 'playlists', component: PlaylistsComponent, canActivate:[AuthenticatedGuard]},
  { path: 'home', component: MainComponent},
  { path: 'restricted', component: ProtectedComponent},
  { path: 'callback', component: CallbackComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/notfound',pathMatch: 'full'}
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
