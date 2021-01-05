import {Routes} from '@angular/router';
import {HomePageComponent} from './component/home-page/home-page.component';
import {MyGameComponent} from './component/my-game/my-game.component';
import {AuthGuard} from './helper/auth.guard';

export const CommonRoute: Routes = [
  {path: 'my-game', component: MyGameComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_ADMIN', 'ROLE_USER']},
  }, {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }, {
    path: 'home',
    component: HomePageComponent
  }
];
