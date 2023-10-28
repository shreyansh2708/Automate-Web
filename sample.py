from googletrans import Translator

# Initialize the translator
translator = Translator()

text_to = "how are you"


def trans(text):
    translated_text = translator.translate(text, dest="hi")
    return translated_text.text


result = trans(text_to)
print(result)
