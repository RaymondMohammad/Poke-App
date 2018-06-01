import { Pokemon } from '../models/pokemon';

export class Team {
    constructor() {

    }

    teamId: number;
    name: string;
    trainerId: number;

    pokemon: Pokemon[];

}
