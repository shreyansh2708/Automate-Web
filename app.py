from flask import Flask
from flask_cors import CORS
from flask import jsonify
from flask import request, send_file
from werkzeug.utils import secure_filename
import os
from textextraction import index
from sr import speechreco
import json
import speech_recognition as sr
from translation import trans

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)


# Define the upload folder
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

audio_folder = 'upload_audio_folder'
app.config['audio_folder'] = audio_folder

# Define a function to check and create the upload folder if it doesn't exist


def create_upload_folder():
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)


def create_audio_folder():
    if not os.path.exists(audio_folder):
        os.makedirs(audio_folder)


@app.route('/image-to-text', methods=['GET', 'POST'])
def ocr():
    # it will send the data of extracted_text.json to the localhost:5000/image-to-text
    # from this localhost it will fetch the data and display on frontend
    if (request.method == 'GET'):
        return send_file("extracted_text.json")
    if (request.method == 'POST'):
        if 'image' not in request.files:
            return 'No file part'

        uploaded_file = request.files['image']

        if uploaded_file.filename == '':
            return 'No selected file'

        create_upload_folder()

        filename = secure_filename(uploaded_file.filename)
        upload_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

        uploaded_file.save(upload_path)

        # Call the index() function in the t1 module
        text = index(upload_path)

    # In this your extracted text willbe stored in extracted_text.json file
    # and it can be fetched from your localhost:5000/image-to-text
    # from react js file
    # for more info go to ImageToText.js file

    extracted_data = {'extracted_text': text}

    # Define the path for the JSON file where you want to store the extracted text
    json_file_path = 'extracted_text.json'

    # Save the extracted data to a JSON file
    with open(json_file_path, 'w') as json_file:
        json.dump(extracted_data, json_file)

    # In this it will directly send the text using jsonify and can be fetched in reponse section
    # for more info go to ImageToText.js file
    # return jsonify(extracted_data)


@app.route('/speech-to-text', methods=['POST'])
def speech_reco():
    if (request.method == 'POST'):

        uploaded_file = request.files['audio']

        if uploaded_file.filename == '':
            return 'No selected file'

        create_audio_folder()

        filename = secure_filename(uploaded_file.filename)
        upload_path = os.path.join(app.config['audio_folder'], filename)

        uploaded_file.save(upload_path)

        speech_text = speechreco(upload_path)

    return jsonify({'extracted_text': speech_text})


@app.route("/translation", methods=["POST"])
def translator():
    if (request.method == 'POST'):
        text_file = request.form.get('txt')

        create_upload_folder()

        filename = secure_filename('text.txt')
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

        with open(file_path, 'w', encoding='utf-8') as txt_file:
            txt_file.write(text_file)

        text = trans(file_path)

    return jsonify({'extracted_text': text})


if __name__ == '__main__':
    app.run(debug=True)
