from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

app = FastAPI(title="Success Score Predictor")

model = joblib.load("../xgb_pipeline.pkl")

FEATURE_ORDER = [
    "age", "sex", "race_ethnicity", "marital_status", "education_level",
    "income_level", "occupation", "place_of_residence", "nationality",
    "religion", "language_spoken", "household_size", "credit_score",
    "has_outstanding_loans", "num_loans_taken_last_5yrs", "loan_repayment_history_score",
    "monthly_expenses", "existing_monthly_liabilities", "bank_account_access",
    "internet_access", "distance_to_nearest_bank_km", "mobile_money_usage"
]

class BeneficiaryInput(BaseModel):
    age: int
    sex: str
    race_ethnicity: str
    marital_status: str
    education_level: str
    income_level: int
    occupation: str
    place_of_residence: str
    nationality: str
    religion: str
    language_spoken: str
    household_size: int
    credit_score: int
    has_outstanding_loans: int
    num_loans_taken_last_5yrs: int
    loan_repayment_history_score: float
    monthly_expenses: int
    existing_monthly_liabilities: int
    bank_account_access: int
    internet_access: int
    distance_to_nearest_bank_km: float
    mobile_money_usage: int

def calculate_base_score(data: dict) -> float:
    score = 0.0
    score += 0.08 if data["sex"] == "Female" else 0
    score += 0.05 if data["education_level"] in {"Graduate", "Postgraduate"} else 0
    score += 0.05 if data["income_level"] >= 50000 else 0
    score += 0.03 if data["place_of_residence"] == "Urban" else 0
    score += 0.02 if data["household_size"] <= 3 else -0.01
    return score

def prepare_model_input(data: dict) -> pd.DataFrame:
    return pd.DataFrame([data])

@app.post("/predict")
def predict_success_score(input_data: BeneficiaryInput):
    data = input_data.dict()

    base_score = calculate_base_score(data)

    model_input = prepare_model_input(data)
    model_score = float(model.predict(model_input)[0])

    final_score = round(min(1.0, 0.3 * base_score + 0.7 * model_score), 3)

    return {
        "predicted_success_score": final_score,
        "base_score_used": round(base_score, 3),
        "raw_model_score": round(model_score, 3)
    }
