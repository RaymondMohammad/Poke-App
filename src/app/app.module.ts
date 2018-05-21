import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { PokemonPageComponent } from './pokemon-page/pokemon-page.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';

import { PokemonService } from './services/pokemon.service';
import { CacheService } from './services/cache.service';
import { NavbarComponent } from './navbar/navbar.component';


const appRoutes: Routes = [
  { path: 'pokemon/:id', component: PokemonPageComponent },
  { path: '', component: PokemonListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PokemonPageComponent,
    PokemonListComponent,
    NavbarComponent
  ],
  imports: [
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    BrowserModule
  ],
  providers: [PokemonService, CacheService],
  bootstrap: [AppComponent]
})
export class AppModule { }
