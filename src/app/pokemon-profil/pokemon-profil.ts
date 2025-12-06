import { PokemonList } from './../models/data';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PokemonListService } from '../services/data.service';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, tap } from 'rxjs';

@Component({
  selector: 'app-pokemon-profil',
  imports: [DatePipe, UpperCasePipe, RouterLink],
  templateUrl: './pokemon-profil.html',
  styles: ``
})
export class PokemonProfil {
  route = inject(ActivatedRoute);
  router = inject(Router)
  pokemonService = inject(PokemonListService);
  id: number = Number(this.route.snapshot.paramMap.get('id'))
  loading = signal(true);
  pokemon = toSignal(this.pokemonService.getPokemon(this.id).pipe(
    tap(() => this.loading.set(false)),
    catchError(() => { this.loading.set(false); return of(null); }),
  )
  , { initialValue: null }
);
deletePokemon(id: number) {
  this.pokemonService.deletePokemon(id).subscribe({
    next: () => {
      this.router.navigate(['/pokemons']);
    },
    error: () => {
      alert('Erreur lors de la suppression du pokémon.');
    }
  });
}
}
