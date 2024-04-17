import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Role } from 'src/app/models/role';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent {
  constructor(
    private dataService: DataService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router,
  ) { }
  public categories: Role[] = [];
  public categoryDialog = false;
  public category: Role = Object.assign({}, this.dataService.newRole());
  public submitted = true;

  public ngOnInit(): void {
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
  public editCategory(category: Role): void {
    console.log('edit ', category);
    this.category = category;
    this.categoryDialog = true;
  }
  public deleteCategory(category: Role): void {
    console.log('delete ', category);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + category.Name + '?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        category.isDeleted = true;
        this.dataService.putRole(category).subscribe({
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
    this.category = Object.assign({}, this.dataService.newRole());
    this.categoryDialog = true;
    this.submitted = false;
  }
  public hideDialog(cancel = true, success = true): void {
    this.submitted = false;
    console.log('hideDialog');
    this.categoryDialog = false;
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
      this.category.Name
    ) {
      return true; 
    } else {
      return false; 
    }
  }
  public saveCategory(): void {
    this.submitted = true;
    if(this.isValidData()){
      console.log("save", this.category);
      if (this.category.id === '') {
        this.dataService.postRole(this.category).subscribe({
          next: response => {
            console.log('Thêm thành công ', response);
            this.categories.push(response);
            this.hideDialog(false, true);
            this.loadCategory();
          },
          error: error => {
            console.log('error', error);
            this.hideDialog(false, false);
          }
        });
      }
      else {
        this.dataService.putRole(this.category).subscribe({
          next: response => {
            console.log('Cập nhât thành công ', response);
            this.hideDialog(false, true);
            this.loadCategory();
          },
          error: error => {
            console.log('error', error);
            this.hideDialog(false, false);
          }
        });
      }
    }
  }
}
