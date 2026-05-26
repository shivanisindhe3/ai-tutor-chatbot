import chromadb
from sentence_transformers import SentenceTransformer

embedding_model = SentenceTransformer(
    "all-MiniLM-L6-v2",
    device="cpu"
)

chroma_client = chromadb.Client()

collection = chroma_client.get_or_create_collection(name="pdf_chunks")


def store_chunks(chunks: list[str]):
    collection.delete()

    for index, chunk in enumerate(chunks):
        embedding = embedding_model.encode(chunk).tolist()

        collection.add(
            ids=[str(index)],
            embeddings=[embedding],
            documents=[chunk],
        )


def search_chunks(question: str, top_k: int = 5):
    question_embedding = embedding_model.encode(question).tolist()

    results = collection.query(
        query_embeddings=[question_embedding],
        n_results=top_k,
    )

    return results["documents"][0]