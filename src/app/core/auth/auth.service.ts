import { Inject, Injectable, signal } from "@angular/core";
import { delay, Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
readonly #isLoggedIn = signal(false);
readonly isLoggedIn = this.#isLoggedIn.asReadonly();
login(username: string, password: string): Observable<boolean> {
    const auth = username === 'pikachu' && password === 'pikachu';
    this.#isLoggedIn.set(auth);
    return of(auth).pipe(delay(1000));
}

}