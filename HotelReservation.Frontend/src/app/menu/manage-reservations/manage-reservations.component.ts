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

  totalUSD = 0

  vat = 0

  checkInDate: Date

  checkOutDate: Date

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

  activeIndex: number = 0;

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
      this.reservations = res
      console.log('reservations:',this.reservations)
    })

    this.roomService.getAllList()
    .subscribe(res => {
      this.rooms = res
      console.log('rooms',this.rooms)
    })
  }

  create() {
    this.newReservation = {} as ReservationDto;
    this.createBookingModal = true;
    this.submitted = false;
  }

  addProduct(){
    this.newReservationProduct.reservation_Id = 0
    this.newReservationProduct.roomNo = this.newReservationProduct.room.id
    this.newReservationProduct.unitPrice = this.newReservationProduct.room.rate
    this.newReservationProduct.totalAmount = ((this.newReservationProduct.adultPax * this.newReservationProduct.unitPrice)+(this.newReservationProduct.childPax*this.newReservationProduct.unitPrice))
    this.totalUSD += this.newReservationProduct.totalAmount
    console.log('res products:',this.newReservationProduct)
    if (!Array.isArray(this.newReservation.reservationProducts)) {
      this.newReservation.reservationProducts = [];
    }
  this.newReservation.reservationProducts = [... this.newReservation.reservationProducts!, this.newReservationProduct];
  console.log('products:',this.newReservation.reservationProducts)
  this.newReservationProduct = {}
  }

  clearProducts(){
    this.newReservationProduct = {}
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

  Save(){
    this.newReservation.adultPax = 0
    this.newReservation.childPax = 0
    this.newReservation.totalAmount = 0
    this.newReservation.reservationProducts.forEach(res => {
      this.newReservation.adultPax += res.adultPax
      this.newReservation.childPax += res.childPax
      this.newReservation.totalAmount += res.totalAmount
    })
    console.log('res:',this.newReservation)
    this.submitted = true;
    
    this.reservationService.create(this.newReservation)
    .subscribe((res) => {
      console.log(res);


        this.reservations = [...this.reservations, res];

        this.messageService.add({
          severity:'success', 
          summary: 'Success', 
          life: 3000
        });
    },
    (error) => {
      this.messageService.add({
        severity:'error', 
        summary: 'Error', 
        detail: error.message, 
        life: 3000});
    });

    this.newReservation = {} as ReservationDto;
    this.hideDialog();
  }

  update() {
    this.submitted = true;
    this.selectedReservation.checkInDate = this.checkInDate.toISOString()
    this.selectedReservation.checkOutDate = this.checkOutDate.toISOString()
  
    this.reservationService.update(this.selectedReservation)
      .subscribe(
        res => {
          console.log(res);
  
          // Find the index of the employee we want to update
          const index = this.reservations.findIndex(x => x.id === this.selectedReservation.id);
  
          // Remove the old employee from the array
          this.reservations.splice(index, 1);
  
          // Push the updated employee into the array
          this.reservations = [...this.reservations, res];
  
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
            life: 3000
          });
        },
        error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message,
            life: 3000
          });
        }
      );
  
    // Reset the selected employee
    this.selectedReservation = {} as ReservationDto;
  
    // Hide the dialog
    this.hideDialog();
  }

  hideDialog(){
    this.deleteModal = false;
    this.createBookingModal = false;
    this.editBookingModal = false;
    this.viewBookingModal = false;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
