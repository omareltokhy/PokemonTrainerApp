import { Component } from "@angular/core";
import { PokemonService } from "../services/pokemon.service";
import { OnInit } from "@angular/core";
import { Pokemon } from "../models/pokemon.model";
import { TrainerPokemonService } from "../services/trainer-pokemons.service";

@Component({
    selector: 'app-pokemon',
    templateUrl: './pokemon.component.html',
    styleUrls: ['./pokemon.component.css']
})

export class PokemonComponent implements OnInit{
    constructor(private readonly pokemonService: PokemonService,
                private readonly trainersPokemonsService: TrainerPokemonService
        ){
    }

    ngOnInit(): void {
        this.pokemonService.fetchPokemons();
    }

    get pokemons(): Pokemon[] {
        return this.pokemonService.getPokemons();
    }

    onPokemonClicked(pokemon: Pokemon):void{
        this.trainersPokemonsService.setPokemon(pokemon);
    }
}