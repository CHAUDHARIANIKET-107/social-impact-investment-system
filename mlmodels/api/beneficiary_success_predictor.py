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
from fastapi.encoders import jsonable_encoder
import random


first_names = [
    "Aarav", "Vivaan", "Aditya", "Krishna", "Aryan", "Ishaan", "Rohan",
    "Rahul", "Siddharth", "Kunal", "Yash", "Aman", "Vikram", "Manav", "Arjun",
    "Neha", "Ananya", "Saanvi", "Kavya", "Diya", "Aishwarya", "Sneha", "Pooja",
    "Riya", "Meera", "Tanya", "Nisha", "Shruti", "Isha", "Swati"
]

middle_names = [
    "Raj", "Kumar", "Singh", "Prasad", "Dev", "Chandra", "Narayan", "Mohan",
    "Rani", "Lal", "Bhanu", "Shekhar", "Nath", "Rao", "Das", "Bai", "Deep",
    "Preet", "Mani", "Inder", "Sundar", "Lakshmi", "Venu", "Vikram", "Varun"
]

last_names = [
    "Sharma", "Verma", "Reddy", "Patel", "Nair", "Kapoor", "Joshi", "Desai",
    "Mehta", "Singh", "Kumar", "Das", "Chopra", "Jain", "Bose", "Banerjee",
    "Menon", "Rao", "Pillai", "Gupta", "Malhotra", "Pandey", "Mishra", "Yadav",
    "Thakur", "Dwivedi", "Tiwari", "Rastogi", "Kulkarni", "Naidu"
]


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

class ChatInput(BaseModel):
    message: str


class BeneficiaryInput(BaseModel):
    #changes made
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
    low_wages: int

def calculate_base_score(data: dict) -> float:
    score = 0.0
    score += 0.3 if data["sex"] == "Female" else 0
    score += 0.3 if data["place_of_residence"] == "Rural" else 0
    score -= 0.8 * data["past_funding_recieved"]
    score += 0.2 * data["willing_to_participate_in_CSR"] 
    score += 0.2 * data["willing_to_educate_girl_child"]
    score += 0.15 * data["willing_to_give_children_higher_education"]
    score += 0.8 * data['low_wages']
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
        full_name = random.choice(first_names) + " " + random.choice(middle_names) + " " + random.choice(last_names)

        # Build result with name first
        ordered_data = {
            "name": full_name,
            **data,
            "predicted_success_score": final_score,
            "base_score_used": round(base_score, 3),
            "raw_model_score": round(model_score, 3),
        }

        results.append({"candidate_info": ordered_data})

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