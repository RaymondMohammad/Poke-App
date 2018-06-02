import { Component, OnInit } from '@angular/core';
import { PokemonInfo } from '../models/pokemonInfo';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {
  apiPokemon: PokemonInfo[] = [];
  caught: number;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getPokemonFromApi();
  }

  getPokemonFromApi() {
    let userId = localStorage.getItem('user_id');
    this.api.getTrainer(userId)
      .subscribe(res => {
        res.pokemons.forEach((p, i) => this.apiPokemon[i] = p);
        this.caught = res.caught;
      });
  }

}
