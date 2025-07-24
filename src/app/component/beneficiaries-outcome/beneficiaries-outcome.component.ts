import { Component, OnInit } from '@angular/core';
import { MOCK_BENEFICIARIES, Beneficiary } from './mock-beneficiaries';

@Component({
  selector: 'app-beneficiaries-outcome',
  templateUrl: './beneficiaries-outcome.component.html',
  styleUrls: ['./beneficiaries-outcome.component.css']
})
export class BeneficiariesOutcomeComponent implements OnInit {
  beneficiaries: Beneficiary[] = MOCK_BENEFICIARIES;

  // Chart 1: Funds Distribution Trend Over Months
  fundsTrendData: any;
  fundsTrendOptions: any;

  // Chart 2: Income Level Impact Analysis (Before/After)
  incomeImpactData: any;
  incomeImpactOptions: any;

  // Chart 3: Average Debt Reduction
  debtReductionData: any;
  debtReductionOptions: any;

  // Chart 4: Purpose-wise Distribution Pie Chart
  purposePieData: any;
  purposePieOptions: any;

  ngOnInit() {
    this.prepareFundsTrendChart();
    this.prepareIncomeImpactChart();
    this.prepareDebtReductionChart();
    this.preparePurposePieChart();
  }

  prepareFundsTrendChart() {
    // Group by month and sum funds_received
    const monthMap: { [month: string]: number } = {};
    this.beneficiaries.forEach(b => {
      const month = b.date_of_funding.slice(0, 7); // YYYY-MM
      monthMap[month] = (monthMap[month] || 0) + b.funds_received;
    });
    const labels = Object.keys(monthMap).sort();
    const data = labels.map(m => monthMap[m]);
    this.fundsTrendData = {
      labels,
      datasets: [
        {
          label: 'Funds Distributed',
          data,
          backgroundColor: '#42A5F5'
        }
      ]
    };
    this.fundsTrendOptions = {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Funds Distributed (₹)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Month'
          }
        }
      }
    };
  }

  prepareIncomeImpactChart() {
    // Define income ranges
    const ranges = [
      { label: '0-5k', min: 0, max: 5000 },
      { label: '5k-10k', min: 5000, max: 10000 },
      { label: '10k-15k', min: 10000, max: 15000 },
      { label: '15k-20k', min: 15000, max: 20000 },
      { label: '20k-25k', min: 20000, max: 25000 },
      { label: '25k+', min: 25000, max: Infinity }
    ];
    const beforeCounts: number[] = [];
    const afterCounts: number[] = [];
    const labels: string[] = [];
    ranges.forEach(range => {
      const beforeInRange = this.beneficiaries.filter(b => b.old_income >= range.min && b.old_income < range.max);
      const afterInRange = this.beneficiaries.filter(b => b.current_income >= range.min && b.current_income < range.max);
      if (beforeInRange.length > 0 || afterInRange.length > 0) {
        labels.push(range.label);
        beforeCounts.push(beforeInRange.length);
        afterCounts.push(afterInRange.length);
      }
    });
    this.incomeImpactData = {
      labels,
      datasets: [
        {
          label: 'Before Funding',
          data: beforeCounts,
          backgroundColor: '#FFA726'
        },
        {
          label: 'After Funding',
          data: afterCounts,
          backgroundColor: '#66BB6A'
        }
      ]
    };
    this.incomeImpactOptions = {
      responsive: true,
      plugins: { legend: { position: 'top' } },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Beneficiaries'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Income Range'
          }
        }
      }
    };
  }

  prepareDebtReductionChart() {
    // Average before and after debt
    const avgOldDebt = this.beneficiaries.reduce((sum, b) => sum + b.old_debt, 0) / this.beneficiaries.length;
    const avgCurrentDebt = this.beneficiaries.reduce((sum, b) => sum + b.current_debt, 0) / this.beneficiaries.length;
    this.debtReductionData = {
      labels: ['Average Debt Before', 'Average Debt After'],
      datasets: [
        {
          label: 'Debt Amount',
          data: [avgOldDebt, avgCurrentDebt],
          backgroundColor: ['#EF5350', '#29B6F6']
        }
      ]
    };
    this.debtReductionOptions = {
      responsive: true,
      plugins: { legend: { display: false } }
    };
  }

  preparePurposePieChart() {
    // Group purposes into generic categories
    const categoryMap: { [cat: string]: string[] } = {
      Medical: ['Medical Treatment', 'Medical Emergency'],
      Education: ['Children Education'],
      'Loan Repayment': ['Debt Repayment'],
      'Business/Real Estate': ['Business Setup']
    };
    const counts: { [cat: string]: number } = {};
    this.beneficiaries.forEach(b => {
      let found = false;
      for (const cat in categoryMap) {
        if (categoryMap[cat].includes(b.purpose)) {
          counts[cat] = (counts[cat] || 0) + 1;
          found = true;
          break;
        }
      }
      if (!found) {
        counts['Other'] = (counts['Other'] || 0) + 1;
      }
    });
    const labels = Object.keys(counts);
    const data = labels.map(l => counts[l]);
    this.purposePieData = {
      labels,
      datasets: [
        {
          data,
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC', '#FF7043']
        }
      ]
    };
    this.purposePieOptions = {
      responsive: false,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'right' } }
    };
  }
}
