import { Component } from "@angular/core";
import { PokemonService } from "../services/pokemon.service";
import { OnInit } from "@angular/core";
import { Pokemon } from "../models/pokemon.model";
import { TrainerPokemonService } from "../services/trainer-pokemons.service";
import { Router } from "@angular/router"

//Implementing pokemon component
@Component({
    selector: 'app-pokemon',
    templateUrl: './pokemon.component.html',
    styleUrls: ['./pokemon.component.css']
})

export class PokemonComponent implements OnInit{
    constructor(private readonly pokemonService: PokemonService,
                private readonly trainersPokemonsService: TrainerPokemonService,
                private readonly router: Router,
        ){
    }

    public pokemonArray: Pokemon[] = [];
    private setup: number = 0;

    //Fetches pokemon data from pokeapi once, and uses localstorage after that
    ngOnInit(): void {
        console.log("before:", this.setup)
        if(this.setup === 0 ){
            console.log("B", this.pokemonService.getData())
            this.pokemonService.fetchPokemons();
            this.setup = 1;
            console.log("after:", this.setup)
            console.log("C",this.pokemonService.getData())
        }
        this.pokemonService.getData();
        
        
    }

    get pokemons(): Pokemon[] {
        return this.pokemonService.getPokemons();
    }
    get trainersPokemons(): Pokemon[] {
        return this.trainersPokemonsService.getTrainersPokemons();
    }

    //Adds pokemon to trainers collection and updates trainer api
    onPokemonClicked(pokemon: Pokemon):void{
        this.trainersPokemonsService.addPokemon(pokemon);
    }

    //Redirect user to trainer page 
    onTrainerPageClicked():void{
        this.router.navigate(['trainer'])
    }
}