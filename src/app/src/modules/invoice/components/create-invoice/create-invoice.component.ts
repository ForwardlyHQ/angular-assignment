import { Component } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

export interface PeriodicElement {
  item: string;
  description: string;
  qtyHours: string;
  rate: string;
  amount: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    item: 'Machine Operations',
    description: 'Machine Ops Labor Work Hours',
    qtyHours: '198',
    rate: '26.00',
    amount: '5,148.00',
    action: '',
  },
  {
    item: 'Machine Operations',
    description: 'Machine Ops Labor Work Hours',
    qtyHours: '1',
    rate: '0.00',
    amount: '0.00',
    action: '',
  },
];

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.scss',
  providers: [NgxIndexedDBService],
})
export class CreateInvoiceComponent {
  displayedColumns: string[] = [
    'item',
    'description',
    'qtyHours',
    'rate',
    'amount',
    'action',
  ];
  dataSource = ELEMENT_DATA;

  constructor(private dbService: NgxIndexedDBService) {}

  createInvoice() {
    this.dbService
      .add('invoice', [
        {
          itemName: 'Machine Operations',
          qty: '1',
          rate: '10',
          date: '1/8/2024',
          dueDate: '10/8/2024',
        },
      ])
      .subscribe((result) => {
        console.log('result: ', result);
      });
  }
}
