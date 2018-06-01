import { Pokemon } from '../models/pokemon';
import { Team } from '../models/team';

export class Trainer {
    constructor() {

    }

    trainerId: number;
    userId: string;
    name: string;
    caught: number;

    pokemon: Pokemon[];
    team: Team[];
}
