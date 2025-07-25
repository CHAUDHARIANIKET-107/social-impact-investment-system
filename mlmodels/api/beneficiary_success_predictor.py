from typing import List

import requests

from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd
import pickle
from sentence_transformers import SentenceTransformer
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains import LLMChain
from langchain.chat_models import ChatOpenAI
import numpy as np

with open("../faiss_index.pkl", "rb") as f:
    index, corpus = pickle.load(f)

embedder = SentenceTransformer("all-MiniLM-L6-v2")

app = FastAPI(title="Success Score Predictor")

MISTRAL_URL = "http://localhost:11434/api/generate"

def retrieve_context(query: str, k: int = 3) -> str:
    vector = embedder.encode([query])
    D, I = index.search(np.array(vector), k)
    return "\n---\n".join(corpus[i] for i in I[0])

model = joblib.load("../xgb_pipeline.pkl")

llm = ChatOpenAI(
    base_url="http://localhost:11434/v1",
    api_key="fake-key",
    model="mistral"
)

FEATURE_ORDER = [
    "age", "sex", "race_ethnicity", "marital_status", "education_level",
    "income_level", "occupation", "place_of_residence", "nationality",
    "religion", "language_spoken", "household_size", "credit_score",
    "has_outstanding_loans", "num_loans_taken_last_5yrs", "loan_repayment_history_score",
    "monthly_expenses", "existing_monthly_liabilities", "bank_account_access",
    "internet_access", "distance_to_nearest_bank_km", "mobile_money_usage"
]

class ChatInput(BaseModel):
    message: str


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

@app.post("/bulk_predict")
def bulk_predict_success_scores(input_list: List[BeneficiaryInput]):
    results = []

    for input_data in input_list:
        data = input_data.dict()
        base_score = calculate_base_score(data)
        model_input = prepare_model_input(data)
        model_score = float(model.predict(model_input)[0])
        final_score = round(min(1.0, 0.3 * base_score + 0.7 * model_score), 3)

        results.append({
            "predicted_success_score": final_score,
            "base_score_used": round(base_score, 3),
            "raw_model_score": round(model_score, 3)
        })

    return {"results": results}

@app.post("/explain_success")
def explain_with_mistral(input_data: BeneficiaryInput):
    prediction_result = predict_success_score(input_data)
    score = prediction_result["predicted_success_score"]
    prompt_template = ChatPromptTemplate.from_template(
        "Given a beneficiary with the following attributes:\n"
        "Age: {age}, Sex: {sex}, Income: {income_level}, Education: {education_level}, "
        "Marital Status: {marital_status}, Household Size: {household_size}, Occupation: {occupation}, "
        "Residence: {place_of_residence}, Credit Score: {credit_score}, Outstanding Loans: {has_outstanding_loans}, "
        "Monthly Expenses: {monthly_expenses}, Mobile Money Usage: {mobile_money_usage}.\n"
        "The predicted success score is {score:.2f}.\n\n"
        "What advice or support can we provide to help them improve their success chances?"
    )
    prompt = prompt_template.format_messages(**input_data.dict(), score=score)
    llm_response = llm.invoke(prompt).content
    return {
        **prediction_result,
        "mistral_advice": llm_response
    }

def query_mistral(context: str, user_query: str) -> str:
    prompt = f"You are a helpful assistant. Use the following data to answer the user:\n\n{context}\n\nUser: {user_query}"
    response = requests.post(
        MISTRAL_URL,
        json={
            "model": "mistral",
            "prompt": prompt,
            "stream": False
        }
    )
    return response.json().get("response", "No response from model.")

@app.post("/chat")
def chat(input: ChatInput):
    context = retrieve_context(input.message)
    response = query_mistral(context, input.message)
    return {"response": response}