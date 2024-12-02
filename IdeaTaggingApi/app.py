from flask import Flask, request, jsonify
from transformers import pipeline
import time

app = Flask(__name__)

s = time.time()
print("LOADING BART...")
classifier = pipeline('zero-shot-classification', model="facebook/bart-large-mnli")
print(f'LOADING COMPLETED IN {time.time()-s}s')

@app.route('/classify', methods=['POST'])
def classify():
    data = request.get_json()  
    idea_id = data['id']
    title = data['title']
    description = data['description']
    categories = data['categories']

    category_names = [category['name'] for category in categories]

    combined_text = f"{title}. {description}"
    result = classifier(combined_text, category_names)

    threshold = 0.15
    matching_categories = []

    for label, score in zip(result['labels'], result['scores']):
        if score >= threshold:
            category = next((cat for cat in categories if cat['name'] == label), None)
            if category:
                matching_categories.append({
                    "id": category['id'],
                    "name": label,
                    "score": score
                })

    return jsonify({
        "ideaID": idea_id,
        "categories": matching_categories
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
