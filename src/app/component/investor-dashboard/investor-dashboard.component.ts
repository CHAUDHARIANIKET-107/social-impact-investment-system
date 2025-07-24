import { Component } from '@angular/core';

@Component({
  selector: 'app-investor-dashboard',
  templateUrl: './investor-dashboard.component.html',
  styleUrls: ['./investor-dashboard.component.css']
})
export class InvestorDashboardComponent {
  totalFundAmount: any = 50000;

  profitPercentage: any = 12;
  managementFees: any = 0.5;

  beneficiaryShare: any = 75;
  bankShare: any = 25;

  profitPieData = {
    labels: ['Beneficiaries', 'Investors', 'Bank'],
    datasets: [
      {
        data: [4312500, 1437500, 250000],
        backgroundColor: [
          '#059669', // Beneficiaries
          '#1e3a8a', // Bank
          '#d97706'  // Fees
        ],
        borderColor: '#fff',
        borderWidth: 2
      }
    ]
  };
}
