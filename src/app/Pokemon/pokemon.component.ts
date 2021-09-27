import { Component } from "@angular/core";
import { PokemonService } from "../Services/pokemon.service";
import { OnInit } from "@angular/core";
import { Pokemon } from "../Models/pokemon.model";

@Component({
    selector: 'app-pokemon',
    templateUrl: './pokemon.component.html',
    styleUrls: ['./pokemon.component.css']
})

export class PokemonComponent implements OnInit{
    constructor(private readonly pokemonService: PokemonService){

    }

    ngOnInit(): void {
        this.pokemonService.fetchPokemons();
    }

    get pokemons(): Pokemon[] {
        return this.pokemonService.getPokemons();
    }
}