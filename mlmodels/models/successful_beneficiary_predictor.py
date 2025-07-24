import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from xgboost import XGBRegressor
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import matplotlib.pyplot as plt
import seaborn as sns

import joblib

df = pd.read_csv('../synthetic_beneficiary_data.csv')
print(f"Loaded {df.shape[0]} rows")

X = df.drop('success_score', axis=1)
y = df['success_score']

categorical_cols = X.select_dtypes(include=['object']).columns.tolist()
numeric_cols = X.select_dtypes(include=['int64', 'float64']).columns.tolist()

if 'name' in categorical_cols: categorical_cols.remove('name')

preprocessor = ColumnTransformer(transformers=[
    ('num', StandardScaler(), numeric_cols),
    ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_cols)
])

model = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('regressor', XGBRegressor(n_estimators=100, learning_rate=0.1, max_depth=6, random_state=42))
])

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model.fit(X_train, y_train)

joblib.dump(model, '../xgb_pipeline.pkl')
print("✅ Model saved as xgb_pipeline.pkl")

# y_pred = model.predict(X_test)

# rmse = mean_squared_error(y_test, y_pred)
# mae = mean_absolute_error(y_test, y_pred)
# r2 = r2_score(y_test, y_pred)
#
# print(f"\n Evaluation:")
# print(f"RMSE: {rmse:.3f}")
# print(f"MAE: {mae:.3f}")
# print(f"R²: {r2:.3f}")
#
# xgb_model = model.named_steps['regressor']
#
# encoded_features = model.named_steps['preprocessor'].get_feature_names_out()
# importances = xgb_model.feature_importances_
#
# importance_df = pd.DataFrame({'feature': encoded_features, 'importance': importances})
# importance_df = importance_df.sort_values(by='importance', ascending=False).head(20)
#
# plt.figure(figsize=(10, 6))
# sns.barplot(data=importance_df, x='importance', y='feature')
# plt.title("Top 20 Feature Importances (XGBoost)")
# plt.tight_layout()
# plt.show()


