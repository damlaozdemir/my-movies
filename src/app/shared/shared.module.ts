import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';
import { HeaderComponent } from './header/header.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  providers: [
    AuthService
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BsDropdownModule.forRoot(),
    TypeaheadModule.forRoot(),

  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    BsDropdownModule,
    TypeaheadModule,
    CommonModule
  ]
})
export class SharedModule { }
