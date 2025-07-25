# 🚀 Beneficiary Score Predictor API

This FastAPI project predicts a beneficiary's success score using demographic and financial data. It combines a base demographic score and an ML-predicted score using a trained XGBoost model.

## 🛠️ Installation

```bash
git clone <your-repo-url>
cd mlmodels
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
# or minimal:
pip install fastapi uvicorn scikit-learn xgboost pandas numpy joblib
````

### Go to api folder and run
```bash
uvicorn beneficiary_success_predictor:app --reload
```
### Swagger docs: http://127.0.0.1:8000/docs

#### Sample Request
```json 
{
  "age": 0,
  "sex": "string",
  "marital_status": "string",
  "education_level": "string",
  "income_level": 0,
  "occupation": "string",
  "place_of_residence": "string",
  "nationality": "string",
  "religion": "string",
  "language_spoken": "string",
  "household_size": 0,
  "credit_score": 0,
  "has_outstanding_loans": 0,
  "num_loans_taken_last_5yrs": 0,
  "employment_status": "string",
  "has_active_savings_account": 0,
  "income_growth_by_15percent_in_6months": 0,
  "loan_used_for_successful_self_employment": 0,
  "loan_used_for_child_education": 0,
  "past_funding_recieved": 0,
  "willing_to_participate_in_CSR": 0,
  "willing_to_educate_girl_child": 0,
  "willing_to_give_children_higher_education": 0
}
```

#### Sample Response

```json
{
  "predicted_success_score": 0.831,
  "base_score_used": 0.23,
  "raw_model_score": 0.759
}
```

# Model Info
```text
Type: XGBoost Regressor (wrapped in pipeline)
Output: Weighted score between 0 and 1
File: xgb_pipeline.pkl
```

# To improve

Cloud hosting
Logging + monitoring