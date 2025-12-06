import { Directive, input, ElementRef, HostListener, inject, Renderer2, OnInit, AfterViewInit } from '@angular/core';
import { PokemonListService } from './services/data.service';
import { PokemonList } from './models/data';

@Directive({
  selector: '[appColor]'
})
export class Color implements OnInit {
  pokemon = input<any>();
  private el = inject(ElementRef).nativeElement;
  private renderer = inject(Renderer2);
  private elt!: HTMLElement;
  private service = inject(PokemonListService);
  constructor() { }
  ngOnInit(): void {
    
    if(this.el.tagName==="DIV"){
      this.elt = this.el.querySelector(".divImg");
    }else{
      console.log(this.pokemon());
      this.renderer.setStyle(this.el, 'background-color', this.service.getPokemonColor(this.pokemon()));
    }
  }
  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.removeClass(this.elt, 'bg-light');
    const pokemon = this.pokemon();
    if(pokemon) {
      this.el.style.backgroundColor = this.service.getPokemonColor(pokemon);
    }
    this.el.style.border = '2px solid green';
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.addClass(this.elt, 'bg-light');
    this.el.style.backgroundColor = '';
    this.el.style.border = '';
  }
}

