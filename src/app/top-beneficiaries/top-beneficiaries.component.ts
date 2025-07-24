import { Component, OnInit } from '@angular/core';
import data from '../../assets/rural_beneficiaries_data.json';

interface Beneficiary {
  id: number;
  name: string;
  age: number;
  income: number;
  education: string;
  gender: string;
  no_of_dependents: number;
  illness: string;
  disabilities: string;
  willing_to_csr: string;
  aadhar_id: number;
  location: string;
  requested_amount: number;
  purpose: string;
  past_funding_received: number;
  current_dept_amount: number;
  beneficiary_score: number;
}

@Component({
  selector: 'app-top-beneficiaries',
  templateUrl: './top-beneficiaries.component.html',
  styleUrls: ['./top-beneficiaries.component.css']
})
export class TopBeneficiariesComponent implements OnInit {
  beneficiaries: Beneficiary[] = [];
  topN: number = 10;
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number = 1;
  displayedBeneficiaries: Beneficiary[] = [];

  ngOnInit(): void {
    this.beneficiaries = (data as Beneficiary[]).sort((a, b) => b.beneficiary_score - a.beneficiary_score);
    this.updateDisplay();
  }

  updateDisplay(): void {
    const topList = this.beneficiaries.slice(0, this.topN);
    this.totalPages = Math.ceil(topList.length / this.pageSize);
    this.currentPage = Math.min(this.currentPage, this.totalPages) || 1;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedBeneficiaries = topList.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplay();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplay();
    }
  }

  onTopNChange(): void {
    this.currentPage = 1;
    this.updateDisplay();
  }
}
