import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../models/pokemon';
import { CacheService } from '../services/cache.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})

export class PokemonListComponent implements OnInit {
  private subscription: Subscription;
  pokemon: Pokemon[] = [];
  pokemonList: any;
  isLoading: boolean = false;
  errors: string;
  private cache: string = '';

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute, private cacheService: CacheService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.loadMore();
      });
  }

  loadMore() {
    this.isLoading = true;
    this.pokemonList = this.cacheService.get('list' + this.pokemon.length, this.pokemonService.getAllPokemon(this.pokemon.length, 36));
    this.pokemonList
      .finally(() => this.isLoading = false)
      .subscribe(
        list => this.pokemon = this.pokemon.concat(list),
        errors => this.errors = errors
      );
  }
}
