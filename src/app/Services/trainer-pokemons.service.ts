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
export class TrainerPokemonService{

    //private trainer: User | null = null;
    public trainersPokemon: Pokemon[] = [];
    private error: string = '';

    constructor(private readonly http: HttpClient,
                private readonly sessionService: SessionService    
        ){
    }

    get user(): User | undefined {
        return this.sessionService.user
    }

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