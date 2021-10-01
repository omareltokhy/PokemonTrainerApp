import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Pokemon } from '../models/pokemon.model';

@Injectable({
    providedIn: 'root'
})

export class PokemonService{
    private pokemons: Pokemon[] = [];
    private error: string = '';

    constructor(private readonly http:HttpClient){
    }

    public fetchPokemons(): void {
        this.http.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151')
            .subscribe((response: any) => {
                this.pokemons = response.results;
                for(let i = 0; i < this.pokemons.length; i++) {
                    this.pokemons[i].img = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + (i+1) + '.png'
                    this.pokemons[i].id = (i+1)
                    console.log(this.pokemons)
                }
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
}