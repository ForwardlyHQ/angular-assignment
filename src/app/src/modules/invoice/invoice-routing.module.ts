import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateInvoiceComponent } from './components/create-invoice/create-invoice.component';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [
  {
    path: 'create',
    component: CreateInvoiceComponent,
    data: { title: 'Create Invoice' },
  },
  {
    path: 'list',
    component: ListComponent,
    data: { title: 'List Invoice' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceRoutingModule {}
