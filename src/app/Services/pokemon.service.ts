import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Pokemon } from '../models/pokemon.model';

@Injectable({
    providedIn: 'root'
})

export class PokemonService{
    private pokemons: Pokemon[] = [];
    private error: string = '';
    private pokemonImages: string[] = [];

    constructor(private readonly http:HttpClient){
    }

    public fetchPokemons(): void {
        this.http.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151')
            .subscribe((response: any) => {
                this.pokemons = response.results;
            }, (error: HttpErrorResponse) => {
                this.error = error.message;
            })
    }

    public getPokemons(): Pokemon[] {
        return this.pokemons;
    }

    public sendError(): string {
        return this.error;
    }

    public pokemonImagesArray(): void {
        for(let pokemon of this.pokemons){

        }
    }
}