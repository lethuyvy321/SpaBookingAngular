import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Staff } from 'src/app/models/staff';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  constructor(
    private dataService: DataService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  public staff: Staff = Object.assign({}, this.dataService.newStaff());
  public submitted = false;
  public token: string = '';
  ngOnInit(): void {
    // Lấy tham số 'token' từ URL khi component được khởi tạo
    this.route.params.subscribe(params => {
      this.token = params['token'];
      console.log('Token:', this.token);
      // Bạn có thể thực hiện các xử lý khác với token ở đây
    });
  }
  public isValidData() {
    if (this.staff.UserName) return true;
    else {
      return false;
    }
  }
  public resetPassword() {
    this.submitted = true;
    console.log('email', this.staff);
    this.dataService.resetPassword(this.staff,this.token).subscribe({
      next: (response) => {
        console.log(response.data);
        console.log('Đổi mật khẩu thành công', response);
        this.messageService.add({
          severity: 'success',
          detail: 'Đổi mật khẩu thành công',
          life: 3000,
          summary: 'Success',
        });
        this.router.navigate(['/login']).then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 100);
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          detail: 'Lỗi!!!',
          life: 3000,
          summary: 'Error',
        });
        console.log('error', error);
      },
    });
  }
}
