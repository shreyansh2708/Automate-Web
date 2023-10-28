from googletrans import Translator
from langdetect import detect

# Initialize the translator
translator = Translator()

# List of destination languages
language = ["en", "hi", "gu", "kn"]


def detect_input_language(text):
    try:
        detected_lang = detect(text)
        return detected_lang
    except:
        return None


def trans(file_path):
    translated_text = []
    with open(file_path, 'r', encoding='utf-8') as text_file:
        text_to_translate = text_file.read()

        input_language = detect_input_language(text_to_translate)
        if input_language:
            print(f"Detected input language: {input_language}")

            for i in language:
                if i != input_language:
                    translation = translator.translate(
                        text_to_translate, src=input_language, dest=i)
                    text = translation.text
                    translated_text.append(text)
                    print(f"Translated text to {i}: {text}")
        else:
            print("Failed to detect input language.")
    return translated_text
