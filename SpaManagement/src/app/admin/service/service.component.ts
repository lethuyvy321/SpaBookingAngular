import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Service } from 'src/app/models/service';
import { TypeService } from 'src/app/models/typeService';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent {
  constructor(
    private dataService: DataService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }
  public services: Service[] = [];
  public serviceDialog = false;
  public categories: TypeService[] = [];
  public selectedCategory: TypeService = Object.assign({}, this.dataService.newTypeService());
  public service: Service = Object.assign({}, this.dataService.newService());
  public submitted = false;
  public ngOnInit(): void {
    this.loadService();
    this.loadCategory();
  }
  public loadCategory() {
    this.dataService.getAllTypeservice().subscribe((response) => {
      if (response.success) {
        this.categories = response.data;
      } else {
        console.error('Failed to fetch categories');
      }
    });
  }
  public loadService() {
    this.dataService.getAllService().subscribe((response) => {
      if (response.success) {
        this.services = response.data;
      } else {
        console.error('Failed to fetch categories');
      }
    });
  }
  public editService(service: Service): void {
    console.log('edit ', service);
    this.service = service;
    this.selectedCategory.id = service.TypeID;
    this.serviceDialog = true;
  }
  public deleteService(service: Service): void {
    console.log('delete ', service);
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + service.Name + '?',
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        service.isDelete = true;
        this.dataService.putService(service).subscribe({
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
    this.service = Object.assign({}, this.dataService.newService());
    this.serviceDialog = true;
  }
  public hideDialog(cancel = true, success = true): void {
    this.submitted = false;
    console.log('hideDialog');
    this.serviceDialog = false;
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
      this.service.Name &&
      this.selectedCategory.id &&
      this.service.Description &&
      this.service.Price
    ) {
      return true;
    }
    return false
  }
  public saveService(): void {
    this.submitted = true;
    if (this.isValidData()) {
      console.log("save", this.service);
      if (this.service.id === '') {
        this.service.TypeID = this.selectedCategory.id;
        this.dataService.postService(this.service).subscribe({
          next: response => {
            console.log('Thêm thành công ', response);
            this.loadService();
            this.hideDialog(false, true);
          },
          error: error => {
            console.log('error', error);
            this.hideDialog(false, false);
          }
        });
      }
      else {
        this.dataService.putService(this.service).subscribe({
          next: response => {
            console.log('Cập nhât thành công ', response);
            this.loadService();
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
