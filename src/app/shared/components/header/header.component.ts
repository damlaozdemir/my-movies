import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@model/user.model';
import { ConfirmationModalComponent } from '@shared/components/confirmation-modal/confirmation-modal.component';
import { AuthService } from 'app/services/auth.service';
import { UserService } from 'app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;
  user: User;
  @ViewChild(ConfirmationModalComponent) confirmationModalComponent: ConfirmationModalComponent;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private toastrService: ToastrService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  logout(): void {
    this.authService.logout();
  }

  deleteAccount(): void {
    this.userService.deleteUser().subscribe(
      data => {
        this.toastrService.success('Hesabınız başarıyla silindi');
        this.logout();
      }
    )
  }

  openConfirmationModal(): void {
    this.confirmationModalComponent.openModal();
  }
}
