import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styles: ``
})
export class Login {
  route = inject(Router);
  readonly login = signal('');
  readonly password = signal('');
  readonly message = signal('vous etes deconnecté! utiliser username=pikachu et password=pikachu pour vous connecter');
  readonly authService =inject(AuthService);

  onLogin(event: Event) {
    event.preventDefault();
    this.message.set(`Tentative de connexion...`);
    this.authService.login(this.login(), this.password()).subscribe({
      next: (isLoggedIn: boolean) => {
      if(!isLoggedIn) {
         this.message.set('les identifiants saisis sont incorrect, réessayez');
          this.login.set('');
          this.password.set('');
          return;
      }
      this.route.navigate(['/']);
    }
  })
}
}
