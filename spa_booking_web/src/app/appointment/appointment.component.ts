import { Component } from '@angular/core';
import { DataServiceService } from '../dataservice/data-service.service';
import { Router } from '@angular/router';
import { Booking } from '../models/booking';
import { Service } from '../models/service';
import { Client } from '../models/client';
import { ToastrService } from 'ngx-toastr';
import { BookingDetail } from '../models/detail';
import * as moment from 'moment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent {
  constructor(
    private dataService: DataServiceService,
    private router: Router,
    private toastr: ToastrService
  ) { }
  public booking: Booking = Object.assign({}, this.dataService.newBooking());
  public detail: BookingDetail = Object.assign({}, this.dataService.newDetail());
  public client: Client = Object.assign({}, this.dataService.newClient());
  public services: Service[] = [];
  public submitted = false;
  public selectedServiceId: string = '';
  public selectedTimeSlot: string = '';
  public minDate = moment(new Date()).format('YYYY-MM-DD') ;
  public ngOnInit(): void {
    this.loadService();
  }
  public isValidData(): boolean {
    // Kiểm tra tất cả các trường dữ liệu
    if (
      this.booking.Date &&
      this.booking.Time &&
      this.client.SDT &&
      this.client.FullName
    ) {
      return true;
    }
    return false
  }
  public loadService() {
    this.dataService.getAllService().subscribe((response) => {
      if (response.success) {
        this.services = response.data;
        console.log(this.services);
      } else {
        console.error('Failed to fetch categories');
      }
    });
  }
  public getClient(phone: string) {
    this.dataService.getClientByPhone(phone).subscribe((response) => {
      console.log(response);
      this.client = response.data[0];
      console.log(this.client);
      this.booking.FullName = this.client.FullName;
      this.booking.ClientID = this.client._id;
      this.dataService.postBooking(this.booking).subscribe((response) => {
        if (response.success) {
          this.booking = response.data;
          console.log(this.booking);
          this.detail.BookingID = this.booking.id;
          this.detail.ServiceID = this.selectedServiceId;
          this.detail.Price = this.services.filter(service => service.id === this.selectedServiceId)[0].Price;
          console.log(this.detail);
          this.dataService.postBookingdetail(this.detail).subscribe((response) => {
            console.log('success detail', response);
              this.toastr.success('Bạn đã đặt lịch thành công.', 'Success');
          });
        }
      });
      console.log(this.selectedServiceId);

    }, (error) => {
      console.log("lỗi");
      this.toastr.error('Khách hàng không tồn tại.', 'Error');
      // this.client.Email = 'aaa';
      // this.client.UserName = 'aaa';
      // this.client.Password = '123';
      // this.dataService.postClient(this.client).subscribe((response) => {
      //   if (response.success) {
      //     this.services = response.data;
      //     console.log(this.services);
      //   } else {
      //     console.error('Failed to fetch categories');
      //   }
      // });
    });
  }
  public onServiceSelected(serviceId: string) {
    this.selectedServiceId = serviceId;
    // Có thể thực hiện các xử lý khác ở đây với giá trị đã chọn
  }
  public saveBooking(): void {
    console.log(this.client.SDT);
    this.submitted = true;
    if (this.isValidData()) {
      this.getClient(this.client.SDT);
    }
  }
}
