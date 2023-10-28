from flask_cors import CORS
from flask import Flask, request, send_file
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Define the upload folder
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Define a function to check and create the upload folder if it doesn't exist


def create_upload_folder():
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

# Route to serve the ImageToText.js file


@app.route('/image-to-text', methods=['GET'])
def send_js():
    return send_file('ImageToText.js')

# Route to handle file upload


@app.route('/image-to-text', methods=['POST'])
def upload_file():
    if 'image' not in request.files:
        return 'No file part'

    uploaded_file = request.files['image']

    if uploaded_file.filename == '':
        return 'No selected file'

    create_upload_folder()

    filename = secure_filename(uploaded_file.filename)
    upload_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    uploaded_file.save(upload_path)
    return 'File uploaded successfully'


if __name__ == '__main__':
    app.run(port=8000)
