import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';
import { TabViewModule } from 'primeng/tabview';
import { CommonModule } from '@angular/common';
import { InvestorDashboardComponent } from './component/investor-dashboard/investor-dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { DemographicDataComponent } from './component/demographic-data/demographic-data.component';
import { BeneficiariesOutcomeComponent } from './component/beneficiaries-outcome/beneficiaries-outcome.component';
import { FinLitProgComponent } from './component/fin-lit-prog/fin-lit-prog.component';
import { HomeComponent } from './component/home/home.component';
import { Table, TableModule } from 'primeng/table';

@NgModule({
  declarations: [AppComponent, 
    InvestorDashboardComponent, 
    DemographicDataComponent, BeneficiariesOutcomeComponent, FinLitProgComponent, HomeComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AgGridModule,
    DropdownModule,
    ChartModule,
    TabViewModule,
    CommonModule,
    AppRoutingModule,
    TableModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}