import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';
import { HeaderComponent } from './components/header/header.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LazyLoadImageModule, LAZYLOAD_IMAGE_HOOKS, ScrollHooks } from 'ng-lazyload-image';
import { ToastrModule } from 'ngx-toastr';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FilterPipe } from './pipes/filter.pipe';


@NgModule({
  declarations: [
    HeaderComponent,
    ConfirmationModalComponent,
    FilterPipe
  ],
  providers: [
    AuthService,
    { provide: LAZYLOAD_IMAGE_HOOKS, useClass: ScrollHooks }
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LazyLoadImageModule,
    BsDropdownModule.forRoot(),
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    InfiniteScrollModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HeaderComponent,
    BsDropdownModule,
    TypeaheadModule,
    CommonModule,
    ConfirmationModalComponent,
    ModalModule,
    LazyLoadImageModule,
    InfiniteScrollModule,
    FilterPipe
  ]
})
export class SharedModule { }
