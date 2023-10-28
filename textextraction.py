import pytesseract
import cv2

# Set Tesseract executable path
pytesseract.pytesseract.tesseract_cmd = r'D:\Program Files\Tesseract-OCR\tesseract.exe'


def index(upload_path):
    # Read the image
    img = cv2.imread(upload_path)

    # Perform OCR
    text = pytesseract.image_to_string(img, lang='eng')
    return text
