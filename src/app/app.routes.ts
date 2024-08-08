import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonWrapperComponent } from './layout/common-wrapper/common-wrapper.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'invoice/create',
    pathMatch: 'full',
  },
  {
    path: '',
    component: CommonWrapperComponent,
    children: [
      {
        path: 'invoice',
        loadChildren: () =>
          import('./src/modules/invoice/invoice.module').then(
            (m) => m.InvoiceModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'invoice/create',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutes {}
