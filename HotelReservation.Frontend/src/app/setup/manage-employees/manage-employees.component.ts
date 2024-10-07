import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { EmployeeDto } from 'src/proxy/entity-dtos/employee-dto';
import { Roles } from 'src/proxy/enums/roles';
import { EmployeeService } from 'src/proxy/services/employee.service';

@Component({
  selector: 'app-manage-employees',
  standalone: false,
  //imports: [],
  templateUrl: './manage-employees.component.html',
  styleUrl: './manage-employees.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class ManageEmployeesComponent {

  employees: EmployeeDto[] = []

  newEmployee: EmployeeDto = {} as EmployeeDto

  selectedEmployee: EmployeeDto = {} as EmployeeDto

  roles: Roles[] = []

  createModal: any

  editModal: any

  viewModal: any

  deleteSelectedEmployee: number = 0;

  submitted = false;

  cols: any[] = [];

  deleteModal: any

  constructor(private messageService: MessageService,
    private employeeService: EmployeeService
  ){}

  ngOnInit(): void {
    this.roles = Object.values(Roles);

    this.employeeService.getAllList()
    .subscribe(res => {
      this.employees = res
      console.log('employees:',this.employees)
    })
  }

  create(){
    this.newEmployee = {};
    this.createModal = true;
    this.submitted = false;
  }

  edit(employee: EmployeeDto){
    this.selectedEmployee = { ...employee};
    this.editModal = true;
    this.submitted = false;
  }

  view(employee: EmployeeDto){
    this.selectedEmployee = { ...employee};
    this.viewModal = true;
    this.submitted = false;
  }

  delete(id:number){
    this.deleteSelectedEmployee  = id;
    this.deleteModal = true;
    this.submitted = false;
  }

  deleteSelected(){
  }

   confirmDelete(id:number){
    this.employeeService.delete(id)
    .subscribe((res) => {
      console.log(res);
      if(res.isSuccess){
        this.messageService.add({severity:'success', summary: 'Success', detail: res.message , life: 3000});
      }
      else{
        this.messageService.add({severity:'error', summary: 'Error', detail: res.message , life: 3000});
      }
    },
    (error) => {
      this.messageService.add({severity:'error', summary: 'Error', detail: error.message, life: 3000});
    });

    this.hideDialog();
  }

  hideDialog(){
    this.viewModal = false;
    this.createModal = false;
    this.editModal = false;
    this.deleteModal = false;
  }

  save(){
    this.submitted = true;
    this.newEmployee.dateOfBirth = this.newEmployee.dateJoined
    
    this.employeeService.create(this.newEmployee)
    .subscribe((res) => {
      console.log(res);


        this.employees = [...this.employees, res];

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

    this.newEmployee = {} as EmployeeDto;
    this.hideDialog();
  }

  update(){
    this.submitted = true;

    this.employeeService.update(this.selectedEmployee)
    .subscribe((res) => {
      console.log(res);

        var index = this.employees.findIndex(x => x.id === this.selectedEmployee.id);
          this.employees.splice(index, 1);

          this.employees = [...this.employees, res];

        this.messageService.add({
          severity:'success', 
          summary: 'Success', 
          detail: res.message , 
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

    this.selectedEmployee = {} as EmployeeDto;

    this.hideDialog();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
