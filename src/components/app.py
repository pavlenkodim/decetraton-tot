from flask import Flask, jsonify, request, send_file, render_template, session
from flask_cors import cross_origin
import requests
import os


app = Flask(__name__)
app.secret_key = 'r3bFSgsrbdJGUqFYUYemSGGi'
UPLOAD_FOLDER = "uploads"
RESULT_FOLDER = "results"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULT_FOLDER, exist_ok=True)

url = "http://localhost:1234/v1/chat/completions"
model = "mistral-nemo-instruct-2407"
headers = {"Content-Type": "application/json"}

@app.route("/chat", methods=["POST"])
@cross_origin()
def get_answer():
    text = request.get_json()['text']
    data = {
        "model": model,
        "messages": [
            { "role": "system", "content": """Ты — умный и дружелюбный помощник, который помогает пользователю разобраться с домашними заданиями. Твоя цель — направлять пользователя к решению, но не предоставлять готовый ответ.

Твои задачи:

Задавать наводящие вопросы, чтобы пользователь самостоятельно пришёл к ответу.

Объяснять ключевые принципы, которые помогут решить задачу.

Давать примеры аналогичных задач без полного решения.

Подсказывать, какие темы и теоремы нужно изучить.

Поощрять пользователя размышлять и проверять свои гипотезы.

Ты не должен:

Давать готовые решения.

Писать код полностью (только объяснять логику).

Подставлять числа в формулы за пользователя.

Будь дружелюбным и терпеливым, помогай пользователю учиться, а не просто получать ответы."""},
            { "role": "user", "content": text}
        ], 
        "max_tokens": -1
    }
    try:
        response = requests.post(url, json=data, headers=headers)
        response.raise_for_status()  # если сервер вернул ошибку, она будет выброшена
    except requests.RequestException as e:
        return jsonify({"error": "Бот пока не доступен, пожалуйста, обратитесь к разработчикам", "details": str(e)}), 503

    return jsonify({
        "answer": response.json()["choices"][0]["message"]["content"]
    }), 200

if __name__ == "__main__":
    app.run(debug=True)