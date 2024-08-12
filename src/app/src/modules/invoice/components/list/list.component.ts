import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { catchError, map, of } from 'rxjs';

interface Item {
  item: string;
  qty: number;
  rate: number;
  amount: number;
}

interface Invoice {
  id?: number;
  ref: string;
  items: Item[];
  date: Date;
  dueDate: Date;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  invoices: Invoice[] = [];

  constructor(private dbService: NgxIndexedDBService) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.dbService.getAll('invoice').pipe(
      map((data: unknown[]) => data as Invoice[]), 
      catchError((error) => {
        console.error('Error fetching invoices', error);
        return of([] as Invoice[]);
      })
    ).subscribe({
      next: (invoices) => {
        this.invoices = invoices;
      },
      error: (error) => {
        console.error('Error subscribing to invoices', error);
      }
    });
  }

  getItemsList(items: Item[]): string {
    return items.map(item => item.item).join(', ');
  }

  getTotalQty(items: Item[]): number {
    return items.reduce((total, item) => total + item.qty, 0);
  }

  getRatesList(items: Item[]): string {
    return items.map(item => `$${item.rate}`).join(', ');
  }

  getTotalAmount(items: Item[]): number {
    return items.reduce((total, item) => total + item.amount, 0);
  }
}
