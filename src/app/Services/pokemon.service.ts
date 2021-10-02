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
                    
                }
                this.setData(this.pokemons)
            }, (error: HttpErrorResponse) => {
                this.error = error.message;
            })
            console.log("fetch done", this.pokemons)
        }

    public getPokemons(): Pokemon[] {
        
        return this.getData();
    }

    public sendError(): string {
        return this.error;
    }

    setData(pokemons: Pokemon[]) {

        const jsonData = JSON.stringify(pokemons)
        sessionStorage.setItem("pokemondata", jsonData)
    }
    getData() {
        if (sessionStorage.getItem('pokemondata') ) {
        return JSON.parse(sessionStorage.getItem('pokemondata') || '[]')
        }
        else {
            return undefined
        }
        
    }
}