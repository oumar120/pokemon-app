import { NgFor, NgIf } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { PokemonListService } from '../services/data.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PokemonList } from '../models/data';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorForm } from '../error-form/error-form';
import { Color } from '../color.directive';

@Component({
  selector: 'app-pokemon-add',
  imports: [ReactiveFormsModule, ErrorForm,RouterLink,NgFor],
  templateUrl: './pokemon-add.html',
  styleUrl: './pokemon-add.css'
})
export class PokemonAdd {
pokemonService = inject(PokemonListService);
fb = inject(FormBuilder);
router = inject(Router);

editForm: FormGroup = this.fb.group({
  name: ['',[Validators.required]],
  picture: ['',[Validators.required]],
  life: [10,[Validators.required, Validators.min(10),Validators.max(30)]],
  damage: [1,[Validators.required, Validators.min(1),Validators.max(30)]],
  types: this.fb.array([new FormControl('Normal')], Validators.required)
});
constructor() {
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
get pokemonPicture(){
  return this.editForm.get('picture') as FormControl
}
get pokemonName(){
  return this.editForm.get('name') as FormControl
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
  const createdAt = new Date().toISOString()
  this.editForm.addControl('created',new FormControl(createdAt))
  const color = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
  this.editForm.addControl('color',new FormControl(color[Math.floor(Math.random() * color.length)]))
    const pokemon: any = this.editForm.value;
    this.pokemonService.createPokemon(pokemon).subscribe({
      next: (pokemon) => {
        this.router.navigate(['/pokemons',pokemon.id]);
      },
      error: (error) => {
        console.error('Error lors de la creation d\'un Pokemon:', error);
      }
  })
}
}
