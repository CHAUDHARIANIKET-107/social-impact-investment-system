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
  
  export interface TopBeneficiary {
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
  }
  
  export const MOCK_TOP_BENEFICIARIES: TopBeneficiary[] = [
    { id: 1, name: 'Amit Kumar', age: 34, income: 12000, education: 'Graduate', gender: 'Male', no_of_dependents: 2, illness: null, disabilities: null, willing_to_csr: true, aadhar_id: '1234-5678-9001', location: 'Delhi', requested_amount: 20000, purpose: 'Medical Treatment', past_funding_received: 0, current_dept_amount: 5000, beneficiary_score: 85 },
    { id: 2, name: 'Sunita Sharma', age: 29, income: 15000, education: 'Postgraduate', gender: 'Female', no_of_dependents: 1, illness: 'Diabetes', disabilities: null, willing_to_csr: false, aadhar_id: '1234-5678-9002', location: 'Mumbai', requested_amount: 18000, purpose: 'Children Education', past_funding_received: 2000, current_dept_amount: 3000, beneficiary_score: 78 },
    { id: 3, name: 'Rahul Verma', age: 41, income: 9000, education: '10th Pass', gender: 'Male', no_of_dependents: 3, illness: null, disabilities: 'Partial Blindness', willing_to_csr: true, aadhar_id: '1234-5678-9003', location: 'Kolkata', requested_amount: 15000, purpose: 'Debt Repayment', past_funding_received: 0, current_dept_amount: 7000, beneficiary_score: 80 },
    { id: 4, name: 'Priya Singh', age: 36, income: 17000, education: 'Graduate', gender: 'Female', no_of_dependents: 2, illness: 'Asthma', disabilities: null, willing_to_csr: false, aadhar_id: '1234-5678-9004', location: 'Chennai', requested_amount: 22000, purpose: 'Business Setup', past_funding_received: 3000, current_dept_amount: 4000, beneficiary_score: 82 },
    { id: 5, name: 'Mohammed Ali', age: 50, income: 8000, education: 'Primary', gender: 'Male', no_of_dependents: 4, illness: 'Heart Disease', disabilities: 'Hearing Loss', willing_to_csr: false, aadhar_id: '1234-5678-9005', location: 'Hyderabad', requested_amount: 25000, purpose: 'Medical Emergency', past_funding_received: 0, current_dept_amount: 15000, beneficiary_score: 88 },
    { id: 6, name: 'Rina Das', age: 28, income: 11000, education: 'Graduate', gender: 'Female', no_of_dependents: 1, illness: null, disabilities: null, willing_to_csr: true, aadhar_id: '1234-5678-9006', location: 'Bangalore', requested_amount: 12000, purpose: 'Children Education', past_funding_received: 1000, current_dept_amount: 2000, beneficiary_score: 75 },
    { id: 7, name: 'Suresh Patel', age: 45, income: 9500, education: 'High School', gender: 'Male', no_of_dependents: 3, illness: 'Hypertension', disabilities: null, willing_to_csr: false, aadhar_id: '1234-5678-9007', location: 'Ahmedabad', requested_amount: 14000, purpose: 'Debt Repayment', past_funding_received: 0, current_dept_amount: 6000, beneficiary_score: 77 },
    { id: 8, name: 'Meena Gupta', age: 32, income: 16000, education: 'Postgraduate', gender: 'Female', no_of_dependents: 2, illness: null, disabilities: null, willing_to_csr: true, aadhar_id: '1234-5678-9008', location: 'Pune', requested_amount: 17000, purpose: 'Business Setup', past_funding_received: 2000, current_dept_amount: 3500, beneficiary_score: 81 },
    { id: 9, name: 'Vikram Singh', age: 39, income: 10500, education: 'Graduate', gender: 'Male', no_of_dependents: 2, illness: null, disabilities: null, willing_to_csr: false, aadhar_id: '1234-5678-9009', location: 'Lucknow', requested_amount: 13000, purpose: 'Medical Treatment', past_funding_received: 0, current_dept_amount: 4000, beneficiary_score: 79 },
    { id: 10, name: 'Anjali Yadav', age: 27, income: 12500, education: 'Graduate', gender: 'Female', no_of_dependents: 1, illness: null, disabilities: null, willing_to_csr: true, aadhar_id: '1234-5678-9010', location: 'Jaipur', requested_amount: 11000, purpose: 'Children Education', past_funding_received: 500, current_dept_amount: 1500, beneficiary_score: 76 },
    { id: 11, name: 'Deepak Joshi', age: 38, income: 13500, education: 'High School', gender: 'Male', no_of_dependents: 2, illness: 'Diabetes', disabilities: null, willing_to_csr: false, aadhar_id: '1234-5678-9011', location: 'Kanpur', requested_amount: 16000, purpose: 'Debt Repayment', past_funding_received: 0, current_dept_amount: 5000, beneficiary_score: 78 },
    { id: 12, name: 'Kavita Rao', age: 31, income: 14500, education: 'Graduate', gender: 'Female', no_of_dependents: 2, illness: null, disabilities: null, willing_to_csr: true, aadhar_id: '1234-5678-9012', location: 'Nagpur', requested_amount: 15000, purpose: 'Business Setup', past_funding_received: 1000, current_dept_amount: 2500, beneficiary_score: 80 },
    { id: 13, name: 'Rajesh Kumar', age: 44, income: 10000, education: '10th Pass', gender: 'Male', no_of_dependents: 3, illness: null, disabilities: null, willing_to_csr: false, aadhar_id: '1234-5678-9013', location: 'Indore', requested_amount: 12000, purpose: 'Medical Emergency', past_funding_received: 0, current_dept_amount: 7000, beneficiary_score: 83 },
    { id: 14, name: 'Shalini Mehta', age: 30, income: 15500, education: 'Postgraduate', gender: 'Female', no_of_dependents: 2, illness: null, disabilities: null, willing_to_csr: true, aadhar_id: '1234-5678-9014', location: 'Bhopal', requested_amount: 18000, purpose: 'Children Education', past_funding_received: 1500, current_dept_amount: 2000, beneficiary_score: 77 },
    { id: 15, name: 'Arun Nair', age: 37, income: 9500, education: 'High School', gender: 'Male', no_of_dependents: 2, illness: 'Asthma', disabilities: null, willing_to_csr: false, aadhar_id: '1234-5678-9015', location: 'Thiruvananthapuram', requested_amount: 14000, purpose: 'Debt Repayment', past_funding_received: 0, current_dept_amount: 6000, beneficiary_score: 79 },
    { id: 16, name: 'Pooja Sinha', age: 26, income: 12000, education: 'Graduate', gender: 'Female', no_of_dependents: 1, illness: null, disabilities: null, willing_to_csr: true, aadhar_id: '1234-5678-9016', location: 'Patna', requested_amount: 11000, purpose: 'Business Setup', past_funding_received: 500, current_dept_amount: 1500, beneficiary_score: 75 },
    { id: 17, name: 'Sanjay Reddy', age: 42, income: 13000, education: 'Graduate', gender: 'Male', no_of_dependents: 3, illness: null, disabilities: null, willing_to_csr: false, aadhar_id: '1234-5678-9017', location: 'Vijayawada', requested_amount: 16000, purpose: 'Medical Treatment', past_funding_received: 0, current_dept_amount: 4000, beneficiary_score: 81 },
    { id: 18, name: 'Neha Jain', age: 33, income: 14000, education: 'Postgraduate', gender: 'Female', no_of_dependents: 2, illness: null, disabilities: null, willing_to_csr: true, aadhar_id: '1234-5678-9018', location: 'Surat', requested_amount: 17000, purpose: 'Children Education', past_funding_received: 1000, current_dept_amount: 2500, beneficiary_score: 78 },
    { id: 19, name: 'Rakesh Yadav', age: 40, income: 10500, education: '10th Pass', gender: 'Male', no_of_dependents: 2, illness: null, disabilities: null, willing_to_csr: false, aadhar_id: '1234-5678-9019', location: 'Ranchi', requested_amount: 13000, purpose: 'Debt Repayment', past_funding_received: 0, current_dept_amount: 4000, beneficiary_score: 80 },
    { id: 20, name: 'Anita Pillai', age: 35, income: 15000, education: 'Graduate', gender: 'Female', no_of_dependents: 2, illness: null, disabilities: null, willing_to_csr: true, aadhar_id: '1234-5678-9020', location: 'Kochi', requested_amount: 15000, purpose: 'Business Setup', past_funding_received: 1000, current_dept_amount: 2500, beneficiary_score: 82 },
    { id: 21, name: 'Manoj Singh', age: 48, income: 9000, education: 'High School', gender: 'Male', no_of_dependents: 3, illness: 'Hypertension', disabilities: null, willing_to_csr: false, aadhar_id: '1234-5678-9021', location: 'Varanasi', requested_amount: 14000, purpose: 'Medical Emergency', past_funding_received: 0, current_dept_amount: 6000, beneficiary_score: 84 },
    { id: 22, name: 'Ritu Sharma', age: 29, income: 16000, education: 'Postgraduate', gender: 'Female', no_of_dependents: 1, illness: null, disabilities: null, willing_to_csr: true, aadhar_id: '1234-5678-9022', location: 'Agra', requested_amount: 17000, purpose: 'Children Education', past_funding_received: 2000, current_dept_amount: 3500, beneficiary_score: 79 },
    { id: 23, name: 'Ajay Kumar', age: 39, income: 10500, education: 'Graduate', gender: 'Male', no_of_dependents: 2, illness: null, disabilities: null, willing_to_csr: false, aadhar_id: '1234-5678-9023', location: 'Meerut', requested_amount: 13000, purpose: 'Medical Treatment', past_funding_received: 0, current_dept_amount: 4000, beneficiary_score: 81 },
    { id: 24, name: 'Sneha Roy', age: 27, income: 12500, education: 'Graduate', gender: 'Female', no_of_dependents: 1, illness: null, disabilities: null, willing_to_csr: true, aadhar_id: '1234-5678-9024', location: 'Howrah', requested_amount: 11000, purpose: 'Children Education', past_funding_received: 500, current_dept_amount: 1500, beneficiary_score: 77 },
    { id: 25, name: 'Gopal Das', age: 38, income: 13500, education: 'High School', gender: 'Male', no_of_dependents: 2, illness: 'Diabetes', disabilities: null, willing_to_csr: false, aadhar_id: '1234-5678-9025', location: 'Durgapur', requested_amount: 16000, purpose: 'Debt Repayment', past_funding_received: 0, current_dept_amount: 5000, beneficiary_score: 79 },
    { id: 26, name: 'Nisha Singh', age: 31, income: 14500, education: 'Graduate', gender: 'Female', no_of_dependents: 2, illness: null, disabilities: null, willing_to_csr: true, aadhar_id: '1234-5678-9026', location: 'Jamshedpur', requested_amount: 15000, purpose: 'Business Setup', past_funding_received: 1000, current_dept_amount: 2500, beneficiary_score: 81 },
    { id: 27, name: 'Ramesh Kumar', age: 44, income: 10000, education: '10th Pass', gender: 'Male', no_of_dependents: 3, illness: null, disabilities: null, willing_to_csr: false, aadhar_id: '1234-5678-9027', location: 'Asansol', requested_amount: 12000, purpose: 'Medical Emergency', past_funding_received: 0, current_dept_amount: 7000, beneficiary_score: 83 },
    { id: 28, name: 'Shreya Mehta', age: 30, income: 15500, education: 'Postgraduate', gender: 'Female', no_of_dependents: 2, illness: null, disabilities: null, willing_to_csr: true, aadhar_id: '1234-5678-9028', location: 'Siliguri', requested_amount: 18000, purpose: 'Children Education', past_funding_received: 1500, current_dept_amount: 2000, beneficiary_score: 78 },
    { id: 29, name: 'Vikas Jain', age: 37, income: 9500, education: 'High School', gender: 'Male', no_of_dependents: 2, illness: 'Asthma', disabilities: null, willing_to_csr: false, aadhar_id: '1234-5678-9029', location: 'Bhilai', requested_amount: 14000, purpose: 'Debt Repayment', past_funding_received: 0, current_dept_amount: 6000, beneficiary_score: 80 },
    { id: 30, name: 'Poonam Sahu', age: 26, income: 12000, education: 'Graduate', gender: 'Female', no_of_dependents: 1, illness: null, disabilities: null, willing_to_csr: true, aadhar_id: '1234-5678-9030', location: 'Raipur', requested_amount: 11000, purpose: 'Business Setup', past_funding_received: 500, current_dept_amount: 1500, beneficiary_score: 76 }
  ]; 