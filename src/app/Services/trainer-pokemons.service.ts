import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
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
//Implement service for trainers pokemons
export class TrainerPokemonService{

    public trainersPokemon: Pokemon[] = [];
    private error: string = '';

    constructor(private readonly http: HttpClient,
                private readonly sessionService: SessionService    
        ){
    }

    get user(): User | undefined {
        return this.sessionService.user
    }

    //Adds pokemon info to user by id
    addPokemon(pokemon: Pokemon) {

        this.trainersPokemon.push(pokemon)

        const headers = new HttpHeaders({
            		'x-api-key': environment.publicApiKey
            	})

        this.http.patch(`${ API_URL }/trainers/${this.sessionService.user?.id}`,
            {
                "pokemon": `${JSON.stringify(this.trainersPokemon)}`,
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

        //Fetches trainers pokemon to display on trainer page
        public fetchTrainersPokemons(): void {
            this.http.get(`${ API_URL }/trainers/${this.sessionService.user?.id}`)
                .subscribe((response: any) => {
                    this.trainersPokemon = JSON.parse(response.pokemon);
                        console.log(this.trainersPokemon)
                }, (error: HttpErrorResponse) => {
                    this.error = error.message;
                })
        }

        public getTrainersPokemons(): Pokemon[] {
            return this.trainersPokemon;
        }
    
        public sendError(): string {
            return this.error;
        }

        //Deletes trainers pokemon by pokemon id
        deleteTrainersPokemon(pokemon: number) {
 
            this.trainersPokemon.splice(pokemon, 1);

        const headers = new HttpHeaders({
            		'x-api-key': environment.publicApiKey
            	})

        this.http.patch(`${ API_URL }/trainers/${this.sessionService.user?.id}`,
            {
                "pokemon": `${JSON.stringify(this.trainersPokemon)}`,
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
}