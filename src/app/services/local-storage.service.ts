import { Observable, of } from 'rxjs';
import { PokemonList } from '../models/data';
import { PokemonListService } from './data.service';

export class LocalStorageService implements PokemonListService {
  private localStorageKey = 'pokemons';

  // Initialise les données dans le localStorage si elles n'existent pas encore.
  private initializePokemons(): void {
    const storedPokemons = localStorage.getItem(this.localStorageKey);
    if (!storedPokemons) {
      const initialPokemons: PokemonList[] = [
        {
      "id": 1,
      "name": "Bulbizarre",
      "life": 25,
      "damage": 10,
      "picture": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png",
      "types": [
        "Plante",
        "Poison",
        "Sol",
        "Vol"
      ],
      "created": new Date(),
      "color": "green"
    },
    {
      "id": 2,
      "name": "Salamèche",
      "life": 30,
      "damage": 10,
      "picture": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/004.png",
      "types": [
        "Feu",
        "Poison"
      ],
      "created": new Date(),
      "color": "red"
    },
    {
      "id": 3,
      "name": "Carapuce",
      "life": 21,
      "damage": 4,
      "picture": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/007.png",
      "types": [
        "Eau"
      ],
      "created": new Date(),
      "color": "blue"
    },
    {
      "id": 4,
      "name": "Aspicot",
      "life": 16,
      "damage": 2,
      "picture": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/013.png",
      "types": [
        "Insecte",
        "Poison"
      ],
      "created": new Date(),
      "color": "yellow"
    },
    {
      "id": 5,
      "name": "Roucool",
      "life": 30,
      "damage": 7,
      "picture": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/016.png",
      "types": [
        "Normal",
        "Vol"
      ],
      "created": new Date(),
      "color": "brown"
    },
    {
      "id": 6,
      "name": "Rattata",
      "life": 18,
      "damage": 3,
      "picture": "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/019.png",
      "types": [
        "Normal"
      ],
      "created": new Date(),
      "color": "purple"
    },
    {
      "id": 7,
      "name": "Pikachu",
      "life": 35,
      "damage": 8,
      "picture": "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
      "types": [
        "Électrik"
      ],
      "created": new Date(),
      "color": "orange"
    },
    {
      "name": "Dracaufeu",
      "picture": "https://img.pokemondb.net/artwork/large/charizard.jpg",
      "life": 10,
      "damage": 2,
      "types": [
        "Normal",
        "Feu"
      ],
      "created": new Date(),
      "color": "#0000FF",
      "id": 8
    },
    {
      "name": "neufqueue",
      "picture": "https://img.pokemondb.net/artwork/large/ninetales.jpg",
      "life": 10,
      "damage": 3,
      "types": [
        "Normal",
        "Fée"
      ],
      "created": new Date(),
      "color": "#FFFF00",
      "id": 9
    }
      ];
      localStorage.setItem(
        this.localStorageKey,
        JSON.stringify(initialPokemons)
      );
    }
  }

  // Récupère la liste des Pokémons depuis le localStorage.
  private getPokemonsFromStorage(): PokemonList[] {
    this.initializePokemons();
    const pokemons = localStorage.getItem(this.localStorageKey);
    return pokemons ? JSON.parse(pokemons) : [];
  }

  // Sauvegarde la liste des Pokémons dans le localStorage.
  private savePokemonsToStorage(pokemons: PokemonList[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(pokemons));
  }

  // Retourne la liste de tous les Pokémons.
  getPokemons(): Observable<PokemonList[]> {
    const pokemons = this.getPokemonsFromStorage();
    return of(pokemons);
  }

  // Retourne le pokémon avec l'identifiant passé en paramètre.
  getPokemon(id: number): Observable<PokemonList> {
    const pokemons = this.getPokemonsFromStorage();
    const pokemon = pokemons.find((p) => p.id === id);
    return of(pokemon!); // Utilise '!' car le pokémon existe toujours.
  }

  // Met à jour un pokémon existant.
  updatePokemon(pokemon: PokemonList): Observable<PokemonList> {
    const pokemons = this.getPokemonsFromStorage();
    const index = pokemons.findIndex((p) => p.id === pokemon.id);
    if (index !== -1) {
      pokemons[index] = pokemon;
      this.savePokemonsToStorage(pokemons);
    }
    return of(pokemon);
  }

  // Supprime un pokémon.
  deletePokemon(pokemonId: number): Observable<void> {
    let pokemons = this.getPokemonsFromStorage();
    pokemons = pokemons.filter((p) => p.id !== pokemonId);
    this.savePokemonsToStorage(pokemons);
    return of(void 0);
  }

  // Ajoute un pokémon.
  createPokemon(pokemon: Omit<PokemonList, 'id'>): Observable<PokemonList> {
    const pokemons = this.getPokemonsFromStorage();
    const newPokemon: PokemonList = {
      id: pokemons.length + 1,
      ...pokemon,
    };
    pokemons.push(newPokemon);
    this.savePokemonsToStorage(pokemons);
    return of(newPokemon);
  }
  getPokemonColor(pokemon: PokemonList): string {
     return pokemon.color;
  }
  getPokemonsType(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
    ];
  }
}
