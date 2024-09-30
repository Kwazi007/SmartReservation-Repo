import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from '../../api/product';
import { ProductService } from '../../service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { RoomDto } from 'src/proxy/entity-dtos/room-dto';
import { PaymentDto } from 'src/proxy/entity-dtos/payment-dto';
import { ReservationDto } from 'src/proxy/entity-dtos/reservation-dto';
import { RoomService } from 'src/proxy/services/room.service';
import { PaymentService } from 'src/proxy/services/payment.service';
import { ReservationService } from 'src/proxy/services/reservation.service';
import { RoomType } from 'src/proxy/enums/room-type';
import { ReservationProductDto } from 'src/proxy/entity-dtos/reservation-product-dto';
import { ReservationProductsService } from 'src/proxy/services/reservation-products.service';

@Component({
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    rooms: RoomDto[] = []

    payments: PaymentDto[] = []

    reservations: ReservationDto[] = []

    reservationProducts: ReservationProductDto[] = []

    availableRooms = 0

    standardRooms = 0

    deluxeRooms = 0

    bookedRooms = 0

    revenue = 0

    revenuePercentage = 0

    guests = 0

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    constructor(private productService: ProductService,
         public layoutService: LayoutService,
         public roomService: RoomService,
         public paymentService: PaymentService,
         public reservationService: ReservationService,
         public reservationProductService: ReservationProductsService
        ) 
         {
        this.subscription = this.layoutService.configUpdate$
        .pipe(debounceTime(25))
        .subscribe((config) => {
            this.initChart();
        });
    }

    ngOnInit() {
        this.initChart();
        this.productService.getProductsSmall().then(data => this.products = data);

        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];

        this.reservationProductService.getAllList()
        .subscribe(res => {
            this.reservationProducts = res.data
            console.log('product',this.reservationProducts)
        })

        this.reservationService.getAllList()
        .subscribe(res => {
            this.reservations = res.data
            let currentReservation = this.reservations.filter(x => new Date(x.checkInDate) <= new Date() && new Date(x.checkOutDate) >= new Date())
            currentReservation.forEach(res => {
                this.guests += res.adultPax + res.childPax
            })
            console.log('reservations:',this.reservations)
        })

        this.roomService.getAllList()
        .subscribe(res => {
            this.rooms = res.data
            let bookedRoomsArray = this.rooms.filter(x => x.isBooked == true)
            this.bookedRooms = bookedRoomsArray.length
            this.deluxeRooms = (bookedRoomsArray.filter(x => x.roomType == RoomType.DOUBLEDELUXE || x.roomType == RoomType.SINGLEDELUXE)).length
            let availableRoomsArray = this.rooms.filter(x => x.isBooked == false)
            this.standardRooms = (bookedRoomsArray.filter(x => x.roomType == RoomType.DOUBLE || x.roomType == RoomType.SINGLE)).length
            this.availableRooms = availableRoomsArray.length
            console.log('rooms:',this.rooms)
        })

        this.paymentService.getAllList()
        .subscribe(res => {
            this.payments = res.data
            let lastRevenue = 0
            let currentPayments = this.payments.filter(x => new Date(x.creationTime).getMonth() == new Date().getMonth())
            currentPayments.forEach(payment => {
                this.revenue += payment.amount
            })
            let lastPayments = this.payments.filter(x => new Date(x.creationTime).getMonth() == (new Date().getMonth() - 1))
            lastPayments.forEach(payment => {
                lastRevenue += payment.amount
            })
            this.revenuePercentage = (((this.revenue - lastRevenue)/lastRevenue)*100)       
            console.log('payments:', this.payments)
        })
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
