import { Injectable } from "@angular/core";
import { Pokemon } from "../models/pokemon.model";

@Injectable({
    providedIn : 'root'
})
export class TrainerPokemonService{

    private trainersPokemon: Pokemon | undefined;

    public setPokemon(trainersPokemon: Pokemon){
        this.trainersPokemon = trainersPokemon;
    }

    public pokemon(): Pokemon | undefined {
        return this.trainersPokemon;
    }
}