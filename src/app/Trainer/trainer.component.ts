import { Component, OnInit } from "@angular/core";
import { Pokemon } from "../models/pokemon.model";
import { TrainerPokemonService } from "../services/trainer-pokemons.service";
import { Router } from "@angular/router";
import { PokemonComponent } from "../pokemon/pokemon.component";

@Component({
    selector: 'app-trainer',
    templateUrl: './trainer.component.html',
    styleUrls: ['./trainer.component.css']
})

export class TrainerComponent implements OnInit{
    
    constructor(private readonly trainersPokemonsService: TrainerPokemonService,
                private readonly router:Router,
                //private readonly pokemonComponent: PokemonComponent
        ){
    }

    ngOnInit():void{
        this.trainersPokemonsService.fetchTrainersPokemons();
    }

    get trainersPokemons(): Pokemon[]{
        return this.trainersPokemonsService.getTrainersPokemons();
    }

    //get usersPokemons(): Pokemon[]{
        //return this.pokemonComponent.pokemonArray;
    //}

    onPokemonPageClicked():void{
        this.router.navigate(['pokemons'])
    }

    onPokemonDeleteClicked(pokemon: number){
        this.trainersPokemonsService.deleteTrainersPokemon(pokemon);
    };

    //get trainersPokemon(): Pokemon | undefined {
      //  return this.trainersPokemonsService.pokemon();
    //}
}