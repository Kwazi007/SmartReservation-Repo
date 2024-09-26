import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageReservationsComponent } from './manage-reservations/manage-reservations.component';
import { ManageReportsComponent } from './manage-reports/manage-reports.component';

const routes: Routes = [
  {
    path: 'manage-reservations',
    component: ManageReservationsComponent
  },
  {
    path: 'manage-reports',
    component: ManageReportsComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
