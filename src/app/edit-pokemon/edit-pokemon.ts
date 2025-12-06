import { Component, effect, inject, signal } from '@angular/core';
import { PokemonListService } from '../services/data.service';
import { ActivatedRoute, Router, RouterLink} from '@angular/router';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { FormArray, FormBuilder, Validators,ReactiveFormsModule, AbstractControl, Form, FormControl } from '@angular/forms';
import { PokemonList } from '../models/data';
import { ErrorForm } from '../error-form/error-form';
import { Color } from "../color.directive";
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-edit-pokemon',
  imports: [NgFor, ReactiveFormsModule, ErrorForm, Color,RouterLink],
  templateUrl: './edit-pokemon.html',
  styles: ``
})
export class EditPokemon {
pokemonService = inject(PokemonListService);
route = inject(ActivatedRoute);
id: number = Number(this.route.snapshot.paramMap.get('id'));
pokemon = toSignal<PokemonList | undefined>(this.pokemonService.getPokemon(this.id));
fb = inject(FormBuilder);
router = inject(Router);

editForm = this.fb.group({
  name: [{
    value: '', disabled: true
  },[Validators.required]],
  life: [0,[Validators.required, Validators.min(10),Validators.max(30)]],
  damage: [0,[Validators.required, Validators.min(1),Validators.max(30)]],
  types: this.fb.array([], Validators.required)
});
constructor() {
  effect(() => {
    const poke = this.pokemon();
    if(poke) {
      this.editForm.patchValue({
        name: poke.name,
        life: poke.life,
        damage: poke.damage
      });
      poke.types.forEach(type => this.formArray.push(this.fb.control(type)));
    }
});
}
get formArray(): FormArray {
  return this.editForm.get('types') as FormArray;
}

get onControlType() {
  return this.editForm.get('life') as FormControl;
}

get onControlDamage() {
  return this.editForm.get('damage') as FormControl;
}
pokemonTypeChecked(type: string, isChecked: boolean) {
  const typesArray = this.formArray;
  if (isChecked) {
    typesArray.push(this.fb.control(type));
  } else {
    const index = typesArray.controls.findIndex(control => control.value === type);
    if (index !== -1) {
      typesArray.removeAt(index);
    }
  }
}
pokemonTypeSelected(type: string) {
  let status = !!this.formArray.controls.find(control => control.value == type);
  return status;
}
pokemonIncrement(attribute: 'life' | 'damage') {
    const controle = this.editForm.get(attribute)
    if (controle?.value) {
      controle.setValue(controle.value+1);
      controle.markAsTouched
      controle.updateValueAndValidity();
  } 
}
pokemonDecrement(attribute: 'life' | 'damage') {
  const controle = this.editForm?.get(attribute);
  if (controle?.value) {
    controle.setValue(controle.value-1);
    controle.markAsTouched();
    controle.updateValueAndValidity();
}
}
onSubmit() {
  const pokemon = this.pokemon();
  if (this.editForm.valid && pokemon) {
    const updatedPokemon= {
      ...pokemon,
      name: this.editForm.get('name')?.value || '',
      life: this.editForm.get('life')?.value || 0,
      damage: this.editForm.get('damage')?.value || 0,
      types: this.formArray.controls.map(control => control.value)
    };
    this.pokemonService.updatePokemon(updatedPokemon).subscribe({
      next: () => {
        this.router.navigate(['/pokemons', this.id]);
      },
      error: (error) => {
        console.error('Error updating Pokemon:', error);
      }
    });
  }
}
}