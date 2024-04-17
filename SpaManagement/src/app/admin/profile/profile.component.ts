import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Staff } from 'src/app/models/staff';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(private dataService: DataService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router) {}
  public staffDialog = false;
  public submitted = false;
  public confirmPassword = '';
  public newPassword = '';
  public oldPassword = '';
  public staff: Staff = Object.assign({}, this.dataService.newStaff());
  public ngOnInit(): void {
    this.loadstaff();
  }
  public loadstaff() {
    this.dataService.getStaffById(this.dataService.decodeToken().id).subscribe((response) => {
      if (response.success) {
        this.staff = response.data[0];
        console.log(this.staff);
      } else {
        console.error('Failed to fetch categories');
      }
    });
  }
  public changePass(){
    
  }
}
