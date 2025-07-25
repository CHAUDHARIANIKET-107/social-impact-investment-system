import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvestorDashboardComponent } from './component/investor-dashboard/investor-dashboard.component';
import { DemographicDataComponent } from './component/demographic-data/demographic-data.component';
import { BeneficiariesOutcomeComponent } from './component/beneficiaries-outcome/beneficiaries-outcome.component';
import { FinLitProgComponent } from './component/fin-lit-prog/fin-lit-prog.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: InvestorDashboardComponent },
  { path: 'upload', component: DemographicDataComponent },
  { path: 'outcome', component: BeneficiariesOutcomeComponent },
  { path: 'fin-lit-prog', component: FinLitProgComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
