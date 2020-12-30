import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageDefaultComponent} from './page-default/page-default.component';
import {LoginComponent} from './login/login.component';
import {RouterTestingModule} from '@angular/router/testing';

@NgModule({
  declarations: [PageDefaultComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterTestingModule,
  ]
})
export class PageCommonModule { }
