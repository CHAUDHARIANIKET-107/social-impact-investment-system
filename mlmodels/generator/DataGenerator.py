import pandas as pd
import numpy as np
from faker import Faker
import random

fake = Faker()

def generate_success_score(row):
    score = 0.4

    # Normalize key variables to small ranges
    score += (row['credit_score'] - 300) / 1100  # Normalized to [0, ~0.5]
    score += 0.1 if row['bank_account_access'] else -0.05
    score += 0.1 if row['internet_access'] else -0.05
    score -= 0.02 * row['has_outstanding_loans']
    score -= 0.01 * row['num_loans_taken_last_5yrs']
    score -= (row['monthly_expenses'] / 25000) * 0.2   # Scaled down max penalty
    score -= (row['existing_monthly_liabilities'] / 20000) * 0.2  # Same here
    score += 0.2 * row['loan_repayment_history_score']  # Range: 0.0 to 1.0 → 0.0 to 0.2

    # Add small noise
    score += np.random.normal(0, 0.05)

    # Clip to 0–1
    score = max(0, min(1, score))
    return round(score, 3)

def generate_row():
    gender = random.choice(['Male', 'Female', 'Other'])
    income = random.choice([10000, 20000, 30000, 50000, 70000, 100000])
    education_levels = ['None', 'Primary', 'Secondary', 'Graduate', 'Postgraduate']
    religion = random.choice(['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Other'])
    language = random.choice(['Hindi', 'English', 'Bengali', 'Tamil', 'Telugu', 'Marathi'])

    row = {
        'age': random.randint(18, 65),
        'sex': gender,
        'race_ethnicity': random.choice(['Asian', 'Black', 'White', 'Latino', 'Mixed']),
        'marital_status': random.choice(['Single', 'Married', 'Divorced', 'Widowed']),
        'education_level': random.choice(education_levels),
        'income_level': income,
        'occupation': random.choice(['Farmer', 'Teacher', 'Engineer', 'Laborer', 'Self-employed']),
        'place_of_residence': random.choice(['Urban', 'Semi-urban', 'Rural']),
        'nationality': random.choice(['Indian', 'Nepali', 'Bangladeshi']),
        'religion': religion,
        'language_spoken': language,
        'household_size': random.randint(1, 8),

        # Credit/financial data
        'credit_score': random.randint(300, 850),
        'has_outstanding_loans': random.choice([0, 1]),
        'num_loans_taken_last_5yrs': random.randint(0, 5),
        'loan_repayment_history_score': round(random.uniform(0.0, 1.0), 2),
        'monthly_expenses': random.randint(3000, 25000),
        'existing_monthly_liabilities': random.randint(0, 20000),

        # Access/inclusion
        'bank_account_access': random.choice([0, 1]),
        'internet_access': random.choice([0, 1]),
        'distance_to_nearest_bank_km': round(random.uniform(0.5, 25.0), 1),
        'mobile_money_usage': random.choice([0, 1])
    }

    row['success_score'] = generate_success_score(row)
    return row

# Generate dataset
print("⏳ Generating data...")
rows = [generate_row() for _ in range(10000)]
df = pd.DataFrame(rows)

# Preview stats
print("\n📊 Success Score Distribution:")
print(df['success_score'].describe())

# Save to CSV
df.to_csv("synthetic_beneficiary_data.csv", index=False)
print("\n✅ Dataset saved as 'synthetic_beneficiary_data.csv'")
