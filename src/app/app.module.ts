import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutes } from './app.routes';
import { CommonWrapperComponent } from './layout/common-wrapper/common-wrapper.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';

const dbConfig: DBConfig = {
  name: 'myInvoiceDb',
  version: 1,
  objectStoresMeta: [
    {
      store: 'invoice',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'ref', keypath: 'ref', options: { unique: false } },
        { name: 'itemName', keypath: 'itemName', options: { unique: false } },
        { name: 'qty', keypath: 'qty', options: { unique: false } },
        { name: 'rate', keypath: 'rate', options: { unique: false } },
        { name: 'date', keypath: 'date', options: { unique: false } },
        { name: 'dueDate', keypath: 'dueDate', options: { unique: false } },
      ],
    },
  ],
};

@NgModule({
  declarations: [AppComponent, CommonWrapperComponent, SidebarComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    AppRoutes,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    NgxIndexedDBModule.forRoot(dbConfig),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
