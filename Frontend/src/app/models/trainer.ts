import { Team } from '../models/team';
import { PokemonInfo } from './pokemonInfo';

export class Trainer {
    constructor() {

    }

    trainerId: number;
    userId: string;
    name: string;
    caught: number;

    pokemons: PokemonInfo[];
    teams: Team[];
}
