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
  "age": 32,
  "sex": "Female",
  "race_ethnicity": "Asian",
  "marital_status": "Married",
  "education_level": "Graduate",
  "income_level": 60000,
  "occupation": "Engineer",
  "place_of_residence": "Urban",
  "nationality": "Indian",
  "religion": "Hindu",
  "language_spoken": "Hindi",
  "household_size": 2,
  "credit_score": 750,
  "has_outstanding_loans": 0,
  "num_loans_taken_last_5yrs": 1,
  "loan_repayment_history_score": 0.92,
  "monthly_expenses": 20000,
  "existing_monthly_liabilities": 5000,
  "bank_account_access": 1,
  "internet_access": 1,
  "distance_to_nearest_bank_km": 1.2,
  "mobile_money_usage": 1
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