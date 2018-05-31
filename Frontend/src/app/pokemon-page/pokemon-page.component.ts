import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service'
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PokemonInfo } from '../models/pokemonInfo';
import { map } from 'rxjs/operators';
import { CacheService } from '../services/cache.service';

@Component({
  selector: 'app-pokemon-page',
  templateUrl: './pokemon-page.component.html',
  styleUrls: ['./pokemon-page.component.css']
})
export class PokemonPageComponent implements OnInit {

  private subscription: Subscription;
  pokemonInfo: PokemonInfo;
  id: any;
  url: string;
  currentId: number;
  errors: string;
  isLoading: boolean = false;
  pokemon: any;
  imgString: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other-sprites/official-artwork/';

  constructor(private pokemonService: PokemonService, private route: ActivatedRoute, private cacheService: CacheService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        this.getPokemon();
      });

  }

  getPokemon() {
    this.errors = '';
    this.isLoading = true;
    this.pokemon = this.cacheService.get(String(this.id), this.pokemonService.getPokemonById(this.id));
    this.pokemon.subscribe(res => {
      this.pokemonInfo = res;
      this.pokemonInfo.img = this.imgString + res.id + '.png';
      this.cacheService.get(String(this.id + "-info"), this.pokemonService.getPokemonInfo(res.species.url))
        .finally(() => this.isLoading = false)
        .subscribe(response => {
          this.pokemonInfo.description = response.flavor_text_entries.find(function (obj) { return obj.language.name === "en"; }).flavor_text;
          this.pokemonInfo.species = response.genera.find(function (obj) { return obj.language.name === "en"; }).genus;
          this.pokemonInfo.generation = response.generation.name;
          this.pokemonInfo.habitat = response.habitat.name;
        })
    },
      errors => this.errors = errors
    );
  }
}
