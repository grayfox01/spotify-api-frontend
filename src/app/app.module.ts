import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RoutingModule } from './modules/routing/routing.module';

import { HeaderComponent } from './static/header/header.component';
import { FooterComponent } from './static/footer/footer.component';
import { ContentComponent } from './static/content/content.component';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProtectedComponent } from './components/protected/protected.component';
import { ProfileComponent } from './components/profile/profile.component'
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { CallbackComponent } from './components/callback/callback.component';

import { AuthenticationService } from './services/authentication.service';
import { UsersService } from './services/users.service';
import { PlaylistsService } from './services/playlists.service';
import { SocketService } from './services/socket.service';

import { AuthenticatedGuard } from './guards/authenticated.guard';
import { NotAuthenticatedGuard } from './guards/not-authenticated.guard';
import { NgProgressModule } from 'ngx-progressbar';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    MainComponent,
    NotFoundComponent,
    ProtectedComponent,
    ProfileComponent,
    PlaylistsComponent,
    PlaylistComponent,
    CallbackComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    HttpClientModule,
    NgProgressModule
  ],
  providers: [
    AuthenticationService,
    PlaylistsService,
    UsersService,
    AuthenticatedGuard,
    NotAuthenticatedGuard,
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
