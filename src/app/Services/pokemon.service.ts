import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Pokemon } from '../Models/pokemon.model';

@Injectable({
    providedIn: 'root'
})

export class PokemonService{
    private pokemons: Pokemon[] = [];
    private error: string = '';

    constructor(private readonly http:HttpClient){
    }

    public fetchPokemons(): void {
        this.http.get<Pokemon[]>('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151')
            .subscribe((pokemons: Pokemon[]) => {
                this.pokemons = pokemons
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