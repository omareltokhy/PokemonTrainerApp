import { Component } from "@angular/core";
import { Pokemon } from "../models/pokemon.model";
import { TrainerPokemonService } from "../services/trainer-pokemons.service";

@Component({
    selector: 'app-trainer',
    templateUrl: './trainer.component.html',
    styleUrls: ['./trainer.component.css']
})

export class TrainerComponent{
    
    constructor(private readonly trainersPokemonsService: TrainerPokemonService){
    }

    get trainersPokemon(): Pokemon | undefined {
        return this.trainersPokemonsService.pokemon();
    }
}