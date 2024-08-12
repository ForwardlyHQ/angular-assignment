import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { MatTableDataSource } from '@angular/material/table'; // Import MatTableDataSource

export interface InvoiceItem {
  item: string;
  description: string;
  qty: number;
  rate: number;
  amount: number;
}

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss'],
  providers: [NgxIndexedDBService],
})
export class CreateInvoiceComponent implements OnInit {
  invoiceForm: FormGroup;
  itemsList = [
    'Switches',
    'Wires',
    'Plugs',
    'Fitting Service',
    'Repair Service',
  ];
  netTermsOptions = ['Net 5', 'Net 7', 'Net 10', 'Net 12', 'Net 15'];

  displayedColumns: string[] = [
    'item',
    'description',
    'qty',
    'rate',
    'amount',
    'actions',
  ];
  dataSource = new MatTableDataSource<FormGroup>();

  constructor(
    private fb: FormBuilder,
    private dbService: NgxIndexedDBService,
    private router: Router
  ) {
    this.invoiceForm = this.fb.group({
      invoiceRef: [{ value: '', disabled: true }],
      date: [new Date()],
      terms: ['Net 10'],
      dueDate: [new Date()],
      message: [''],
      items: this.fb.array([this.createItem()]),
    });
  }

  ngOnInit(): void {
    this.updateTableDataSource();
  }

  get items() {
    return this.invoiceForm.get('items') as FormArray;
  }

  createItem(): FormGroup {
    return this.fb.group({
      item: [''],
      description: [''],
      qty: [0, [Validators.required, Validators.min(0)]],
      rate: [0, [Validators.required, Validators.min(0)]],
      amount: [{ value: 0, disabled: true }],
    });
  }

  addItem(): void {
    this.items.push(this.createItem());
    this.updateTableDataSource();
  }

  removeItem(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
      this.updateTableDataSource();
    }
  }

  updateAmount(index: number): void {
    const item = this.items.at(index);
    const qty = item.get('qty')?.value || 0;
    const rate = item.get('rate')?.value || 0;
    item.get('amount')?.setValue(qty * rate, { emitEvent: false });
  }

  getInvoiceTotal(): number {
    return this.items.controls
      .map((control) => control.get('amount')?.value || 0)
      .reduce((acc, value) => acc + value, 0);
  }

  createInvoice(): void {
    const invoiceData = this.invoiceForm.value;
    this.dbService.add('invoice', invoiceData).subscribe({
      next: () => {
        alert('success');
        this.resetForm();
        this.router.navigate(['invoice/list']);
      },
      error: (error) => {
        console.error('Error creating invoice', error);
        alert('Failed to create invoice. Please try again.');
      },
    });
  }

  private resetForm(): void {
    this.invoiceForm.reset();
    this.items.clear();
    this.items.push(this.createItem());
    this.updateTableDataSource();
  }

  private updateTableDataSource(): void {
    this.dataSource.data = this.items.controls as FormGroup[];
  }

  navigateBack(): void {
    this.router.navigate(['/']);
  }
}
