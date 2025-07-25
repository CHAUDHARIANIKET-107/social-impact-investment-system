import pandas as pd
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer
import pickle

CSV_PATH = "../synthetic_beneficiary_data.csv"
FAISS_PATH = "../faiss_index.pkl"
MODEL_NAME = "all-MiniLM-L6-v2"

def build_faiss_index():
    df = pd.read_csv(CSV_PATH)
    texts = df.astype(str).apply(lambda row: " | ".join(row), axis=1).tolist()

    model = SentenceTransformer(MODEL_NAME)
    embeddings = model.encode(texts, show_progress_bar=True)

    index = faiss.IndexFlatL2(embeddings[0].shape[0])
    index.add(np.array(embeddings))

    with open(FAISS_PATH, "wb") as f:
        pickle.dump((index, texts), f)

    print("✅ FAISS index saved.")

if __name__ == "__main__":
    build_faiss_index()
