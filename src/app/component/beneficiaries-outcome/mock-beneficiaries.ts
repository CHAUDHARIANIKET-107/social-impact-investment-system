export interface Beneficiary {
  id: number;
  name: string;
  age: number;
  income: number;
  education: string;
  gender: 'Male' | 'Female' | 'Other';
  no_of_dependents: number;
  illness: string | null;
  disabilities: string | null;
  willing_to_csr: boolean;
  aadhar_id: string;
  location: string;
  requested_amount: number;
  purpose: string;
  past_funding_received: number;
  current_dept_amount: number;
  beneficiary_score: number;
  old_income: number;
  current_income: number;
  old_debt: number;
  current_debt: number;
  old_beneficiary_score: number;
  current_beneficiary_score: number;
  benefitted: boolean;
  funds_received: number;
  date_of_funding: string; // ISO date string
}

export const MOCK_BENEFICIARIES: Beneficiary[] = [
  {
    id: 1,
    name: 'Amit Kumar',
    age: 35,
    income: 25000,
    education: 'High School',
    gender: 'Male',
    no_of_dependents: 3,
    illness: null,
    disabilities: 'Partial Blindness',
    willing_to_csr: true,
    aadhar_id: '1234-5678-9012',
    location: 'Delhi',
    requested_amount: 20000,
    purpose: 'Medical Treatment',
    past_funding_received: 0,
    current_dept_amount: 5000,
    beneficiary_score: 82,
    old_income: 18000,
    current_income: 25000,
    old_debt: 12000,
    current_debt: 5000,
    old_beneficiary_score: 60,
    current_beneficiary_score: 82,
    benefitted: true,
    funds_received: 20000,
    date_of_funding: '2023-08-15'
  },
  {
    id: 2,
    name: 'Sunita Sharma',
    age: 42,
    income: 18000,
    education: 'Graduate',
    gender: 'Female',
    no_of_dependents: 2,
    illness: 'Diabetes',
    disabilities: null,
    willing_to_csr: false,
    aadhar_id: '2345-6789-0123',
    location: 'Mumbai',
    requested_amount: 15000,
    purpose: 'Children Education',
    past_funding_received: 5000,
    current_dept_amount: 2000,
    beneficiary_score: 76,
    old_income: 15000,
    current_income: 18000,
    old_debt: 5000,
    current_debt: 2000,
    old_beneficiary_score: 55,
    current_beneficiary_score: 76,
    benefitted: true,
    funds_received: 15000,
    date_of_funding: '2023-07-10'
  },
  {
    id: 3,
    name: 'Rahul Verma',
    age: 29,
    income: 12000,
    education: '10th Pass',
    gender: 'Male',
    no_of_dependents: 4,
    illness: null,
    disabilities: null,
    willing_to_csr: true,
    aadhar_id: '3456-7890-1234',
    location: 'Kolkata',
    requested_amount: 10000,
    purpose: 'Debt Repayment',
    past_funding_received: 0,
    current_dept_amount: 8000,
    beneficiary_score: 68,
    old_income: 10000,
    current_income: 12000,
    old_debt: 12000,
    current_debt: 8000,
    old_beneficiary_score: 50,
    current_beneficiary_score: 68,
    benefitted: true,
    funds_received: 10000,
    date_of_funding: '2023-09-01'
  },
  {
    id: 4,
    name: 'Priya Singh',
    age: 31,
    income: 22000,
    education: 'Postgraduate',
    gender: 'Female',
    no_of_dependents: 1,
    illness: 'Asthma',
    disabilities: null,
    willing_to_csr: false,
    aadhar_id: '4567-8901-2345',
    location: 'Chennai',
    requested_amount: 12000,
    purpose: 'Business Setup',
    past_funding_received: 3000,
    current_dept_amount: 4000,
    beneficiary_score: 74,
    old_income: 18000,
    current_income: 22000,
    old_debt: 7000,
    current_debt: 4000,
    old_beneficiary_score: 58,
    current_beneficiary_score: 74,
    benefitted: true,
    funds_received: 12000,
    date_of_funding: '2023-06-20'
  },
  {
    id: 5,
    name: 'Mohammed Ali',
    age: 50,
    income: 9000,
    education: 'Primary',
    gender: 'Male',
    no_of_dependents: 5,
    illness: 'Heart Disease',
    disabilities: 'Hearing Loss',
    willing_to_csr: false,
    aadhar_id: '5678-9012-3456',
    location: 'Hyderabad',
    requested_amount: 25000,
    purpose: 'Medical Emergency',
    past_funding_received: 0,
    current_dept_amount: 15000,
    beneficiary_score: 88,
    old_income: 7000,
    current_income: 9000,
    old_debt: 20000,
    current_debt: 15000,
    old_beneficiary_score: 65,
    current_beneficiary_score: 88,
    benefitted: true,
    funds_received: 25000,
    date_of_funding: '2023-05-05'
  }
]; 