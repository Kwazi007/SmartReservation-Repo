import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Menu',
                items: [
                    { label: 'Reservations', icon: 'pi pi-fw pi-ticket', routerLink: ['/menu/manage-reservations'] },
                    { label: 'Reports', icon: 'pi pi-fw pi-book', routerLink: ['/menu/manage-reports'] }
                ]
            },
            {
                label: 'Setup',
                items: [
                    { label: 'Manage Rooms', icon: 'pi pi-fw pi-building', routerLink: ['/setup/manage-rooms'] },
                    { label: 'Manage Employees', icon: 'pi pi-fw pi-users', routerLink: ['/setup/manage-employees'] },
                    { label: 'Manage Currencies', icon: 'pi pi-fw pi-dollar', routerLink: ['/setup/manage-currencies'] }
                ]
            }
        ];
    }
}
