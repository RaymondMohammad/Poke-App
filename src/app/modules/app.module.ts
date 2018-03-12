import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from '../components/app.component';
import { PokemonPageComponent } from '../components/pokemon-page/pokemon-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonPageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
