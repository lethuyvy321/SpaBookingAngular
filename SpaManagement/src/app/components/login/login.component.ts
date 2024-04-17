import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Staff } from 'src/app/models/staff';
import { DataService } from 'src/app/service/data.service';
import { UserStoreService } from 'src/app/service/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private router: Router,
    private messageService: MessageService,
  ) {}
  public staff: Staff = Object.assign({}, this.dataService.newStaff());
  public submitted = false;
  public ngOnInit(): void {}
  public isValidData() {
    if (this.staff.UserName && this.staff.Password) return true;
    else {
      return false;
    }
  }
  public login(): void {
    this.submitted = true;
    if (this.isValidData()) {
      console.log('login', this.staff);
      this.dataService.login(this.staff).subscribe({
        next: (response) => {
          console.log(response.data);
          this.dataService.storeToken(response.data);
          const tokenPayload = this.dataService.decodeToken();
          console.log('Đăng nhập thành công', response);
          this.messageService.add({
            severity: 'success',
            detail: 'Đăng nhập thành công',
            life: 3000,
            summary: 'Success',
          });
          this.router.navigate(['/dashboard']).then(() => {
            setTimeout(() => {
              window.location.reload();
            }, 100);
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            detail: 'Lỗi đăng nhập!!!',
            life: 3000,
            summary: 'Error',
          });
          console.log('error', error);
        },
      });
    }
  }
}
