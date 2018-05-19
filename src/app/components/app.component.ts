import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';

import { Pokemon } from '../models/pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  pokemon: Pokemon[] = [];
  isLoading: boolean = false;
  error: boolean = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadMore();
  }

  loadMore() {
    this.isLoading = true;
    this.pokemonService.getPokemon(this.pokemon.length, 9)
      .then( pokemon => {
        pokemon = pokemon.map(p => {
          p.imageLoaded = false;
          return p;
        });

        this.pokemon = this.pokemon.concat(pokemon);
        this.isLoading = false;
        this.error = false;
      })
      .catch(() => {
        this.error = true;
        this.isLoading = false;
      });
  }
  title = 'PokéApp';
}
