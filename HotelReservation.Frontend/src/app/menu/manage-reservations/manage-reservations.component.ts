import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CurrencyDto } from 'src/proxy/entity-dtos/currency-dto';
import { PaymentDto } from 'src/proxy/entity-dtos/payment-dto';
import { ReservationDto } from 'src/proxy/entity-dtos/reservation-dto';
import { ReservationProductDto } from 'src/proxy/entity-dtos/reservation-product-dto';
import { RoomDto } from 'src/proxy/entity-dtos/room-dto';
import { Country } from 'src/proxy/enums/country';
import { PaymentMethod } from 'src/proxy/enums/payment-method';
import { RoomType } from 'src/proxy/enums/room-type';
import { CurrencyService } from 'src/proxy/services/currency.service';
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

  selectedRoom: RoomDto = {} as RoomDto

  payment: PaymentDto = {} as PaymentDto

  newPayment: PaymentDto = {} as PaymentDto

  subTotalAmountPaid = 0

  totalAmountPaid = 0

  discount = 0

  totalUSD = 0

  viewTotalUSD = 0

  vat = 0

  checkInDate: Date

  checkOutDate: Date

  selectedReservationProducts: ReservationProductDto = {} as ReservationProductDto

  deleteSelectedReservation = 0

  countries: Country[] = [];

  roomTypes: RoomType[] = [];

  rooms: RoomDto[] = []

  filtereRooms:RoomDto[] = []

  currencies: CurrencyDto[] = []

  paymentMethods: PaymentMethod[] = []

  createBookingModal = false;

  viewBookingModal = false;

  editBookingModal = false;

  deleteModal = false;

  activeIndex: number = 0;

  creationTime = new Date()

  submitted = false;

  cols: any[] = [];

  constructor(public reservationService: ReservationService,
    public roomService: RoomService,
    private messageService: MessageService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {

    this.countries = Object.values(Country);
    this.roomTypes = Object.values(RoomType)
    this.paymentMethods = Object.values(PaymentMethod)

    this.currencyService.getAllList()
    .subscribe(res => {
      this.currencies = res
      console.log('currencies',this.currencies)
    })

    this.reservationService.getAllList()
    .subscribe(res => {
      this.reservations = res
      this.reservations.forEach(res => {
        this.viewTotalUSD = res.totalAmount
      })
      console.log('total:',this.viewTotalUSD)
      console.log('reservations:',this.reservations)
    })

    this.roomService.getAllList()
    .subscribe(res => {
      console.log('rooms',res)
      this.rooms = res
      this.filtereRooms = this.rooms.filter(x => x.isBooked == false)
      console.log('rooms',this.rooms)
    })
  }

  create() {
    this.newReservation = {} as ReservationDto;
    this.createBookingModal = true;
    this.submitted = false;
  }

  addProduct(){
    this.newReservationProduct.reservationId = 0
    this.newReservationProduct.roomId = this.newReservationProduct.room.id
    this.selectedRoom = this.newReservationProduct.room
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

  createPayment(){
    this.newPayment.creationTime = new Date().toISOString()
    this.newPayment.currencyId = this.newPayment.currency.id
    if (!Array.isArray(this.newReservation.payments)) {
      this.newReservation.payments = [];
    }
  this.newReservation.payments = [... this.newReservation.payments!, this.newPayment];
  this.newReservation.payments.forEach(payment => {
    this.totalAmountPaid += payment.amount
  })
  console.log('payments:',this.newReservation.payments)
  this.newPayment = {}
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

  onChange(){
    console.log('enter')
    this.filtereRooms = this.rooms.filter(x => x.roomType == this.newReservationProduct.roomType && x.isBooked == false)
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
    this.selectedRoom.isBooked = true
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
    this.updateRoom()
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

  updateRoom() {
    this.submitted = true;
    this.selectedRoom.isBooked = true
    console.log('enterer')
  
    this.roomService.update(this.selectedRoom)
      .subscribe(
        res => {
          console.log(res);
  
          // Find the index of the employee we want to update
          const index = this.rooms.findIndex(x => x.id === this.selectedRoom.id);
  
          // Remove the old employee from the array
          this.rooms.splice(index, 1);
  
          // Push the updated employee into the array
          this.rooms = [...this.rooms, res];
  
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
    this.selectedRoom = {} as RoomDto;
  
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
