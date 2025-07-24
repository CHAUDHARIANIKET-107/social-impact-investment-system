import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ChartModule } from 'primeng/chart';
import { TabViewModule } from 'primeng/tabview';
import { CommonModule } from '@angular/common';
import { WelfareOutcomeComponent } from './welfare-outcome/welfare-outcome.component';
import { TopBeneficiariesComponent } from './top-beneficiaries/top-beneficiaries.component';

@NgModule({
  declarations: [AppComponent, WelfareOutcomeComponent, TopBeneficiariesComponent],
  imports: [
    BrowserModule,
    FormsModule,
    TableModule,
    DropdownModule,
    ChartModule,
    TabViewModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}