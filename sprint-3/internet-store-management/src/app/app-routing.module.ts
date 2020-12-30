import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageDefaultComponent} from './page-common/page-default/page-default.component';
import {LoginComponent} from './page-common/login/login.component';

const routes: Routes = [
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
