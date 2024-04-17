import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Booking } from 'src/app/models/booking';
import { BookingDetail } from 'src/app/models/bookingDetail';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {
  constructor(
    private dataService: DataService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }
  public bookings: Booking[] = [];
  public bookingDialog = false;
  public selectedService = '';
  public booking: Booking = Object.assign({}, this.dataService.newBooking());
  public detail: BookingDetail = Object.assign({}, this.dataService.newBookingDetail());
  public ngOnInit(): void {
    this.loadBooking();
  }
  public loadBooking() {
    this.dataService.getAllBooking().subscribe((response) => {
      if (response.success) {
        this.bookings = response.data;
      } else {
        console.error('Failed to fetch categories');
      }
    });
  };
  public showDetail(bookingID: string) {
    console.log(bookingID);
    this.dataService.getDetailByBookingID(bookingID).subscribe((response) => {
      if (response.success) {
        this.detail = response.data[0];
        console.log(this.detail);
        this.dataService.getServiceById(this.detail.ServiceID).subscribe((response) => {
          this.selectedService = response.data[0].Name;
          console.log(response);
          this.bookingDialog = true;
        });
      } else {
        console.error('Failed to fetch categories');
      }
    });
  }
  public hideDialog(cancel = true, success = true): void {
    console.log('hideDialog');
    this.bookingDialog = false;
  }
}
