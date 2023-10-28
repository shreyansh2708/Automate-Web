import speech_recognition as sr
# Initialize the recognizer
recognizer = sr.Recognizer()


def speechreco(upload_path):
    try:
        with sr.AudioFile(upload_path) as source:
            audio_data = recognizer.record(source)
        # Recognize the audio using Google Web Speech API
        speech_text = recognizer.recognize_google(audio_data)
        print("You said:", speech_text)
    except sr.UnknownValueError:
        print("Sorry, I couldn't understand what you said.")
    except sr.RequestError as e:
        print(
            "Sorry, there was an error with the speech recognition service; {0}".format(e))
    return speech_text
