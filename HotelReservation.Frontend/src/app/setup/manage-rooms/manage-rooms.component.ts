import { Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { RoomDto } from 'src/proxy/entity-dtos/room-dto';
import { RoomType } from 'src/proxy/enums/room-type';
import { RoomService } from 'src/proxy/services/room.service';

@Component({
  selector: 'app-manage-rooms',
  standalone: false,
  //imports: [],
  templateUrl: './manage-rooms.component.html',
  styleUrl: './manage-rooms.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class ManageRoomsComponent {

  rooms: RoomDto[] = []

  newRoom: RoomDto = {} as RoomDto

  selectedRoom: RoomDto = {} as RoomDto

  deleteSelectedRoom = 0

  createModal: any

  editModal: any

  viewModal: any

  submitted = false;

  cols: any[] = [];

  roomTypes: RoomType[] = [];

  deleteModal: any

  constructor(private messageService: MessageService,
    private roomService: RoomService
  ){}

  ngOnInit(): void {

    this.roomTypes = Object.values(RoomType)

    this.roomService.getAllList()
    .subscribe(res => {
      this.rooms = res
      console.log('rooms:',this.rooms)
    })
  }

  create(){
    this.newRoom = {};
    this.createModal = true;
    this.submitted = false;
  }

  edit(room: RoomDto){
    this.selectedRoom = { ...room};
    this.editModal = true;
    this.submitted = false;
  }

  view(room: RoomDto){
    this.selectedRoom = { ...room};
    this.viewModal = true;
    this.submitted = false;
  }

  delete(id:number){
    console.log(id)
    this.deleteSelectedRoom  = id;
    this.deleteModal = true;
    this.submitted = false;
  }

  deleteSelected(){
  }

   confirmDelete(id:number){
    this.roomService.delete(id)
    .subscribe((res) => {
      console.log(res);
        this.messageService.add({severity:'success', summary: 'Success', life: 3000});
    });

    this.roomService.getAllList()
    .subscribe(res => {
      this.rooms = res
      console.log('rooms:',this.rooms)
    })

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
    this.newRoom.isBooked = false;
    
    this.roomService.create(this.newRoom)
    .subscribe((res) => {
      console.log(res);

      // if(res.isSuccess){
        this.rooms = [...this.rooms, res];

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

    this.newRoom = {} as RoomDto;
    this.hideDialog();
  }

  update(){
    this.submitted = true;

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

    this.selectedRoom = {} as RoomDto;

    this.hideDialog();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
