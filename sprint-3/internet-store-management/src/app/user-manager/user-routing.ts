import {Routes} from '@angular/router';
import {UserListComponent} from './component/user-list/user-list.component';
// import {AuthGuard} from '../office-common/helper/auth.guard';


export const UserRoutes: Routes = [
  {
    path: 'user-list',
    component: UserListComponent,
    // canActivate: [AuthGuard],
    // data: {roles: ['ROLE_ADMIN']}
  },
];
