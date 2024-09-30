import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PaymentDto } from 'src/proxy/entity-dtos/payment-dto';
import { ReservationDto } from 'src/proxy/entity-dtos/reservation-dto';
import { ReservationProductDto } from 'src/proxy/entity-dtos/reservation-product-dto';
import { RoomDto } from 'src/proxy/entity-dtos/room-dto';
import { Country } from 'src/proxy/enums/country';
import { RoomType } from 'src/proxy/enums/room-type';
import { ReservationService } from 'src/proxy/services/reservation.service';
import { RoomService } from 'src/proxy/services/room.service';

@Component({
  selector: 'app-manage-reservations',
  standalone: false,
  //imports: [],
  templateUrl: './manage-reservations.component.html',
  styleUrl: './manage-reservations.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class ManageReservationsComponent {

  reservations: ReservationDto[] = []

  newReservation: ReservationDto = {} as ReservationDto

  newReservationProduct: ReservationProductDto = {} as ReservationProductDto

  selectedReservation: ReservationDto = {} as ReservationDto

  payment: PaymentDto = {} as PaymentDto

  subTotalAmountPaid = 0

  discount = 0

  vat = 0

  totalAmountPaid = 0

  selectedReservationProducts: ReservationProductDto = {} as ReservationProductDto

  deleteSelectedReservation = 0

  countries: Country[] = [];

  roomTypes: RoomType[] = [];

  rooms: RoomDto[] = []

  createBookingModal = false;

  viewBookingModal = false;

  editBookingModal = false;

  deleteModal = false;

  submitted = false;

  cols: any[] = [];

  constructor(public reservationService: ReservationService,
    public roomService: RoomService,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {

    this.countries = Object.values(Country);
    this.roomTypes = Object.values(RoomType)

    this.reservationService.getAllList()
    .subscribe(res => {
      this.reservations = res.data
      console.log('reservations:',this.reservations)
    })

    this.roomService.getAllList()
    .subscribe(res => {
      this.rooms = res.data
      console.log('rooms',this.rooms)
    })
  }

  create() {
    this.newReservation = {} as ReservationDto;
    this.createBookingModal = true;
    this.submitted = false;
  }

  view(reservation: ReservationDto) {
    this.selectedReservation = { ...reservation }
    this.viewBookingModal = true;
    this.submitted = false;
    console.log(reservation)
  }

  edit(reservation: ReservationDto) {
    this.selectedReservation = { ...reservation }
    
      this.editBookingModal = true;
  }

  delete(id: number) {
    this.deleteSelectedReservation = id;
    this.deleteModal = true;
    this.submitted = false;
  }

  hideDialog(){}

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
