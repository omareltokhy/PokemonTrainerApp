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
//Implements trainer component
export class TrainerComponent implements OnInit{
    
    constructor(private readonly trainersPokemonsService: TrainerPokemonService,
                private readonly router:Router,
        ){
    }

    ngOnInit():void{
        this.trainersPokemonsService.fetchTrainersPokemons();
    }

    get trainersPokemons(): Pokemon[]{
        return this.trainersPokemonsService.getTrainersPokemons();
    }

    //Returns user back to pokemon page
    onPokemonPageClicked():void{
        this.router.navigate(['pokemons'])
    }

    //Deletes users pokemon by id
    onPokemonDeleteClicked(pokemon: number){
        this.trainersPokemonsService.deleteTrainersPokemon(pokemon);
    };

}