import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { PokemonPageComponent } from './pokemon-page/pokemon-page.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';

import { PokemonService } from './services/pokemon.service';
import { CacheService } from './services/cache.service';
import { AuthService } from './services/auth.service';
import { CallbackComponent } from './callback/callback.component';
import { TeamPageComponent } from './team-page/team-page.component';
import { MyTeamsComponent } from './my-teams/my-teams.component';

const appRoutes: Routes = [
  { path: 'pokemon/:id', component: PokemonPageComponent },
  { path: 'pokemon/list/all', component: PokemonListComponent },
  { path: '', component: HomeComponent },
  { path: 'signin', component: CallbackComponent },
  { path: 'trainer', component: MyTeamsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    PokemonPageComponent,
    PokemonListComponent,
    NavbarComponent,
    HomeComponent,
    CallbackComponent,
    TeamPageComponent,
    MyTeamsComponent
  ],
  imports: [
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserModule,
    FormsModule
  ],
  providers: [PokemonService, CacheService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
