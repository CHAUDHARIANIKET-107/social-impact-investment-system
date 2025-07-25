import pandas as pd
import numpy as np
from faker import Faker
import random

fake = Faker()

def generate_success_score(row):
    """Generates a success score by considering normalized info like credit score, history with loan repayment etc"""
    score = 0.0

    # Normalize key variables to small ranges
    if(row['credit_score'] > 0):
        score += 0.2 * (row['credit_score'] - 15) / 485  # range is 0 to 0.2 
    score -= 0.2 * row['has_outstanding_loans']
    score -= 0.05 * row['num_loans_taken_last_5yrs']
    score += 0.35 if row['employment_status'] == 'Full-time' else 0
    score += 0.2 if  row['employment_status'] == 'Part-time' else 0
    score += 0.1 * row['has_active_savings_account']
    score += 0.15 * row['income_growth_by_15percent_in_6months']  
    score += 0.1 * row['loan_used_for_successful_self_employment']
    score += 0.1 * row['loan_used_for_child_education']
    score += 0.3 if row["education_level"] ==  ("Graduate" or "Postgraduate") else 0


    # Add small noise
    score += np.random.normal(0, 0.05)

    # Clip to 0–1
    score = max(0, min(1, score))
    return round(score, 3)

def generate_row():
    """generates data randomly"""
    gender = random.choice(['Male', 'Female', 'Other'])
    income = random.choice([10000, 20000, 30000, 50000, 70000, 100000])
    education_levels = ['None', 'Primary', 'Secondary', 'Graduate', 'Postgraduate']
    religion = random.choice(['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Other'])
    language = random.choice(['Hindi', 'English', 'Bengali', 'Tamil', 'Telugu', 'Marathi'])


    gender = random.choice(['Male', 'Female', 'Other'])
    low_wages = random.choice([0,1])
    if(low_wages != 0):
        income = random.choice([10000, 20000, 30000, 50000, 70000, 100000])
    else:
        income = 0
    education_levels = ['None', 'Primary', 'Secondary', 'Graduate', 'Postgraduate']
    education = random.choice(education_levels)
    religion = random.choice(['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Other'])
    language = random.choice(['Hindi', 'English', 'Bengali', 'Tamil', 'Telugu', 'Marathi'])
    household_size = random.randint(1, 8)
    employment_status = random.choice(["Full-time", "Part-time", "None"])

    # Conditional loan use for self-employment
    if education in ['Graduate', 'Postgraduate']:
        loan_used_for_successful_self_employment = random.choices([1, 0], weights=[0.7, 0.3])[0]
    else:
        loan_used_for_successful_self_employment = random.choice([0, 1])

    # Conditional loan use for child education
    if household_size > 4:
        loan_used_for_child_education = random.choices([1, 0], weights=[0.3, 0.7])[0]
    else:
        loan_used_for_child_education = random.choice([0, 1])

    if employment_status ==  ("Full-time"):
        credit_score = random.randint(300, 500)
    elif employment_status ==  ("Full-time"):
        credit_score = random.int(150, 300)
    else :
        credit_score = 0
        

    row = {
        'age': random.randint(18, 65),
        'sex': gender,
        'marital_status': random.choice(['Single', 'Married', 'Divorced', 'Widowed']),
        'education_level': random.choice(education_levels),
        'income_level': income,
        'occupation': random.choice(['Farmer', 'Teacher', 'Engineer', 'Laborer', 'Self-employed']),
        'place_of_residence': random.choice(['Urban', 'Semi-urban', 'Rural']),
        'nationality': random.choice(['Indian', 'Nepali', 'Bangladeshi']),
        'religion': religion,
        'language_spoken': language,
        'household_size': random.randint(1, 8),

        # Access/inclusion
        # 'bank_account_access': random.choice([0, 1]),
        # 'internet_access': random.choice([0, 1]),
        # 'distance_to_nearest_bank_km': round(random.uniform(0.5, 25.0), 1),
        # 'mobile_money_usage': random.choice([0, 1]),


        'employment_status': employment_status,
        'has_active_savings_account':  random.choice([0,1]),
        'income_growth_by_15percent_in_6months': random.choice([0,1]),
        
        'loan_used_for_successful_self_employment': loan_used_for_successful_self_employment,
        
        'loan_used_for_child_education': loan_used_for_child_education,
               
        'has_outstanding_loans': random.choice([0, 1]),
        'num_loans_taken_last_5yrs': random.randint(0, 5),

        'past_funding_recieved': random.choice([0,1]),
        'willing_to_participate_in_CSR': random.choice([0,1]),
        'willing_to_educate_girl_child': random.choice([0,1]),
        'willing_to_give_children_higher_education': random.choice([0,1]),

        'credit_score': credit_score,
        'low_wages': low_wages

    }

    row['success_score'] = generate_success_score(row)
    return row

# Generate dataset
print("⏳ Generating data...")
rows = [generate_row() for _ in range(50000)]
df = pd.DataFrame(rows)

# Preview stats
print("\n📊 Success Score Distribution:")
print(df['success_score'].describe())

# Save to CSV
df.to_csv("synthetic_beneficiary_data.csv", index=False)
print("\n✅ Dataset saved as 'synthetic_beneficiary_data.csv'")
