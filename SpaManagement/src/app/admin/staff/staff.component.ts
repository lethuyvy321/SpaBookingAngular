import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Role } from 'src/app/models/role';
import { Staff } from 'src/app/models/staff';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss']
})
export class StaffComponent {
  constructor(
    private dataService: DataService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }
  public staffs: Staff[] = [];
  public staffDialog = false;
  public categories: Role[] = [];
  public selectedCategory: Role = Object.assign({}, this.dataService.newRole());
  public staff: Staff = Object.assign({}, this.dataService.newStaff());
  public submitted = false;
  public ngOnInit(): void {
    this.loadStaff();
    this.loadCategory();
  }
  public loadCategory() {
    this.dataService.getAllRole().subscribe((response) => {
      if (response.success) {
        this.categories = response.data;
      } else {
        console.error('Failed to fetch categories');
      }
    });
  }
  public loadStaff() {
    this.dataService.getAllStaff().subscribe((response) => {
      if (response.success) {
        this.staffs = response.data;
      } else {
        console.error('Failed to fetch categories');
      }
    });
  }
  public editStaff(staff: Staff): void {
    console.log('edit ', staff);
    this.staff = staff;
    this.selectedCategory.id = staff.RoleID;
    this.staffDialog = true;
  }
  public deleteStaff(staff: Staff): void {
    console.log('delete ', staff);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + staff.FullName + '?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        staff.Deleted = true;
        this.dataService.putStaff(staff).subscribe({
          next: data => {
            console.log('Xóa thành công', data);
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Xóa thành công!', life: 3000 });
          },
          error: error => {
            console.log('Xóa không thành công', error);
          }
        })
      },
    });
  }
  public openNew(): void {
    console.log('openNew');
    this.staff = Object.assign({}, this.dataService.newStaff());
    this.staffDialog = true;
  }
  public hideDialog(cancel = true, success = true): void {
    this.submitted = false;
    console.log('hideDialog');
    this.staffDialog = false;
    if (cancel) {
      this.messageService.add({
        severity: 'info', summary: 'Cancel', detail: 'Thêm không thành công!', life: 3000
      });
    } else if (success) {
      this.messageService.add({
        severity: 'success', summary: 'Successful', detail: 'Thành công!', life: 3000
      });
    } else {
      this.messageService.add({
        severity: 'error', summary: 'Error', detail: 'Lỗi!', life: 3000
      });
    }
  }
  public isValidData(): boolean {
    // Kiểm tra tất cả các trường dữ liệu
    if (
      this.staff.FullName &&
      this.selectedCategory.id &&
      this.staff.UserName &&
      this.staff.Email &&
      this.staff.CCCD &&
      this.staff.Address 
    ) {
      return true;
    }
    return false
  }
  public saveStaff(): void {
    this.submitted = true;
    if (this.isValidData()) {
      console.log("save", this.staff);
      if (this.staff.id === '') {
        this.staff.RoleID = this.selectedCategory.id;
        this.dataService.postStaff(this.staff).subscribe({
          next: response => {
            console.log('Thêm thành công ', response);
            this.loadStaff();
            this.hideDialog(false, true);
          },
          error: error => {
            console.log('error', error);
            this.hideDialog(false, false);
          }
        });
      }
      else {
        this.dataService.putStaff(this.staff).subscribe({
          next: response => {
            console.log('Cập nhât thành công ', response);
            this.loadStaff();
            this.hideDialog(false, true);
          },
          error: error => {
            console.log('error', error);
            this.hideDialog(false, false);
          }
        });
      }
    }
  }
  public changeCategory(cate: any) {
    this.selectedCategory = cate;
    console.log('category dang chon', this.selectedCategory);
  }
}
