import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Route } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list';
import { PokemonProfil } from './pokemon-profil/pokemon-profil';
import { PageNotFound } from './page-not-found/page-not-found';
import { EditPokemon } from './edit-pokemon/edit-pokemon';
import { provideHttpClient } from '@angular/common/http';
import { Login } from './login/login';
import { AuthGuard } from './core/auth/auth.guard';
import { PokemonAdd } from './pokemon-add/pokemon-add';
import { environment } from '../environments/environment';
import { LocalStorageService } from './services/local-storage.service';
import { JsonServerService } from './services/json-server.service';
import { PokemonListService } from './services/data.service';

export function PokemonServiceFactory(): PokemonListService {
  return environment.production ? new LocalStorageService(): new JsonServerService();
}

const route : Route[] = [
  {
    path: 'login',
    component: Login
  },
  {
    path:'pokemons',
    canActivateChild: [AuthGuard],
    children: [
          {
              path:'add',
              title: 'ajouter pokemon',
              component: PokemonAdd
          },
          {
              path:'edit/:id',
              title: 'Edit Pokemon',
              component: EditPokemon
            },
            {
              path: '',
              title: 'Pokedex',
              component: PokemonListComponent
            },
            {
              path: ':id',
              title: 'Pokemon',
              component: PokemonProfil
            },
    ]
  },
  {
    path: '',
    redirectTo: 'pokemons',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFound
  }

]
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(route),
    provideHttpClient(),
    {
      provide: PokemonListService,
      useFactory: PokemonServiceFactory
    }
  ]

};
