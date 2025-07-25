import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-investor-dashboard',
  templateUrl: './investor-dashboard.component.html',
  styleUrls: ['./investor-dashboard.component.css']
})
export class InvestorDashboardComponent {
  ngOnInit() {
    this.calculateAll();
  }

  calculateAll() {
    this.beneficiariesAmount = (this.beneficiaryShare / 100) * this.totalFundAmount;
    this.totalReturn = this.beneficiariesAmount + this.bankAmount + this.investorsAmount;
    this.managementFeesAmount = (this.managementFees / 100) * this.totalFundAmount;
    this.netProfitInvestors = this.totalReturn - this.managementFeesAmount;
    this.csrProfitShareAmount = (this.csrProfitShare / 100) * this.totalFundAmount;
    this.updatePieChart();
    this.onRecalculate();
  }
  onRecalculate() {
    // Example: Refresh pie chart data and log values
    
    console.log('Recalculated values:');
    this.profitamount = this.totalFundAmount / 100 * this.profitPercentage;
    this.managementfeesamount = (this.totalFundAmount / 100) * this.managementFees;
    this.csrProfitshareamount = (this.profitamount/100) * this.csrProfitShare;
    this.beneficiaryfundpool = this.csrProfitshareamount + this.managementfeesamount;
    this.totalReturn = this.profitamount;
    this.managementFeesAmount = (this.totalFundAmount/100) *2.5
    this.netProfitInvestors = this.totalReturn - this.managementFeesAmount;
    this.beneficiariesAmount = this.beneficiaryfundpool * 0.8;
    this.bankAmount = this.beneficiaryfundpool * 0.2;
    this.bondamount = this.beneficiaryfundpool;

    this.updatePieChart();
  }
  //totalReturn: number = 6000000;
  //managementFeesAmount: number = 250000;
  //netProfitInvestors: number = 5750000;
  totalFundAmount: any = 50000;
  profitamount: any = 10;
  managementfeesamount: any = 0.5;
  profitPercentage: any = 12;
  managementFees: any = 0.5;
  csrProfitshareamount = 60;

  beneficiaryShare: any = 80;
  bankShare: any = 20;
  bondamount: number = 1000000;
  csrProfitShare=1

  //beneficiariesAmount: number = 4312500;
  bankAmount: number = 1437500;
  investorsAmount: number = 4312500;
  beneficiariesAmount = (this.beneficiaryShare / 100) * this.totalFundAmount;
  totalReturn = this.profitPercentage;
  managementFeesAmount = (this.managementFees / 100) * this.totalFundAmount;
  netProfitInvestors: number = this.totalReturn - this.managementFeesAmount;
  //profitPercentage = (this.netProfitInvestors / this.totalFundAmount) * 100;
  beneficiaryfundpool = 310;
  csrProfitShareAmount = (this.csrProfitShare / 100) * this.totalFundAmount;
  

  profitPieData = {
    labels: ['Beneficiaries', 'Bank', 'Bond'],
    datasets: [
      {
        data: [this.beneficiariesAmount, this.bankAmount, this.bondamount],
        backgroundColor: [
          '#059669', // Beneficiaries
          '#1e3a8a', // Bank
          '#d97706'  // Investors
        ],
        borderColor: '#fff',
        borderWidth: 2
      }
    ]
  };

  updatePieChart() {
    this.profitPieData.datasets[0].data = [
      this.beneficiariesAmount,
      this.bankAmount,
      this.bondamount
    ];
  }
}
