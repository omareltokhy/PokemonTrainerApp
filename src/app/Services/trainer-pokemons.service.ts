import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pokemon } from "../models/pokemon.model";
import { User } from "../models/user.model";
import { environment } from "src/environments/environment"
import { Observable } from "rxjs";
import { SessionService } from "../services/session.service";

const API_URL = environment.apiBaseUrl

@Injectable({
    providedIn : 'root'
})
export class TrainerPokemonService{

    private trainer: User | null = null;
    private trainersPokemon: Pokemon | undefined ;

    constructor(private readonly http: HttpClient,
                private readonly sessionService: SessionService    
        ){
    }

    get user(): User | undefined {
        return this.sessionService.user
    }

    addPokemon(pokemonsArray: Pokemon) {

        const headers = new HttpHeaders({
            		'x-api-key': environment.publicApiKey
            	})

        this.http.patch(`${ API_URL }/trainers/${this.sessionService.user?.id}`,
            {
                "pokemon": `${JSON.stringify(pokemonsArray)}`,
            },
            { headers })
            .subscribe(
                (val) => {
                    console.log("PATCH call successful value returned in body", 
                                val);
                },
                response => {
                    console.log("PATCH call in error", response);
                },
                () => {
                    console.log("The PATCH observable is now completed.");
                });
        }

    //public addPokemon(pokemon: Pokemon): void {
	//	const headers = new HttpHeaders({
	//		'x-api-key': environment.publicApiKey
	//	})
	//	this.http.patch(`${ API_URL }/trainers/${ this.user?.id }`, { pokemon }, { headers })
	//}

    //public addPokemonToTrainer(pokemon: Pokemon):void{
      //  this.addPokemon(pokemon);
    //}



    //public setPokemon(trainersPokemon: Pokemon){
      //  this.trainersPokemon = trainersPokemon;
    //}

    //public pokemon(): Pokemon | undefined {
      //  return this.trainersPokemon;
    //}
}