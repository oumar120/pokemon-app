import { inject} from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";

export const AuthGuard:CanActivateFn = (): boolean => {
   const authService = inject(AuthService);
   const router = inject(Router);
   console.log("AuthGuard called");
   if (!authService.isLoggedIn()) {
        router.navigate(['/login']);
        return false;
   }
   return true;
    
}
