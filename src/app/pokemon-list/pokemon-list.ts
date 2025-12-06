import { PokemonList } from './../models/data';
import { Component, computed, inject, signal } from '@angular/core';
import { PokemonListService } from '../services/data.service';
import { Color } from '../color.directive';
import { DatePipe } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-pokemon-list',
  imports: [Color,DatePipe,FormsModule,RouterLink],
  templateUrl: './pokemon-list.html',
})
export class PokemonListComponent {
   readonly pokemonListService = inject(PokemonListService);
  pokemonList = toSignal(this.pokemonListService.getPokemons(), { initialValue: [] });
  searchTerm= signal('');
  router = inject(Router);
  loading = computed(() => this.pokemonList().length === 0);
  filteredPokemonList = computed(() => {
    return this.pokemonList().filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchTerm().toLowerCase().trim())
    );
  });

  onColorPekemon(pokemon:PokemonList): string {
    return this.pokemonListService.getPokemonColor(pokemon);
  }
  navigateToPokemon(id: number) {
    // Logic to navigate to the Pokemon profile page
    this.router.navigate(['/pokemons', id]);
  }

  incrementlife(pokemon: any) {
    pokemon.life++;
  }

  decrementlife(pokemon: any) {
    pokemon.life--;
  }
  onTaille(pokemon: PokemonList) {
    let taille = "";
    if (pokemon.life <= 15)  {
      taille = 'petit';
    }
    else if (pokemon.life > 15 && pokemon.life < 25) {
      taille = 'moyen';
    } else {
      taille = 'grand';
    }
    return taille;
  }

}
