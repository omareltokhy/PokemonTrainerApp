import { Pokemon } from "./pokemon.model";

//Interface for user data, users pokemon list uses pokemon interface as a type
export interface User {
    id: number;
    username: string;
    pokemon: Pokemon;
}