import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon';
import { CacheService } from '../services/cache.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})

export class PokemonListComponent implements OnInit {
  private subscription: Subscription;
  pokemon: Pokemon[] = [];
  pokemonList: any;
  apiPokemon: Array<number> = [];
  isLoading: boolean = false;
  errors: string;
  all: boolean = false;
  private cache: string = '';

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute, private cacheService: CacheService, private api: ApiService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.loadMore();
      });
  }

  loadMore() {
    if (localStorage.getItem('trainer_id'))
      this.getPokemon();
    this.isLoading = true;
    this.pokemonList = this.cacheService.get('list' + this.pokemon.length, this.pokemonService.getAllPokemon(this.pokemon.length, 36));
    this.pokemonList
      .finally(() => this.isLoading = false)
      .subscribe(
        list => {
          this.pokemon = this.pokemon.concat(list)
          if (this.pokemon.length >= 802)
            this.all = true;
        },
        errors => this.errors = errors
      );
  }

  getPokemon() {
    let id = localStorage.getItem('user_id');
    this.api.getTrainer(id)
      .subscribe(res => {
        res.pokemons.forEach((p, i) => this.apiPokemon[i] = p.pokemonId);
      });
  }

  containsPokemon(id: number): Boolean {
    return this.apiPokemon.indexOf(id) != -1;
  }
}
