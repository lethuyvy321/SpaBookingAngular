import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Staff } from 'src/app/models/staff';
import { DataService } from 'src/app/service/data.service';
import { UserStoreService } from 'src/app/service/user-store.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  constructor(
    private dataService: DataService,
    private messageService: MessageService,
  ) { }
  public staff: Staff = Object.assign({}, this.dataService.newStaff());
  public submitted = false;
  public ngOnInit(): void { }
  public isValidData() {
    if (this.staff.UserName) return true;
    else {
      return false;
    }
  }
  public sendMail() {
    this.submitted = true;
    console.log('email', this.staff);
    this.dataService.sendmail(this.staff).subscribe({
      next: (response) => {
        console.log(response.data);
        console.log('Gửi mail thành công', response);
        this.messageService.add({
          severity: 'success',
          detail: 'Gửi mail thành công',
          life: 3000,
          summary: 'Success',
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
