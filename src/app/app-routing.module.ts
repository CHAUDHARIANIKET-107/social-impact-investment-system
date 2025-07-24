import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestorDashboardComponent } from './component/investor-dashboard/investor-dashboard.component';
import { DemographicDataComponent } from './component/demographic-data/demographic-data.component';
import { BeneficiariesOutcomeComponent } from './component/beneficiaries-outcome/beneficiaries-outcome.component';

const routes: Routes = [
  { path: 'dashboard', component: InvestorDashboardComponent },
  { path: 'upload', component: DemographicDataComponent },
  { path: 'outcome', component: BeneficiariesOutcomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
