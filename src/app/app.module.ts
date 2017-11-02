import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { RoutingModule } from './modules/routing/routing.module';

import { HeaderComponent } from './static/header/header.component';
import { FooterComponent } from './static/footer/footer.component';
import { ContentComponent } from './static/content/content.component';
import { SignupComponent } from './components/signup/signup.component'
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component'
import { PlaylistsComponent } from './components/playlists/playlists.component';

import { AuthenticationService } from './services/authentication.service';
import { UsersService } from './services/users.service';
import { PlaylistsService } from './services/playlists.service';
import { CookieService } from 'ngx-cookie-service';

import { AuthenticatedGuard } from './guards/authenticated.guard';
import { NotAuthenticatedGuard } from './guards/not-authenticated.guard';
import { PlaylistComponent } from './components/playlist/playlist.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    MainComponent,
    NotFoundComponent,
    ProtectedComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    PlaylistsComponent,
    PlaylistComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    AuthenticationService,
    PlaylistsService,
    UsersService,
    CookieService,
    AuthenticatedGuard,
    NotAuthenticatedGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
