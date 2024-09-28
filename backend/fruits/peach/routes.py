from fastapi import APIRouter, File, UploadFile
import numpy as np
from PIL import Image
from io import BytesIO
import tensorflow as tf
from config import MODEL_PATH

router = APIRouter()


MODEL = tf.keras.models.load_model(f"{MODEL_PATH}/fruits/peach_model.keras", compile=False)

CLASS_NAMES = ['Bacterial_spot','Healthy']


def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image

@router.post("/predict/")
async def predict(file: UploadFile = File(...)):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)

    prediction = MODEL.predict(img_batch)
    predicted_class = CLASS_NAMES[np.argmax(prediction[0])]
    confidence = round(100 * np.max(prediction[0]), 2)

    return {
        "predicted_class": predicted_class,
        "confidence": confidence
    }

