from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

app = FastAPI(title="Success Score Predictor")

model = joblib.load("../xgb_pipeline.pkl")

FEATURE_ORDER = [
    "age", "sex", "marital_status", "education_level",
    "income_level", "occupation", "place_of_residence", "nationality",
    "religion", "language_spoken", "household_size", "credit_score",
    "has_outstanding_loans", "num_loans_taken_last_5yrs", "bank_account_access",
    "internet_access", "distance_to_nearest_bank_km", "mobile_money_usage", 
    "employment_status", "has_active_savings_account", "income_growth_by_15%_in_6months",
    "loan_used_for_successful_self_employment", "loan_used_for_child_education",
    "past_funding_recieved", "willing_to_participate_in_CSR", 
    "willing_to_educate_girl_child", "willing_to_give_children_higher_education"
]

class BeneficiaryInput(BaseModel):
    age: int
    sex: str
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
    # bank_account_access: int
    # internet_access: int
    # distance_to_nearest_bank_km: float
    # mobile_money_usage: int
    employment_status: str
    has_active_savings_account: int
    income_growth_by_15percent_in_6months:int 
    loan_used_for_successful_self_employment: int
    loan_used_for_child_education: int
    past_funding_recieved: int
    willing_to_participate_in_CSR: int
    willing_to_educate_girl_child: int
    willing_to_give_children_higher_education:int



def calculate_base_score(data: dict) -> float:
    """Calculate base score on the basis of adjustable demographics"""
    # to do : change the demographic
    # make them adjustable using some stored value
    # add apt loan usage to this itself
    
    score = 0.0
    score += 0.3 if data["sex"] == "Female" else 0
    score += 0.3 if data["place_of_residence"] == "Rural" else 0
    score -= 0.8 * data["past_funding_recieved"]
    score += 0.2 * data["willing_to_participate_in_CSR"] 
    score += 0.2 * data["willing_to_educate_girl_child"]
    score += 0.15 * data["willing_to_give_children_higher_education"]
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
