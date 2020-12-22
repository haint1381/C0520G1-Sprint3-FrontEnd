import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageDefaultComponent} from './page-common/page-default/page-default.component';

const routes: Routes = [
  {
    path: '**', component: PageDefaultComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
