import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ReservationDto } from 'src/proxy/entity-dtos/reservation-dto';
import { ReservationProductDto } from 'src/proxy/entity-dtos/reservation-product-dto';
import { ReservationService } from 'src/proxy/services/reservation.service';

@Component({
  selector: 'app-manage-reports',
  standalone: false,
  //imports: [],
  templateUrl: './manage-reports.component.html',
  styleUrl: './manage-reports.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class ManageReportsComponent {

  reservations: ReservationDto[] = []

  filteredReservations: ReservationDto[] = []

  checkInDate = new Date

  checkOutDate = new Date

  submitted = false

  reportModal = false

  constructor(
    public reservationService: ReservationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {

    this.reservationService.getAllList()
    .subscribe(res => {
      this.reservations = res
      console.log('res',this.reservations)
    })
  }

  filterRes(){
    console.log('entered')
    this.filteredReservations = this.reservations.filter(x => new Date(x.checkInDate) >= this.checkInDate && new Date(x.checkOutDate) <= this.checkOutDate)
    console.log('filtered',this.filteredReservations)
    this.reportModal = true
  }

}
