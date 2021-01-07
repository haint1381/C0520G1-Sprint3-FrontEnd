import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from '../service/auth/authentication.service';
import {TokenStorageService} from '../service/token-storage/token-storage.service';
import {MatDialog} from '@angular/material/dialog';
import {MessageComponent} from '../component/message/message.component';
import {MessageTimeComponent} from '../component/message-time/message-time.component';
import {User} from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private user1: User;
  private time: number;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private token: TokenStorageService,
              public dialog: MatDialog) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const user = this.token.getUser();

    if (user) {
      this.authenticationService.findBy(this.tokenStorageService.getUser().username).subscribe(next => {
        this.user1 = next;
        this.time = next.timeRemaining;
      }, error => {
      }, () => {
        if (this.time == 0 || this.time == null) {
          this.dialog.open(MessageTimeComponent, {
            disableClose: true
          });
          this.router.navigate(['/']);
          return false;
        } else {
          console.log('aaaaaaaaa');
          // check if route is restricted by role
          if (route.data.roles) {
            for (const role of route.data.roles) {
              if (role.indexOf(user.role) !== -1) {
                return true;
              }
            }
            // role not authorised so redirect to home page
            this.router.navigate(['/']);
            return false;
          }

          // authorised so return true
          return true;
        }
      });
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.dialog.open(MessageComponent, {
        disableClose: true
      });
      this.router.navigate(['/'],);
      return false;
    }
  }

}
