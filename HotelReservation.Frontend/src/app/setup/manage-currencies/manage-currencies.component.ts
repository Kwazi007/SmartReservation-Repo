import { Component } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CurrencyDto } from 'src/proxy/entity-dtos/currency-dto';
import { CurrencyService } from 'src/proxy/services/currency.service';

@Component({
  selector: 'app-manage-currencies',
  standalone: false,
  //simports: [],
  templateUrl: './manage-currencies.component.html',
  styleUrl: './manage-currencies.component.scss',
  providers: [ConfirmationService, MessageService]
})
export class ManageCurrenciesComponent {

  currencies: CurrencyDto[] = []

  newCurrency: CurrencyDto = {} as CurrencyDto

  selectedCurrency: CurrencyDto = {} as CurrencyDto

  deleteSelectedCurrency = 0

  createModal: any

  editModal: any

  viewModal: any

  deleteselectedCurrency: number = 0;

  submitted = false;

  cols: any[] = [];

  deleteModal: any

  constructor(private messageService: MessageService,
    private currencyService: CurrencyService
  ){}

  ngOnInit(): void {

    this.currencyService.getAllList()
    .subscribe(res => {
      this.currencies = res
      console.log('currencies:',this.currencies)
    })
  }

  create(){
    this.newCurrency = {};
    this.createModal = true;
    this.submitted = false;
  }

  edit(currency: CurrencyDto){
    this.selectedCurrency = { ...currency};
    this.editModal = true;
    this.submitted = false;
  }

  view(currency: CurrencyDto){
    this.selectedCurrency = { ...currency};
    this.viewModal = true;
    this.submitted = false;
  }

  delete(id:number){
    console.log(id)
    this.deleteSelectedCurrency  = id;
    this.deleteModal = true;
    this.submitted = false;
  }

  deleteSelected(){
  }

   confirmDelete(id:number){
    this.currencyService.delete(id)
    .subscribe((res) => {
      console.log(res);
        this.messageService.add({severity:'success', summary: 'Success', life: 3000});
    });

    this.currencyService.getAllList()
    .subscribe(res => {
      this.currencies = res
      console.log('currencies:',this.currencies)
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
    
    this.currencyService.create(this.newCurrency)
    .subscribe((res) => {
      console.log(res);

      // if(res.isSuccess){
        this.currencies = [...this.currencies, res];

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

    this.newCurrency = {} as CurrencyDto;
    this.hideDialog();
  }

  update(){
    this.submitted = true;

    this.currencyService.update(this.selectedCurrency)
    .subscribe((res) => {
      console.log(res);

        var index = this.currencies.findIndex(x => x.id === this.selectedCurrency.id);
          this.currencies.splice(index, 1);

          this.currencies = [...this.currencies, res];

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

    this.selectedCurrency = {} as CurrencyDto;

    this.hideDialog();
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

}
