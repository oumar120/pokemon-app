import { Observable } from "rxjs";
import { PokemonList } from "../models/data";


export abstract class PokemonListService {
  abstract getPokemons(): Observable<PokemonList[]>;
  abstract getPokemon(id:number): Observable<PokemonList | undefined>;
  abstract updatePokemon(pokemon: PokemonList): Observable<PokemonList>;
  abstract createPokemon(pokemon: Omit<PokemonList, 'id'|'color'>): Observable<PokemonList>;
  abstract deletePokemon(id: number): Observable<void>;
  abstract getPokemonColor(pokemon:PokemonList): string;
  abstract getPokemonsType(): string[];
}