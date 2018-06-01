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
import { TrainerPageComponent } from './trainer-page/trainer-page.component';
import { ApiService } from './services/api.service';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
  { path: 'pokemon/:id', component: PokemonPageComponent },
  { path: 'pokemon/list/all', component: PokemonListComponent },
  { path: '', component: HomeComponent },
  { path: 'signin', component: CallbackComponent, canActivate: [AuthGuard] },
  { path: 'trainer', component: TrainerPageComponent, canActivate: [AuthGuard] },
  { path: 'trainer/:id/team/:teamId', component: TeamPageComponent, canActivate: [AuthGuard] }
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
    TrainerPageComponent
  ],
  imports: [
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserModule,
    FormsModule
  ],
  providers: [PokemonService, CacheService, AuthService, AuthGuard, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
