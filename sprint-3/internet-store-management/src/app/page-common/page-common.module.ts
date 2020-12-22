import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageDefaultComponent} from './page-default/page-default.component';
import {LoginComponent} from './login/login.component';

@NgModule({
  declarations: [PageDefaultComponent, LoginComponent],
  imports: [
    CommonModule,
  ]
})
export class PageCommonModule { }
