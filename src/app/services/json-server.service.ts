import { HttpClient } from '@angular/common/http';
import { PokemonList } from './../models/data';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PokemonListService } from './data.service';

export class JsonServerService implements PokemonListService {
  
  readonly #pokemons_api_url:string = 'http://localhost:3000/pokemons';
  readonly #http = inject(HttpClient);

  getPokemons(): Observable<PokemonList[]> {
    return this.#http.get<PokemonList[]>(this.#pokemons_api_url);
  }
  getPokemon(id:number): Observable<PokemonList | undefined> {
    return this.#http.get<PokemonList | undefined>(`${this.#pokemons_api_url}/${id}`);
  }
  
  updatePokemon(pokemon: PokemonList): Observable<PokemonList> {
    return this.#http.put<PokemonList>(`${this.#pokemons_api_url}/${pokemon.id}`, pokemon);
  }
  createPokemon(pokemon: Omit<PokemonList, 'id'|'color'>): Observable<PokemonList> {
    return this.#http.post<PokemonList>(this.#pokemons_api_url, pokemon);
  }
  deletePokemon(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#pokemons_api_url}/${id}`);
  }

  getPokemonColor(pokemon:PokemonList): string {
    return pokemon.color;
  }
  getPokemonsType(){
    return [
      'Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Électrik', 'Fée', 'Combat','Roche', 'Glace', 'Dragon', 'Ténèbres', 'Acier', 'Vol', 'Psy', 'Spectre', 'Normal', 'Sol'
    ]
  }
  
}
