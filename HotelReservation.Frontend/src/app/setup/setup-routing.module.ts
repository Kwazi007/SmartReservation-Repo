import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageRoomsComponent } from './manage-rooms/manage-rooms.component';
import { ManageEmployeesComponent } from './manage-employees/manage-employees.component';
import { ManageCurrenciesComponent } from './manage-currencies/manage-currencies.component';

const routes: Routes = [
  {
    path: 'manage-rooms',
    component: ManageRoomsComponent
  },
  {
    path: 'manage-employees',
    component: ManageEmployeesComponent
  },
  {
    path: 'manage-currencies',
    component: ManageCurrenciesComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule { }
