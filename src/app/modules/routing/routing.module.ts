import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './../../components/main/main.component';
import { NotFoundComponent } from './../../components/not-found/not-found.component';
import { ProtectedComponent } from './../../components/protected/protected.component';
import { LoginComponent } from './../../components/login/login.component';
import { PlaylistsComponent } from './../../components/playlists/playlists.component';
import { SignupComponent } from './../../components/signup/signup.component';
import { ProfileComponent } from './../../components/profile/profile.component';
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
  { path: 'login', component: LoginComponent,canActivate:[NotAuthenticatedGuard]},
  { path: 'signup', component: SignupComponent,canActivate:[NotAuthenticatedGuard]},
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
