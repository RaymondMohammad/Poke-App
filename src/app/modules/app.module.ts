import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from '../components/app.component';
import { PokemonPageComponent } from '../components/pokemon-page/pokemon-page.component';

import { PokemonService } from '../services/pokemon.service';

@NgModule({
  declarations: [
    AppComponent,
    PokemonPageComponent
  ],
  imports: [
    HttpModule,
    BrowserModule
  ],
  providers: [PokemonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
