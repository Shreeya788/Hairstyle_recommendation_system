import cv2
import dlib
import numpy as np
import joblib
from sklearn.preprocessing import StandardScaler
import os
import pandas as pd

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor(os.path.join(BASE_DIR, 'hairstylerecommender', 'shape_predictor_68_face_landmarks.dat'))
knn_model = joblib.load(os.path.join(BASE_DIR, 'hairstylerecommender', 'knn_face_shape_model.pkl'))
label_encoder = joblib.load(os.path.join(BASE_DIR, 'hairstylerecommender', 'label_encoder_knn.pkl'))
scaler = joblib.load(os.path.join(BASE_DIR, 'hairstylerecommender', 'scaler_knn.pkl'))

def get_landmarks(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    rects = detector(gray, 1)
    for (_, rect) in enumerate(rects):
        shape = predictor(gray, rect)
        landmarks = np.zeros((68, 2), dtype="int")
        for i in range(0, 68):
            landmarks[i] = (shape.part(i).x, shape.part(i).y)
        return landmarks
    return None

def calculate_angle(p1, p2, p3):
    a = np.array(p1)
    b = np.array(p2)
    c = np.array(p3)
    ba = a - b
    bc = c - b
    cosine_angle = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc))
    angle = np.degrees(np.arccos(cosine_angle))
    return angle

def extract_features(landmarks):
    features = []

    eye_distance = np.linalg.norm(landmarks[36] - landmarks[45])
    features.append(eye_distance)

    nose_chin_distance = np.linalg.norm(landmarks[33] - landmarks[8])
    features.append(nose_chin_distance)

    jaw_width = np.linalg.norm(landmarks[0] - landmarks[16])
    features.append(jaw_width)

    face_length = np.linalg.norm(landmarks[8] - landmarks[27])
    features.append(face_length)

    cheekbones = np.linalg.norm(landmarks[1] - landmarks[15])
    features.append(cheekbones)

    forehead = np.linalg.norm(landmarks[19] - landmarks[24])
    features.append(forehead)

    jaw_angle = calculate_angle(landmarks[0], landmarks[8], landmarks[16])
    features.append(jaw_angle)

    cheekbone_angle = calculate_angle(landmarks[1], landmarks[27], landmarks[15])
    features.append(cheekbone_angle)

    forehead_angle = calculate_angle(landmarks[19], landmarks[27], landmarks[24])
    features.append(forehead_angle)

    jaw_to_cheekbone_ratio = jaw_width / cheekbones
    features.append(jaw_to_cheekbone_ratio)

    face_length_to_width_ratio = face_length / cheekbones
    features.append(face_length_to_width_ratio)

    chin_angle = calculate_angle(landmarks[6], landmarks[8], landmarks[10])
    features.append(chin_angle)

    temple_to_chin_ratio = np.linalg.norm(landmarks[0] - landmarks[16]) / face_length
    features.append(temple_to_chin_ratio)

    
    return features

def predict_face_shape(image):
    landmarks = get_landmarks(image)
    if landmarks is None:
        return None
    features = extract_features(landmarks)
    
    scaled_features = scaler.transform([features])
    prediction = knn_model.predict(scaled_features)
    face_shape = label_encoder.inverse_transform(prediction)[0]
    return face_shape

from django.conf import settings
import os
import random

def recommend_hairstyles(face_shape, hair_length):
    rec_pics_dir = os.path.join(settings.MEDIA_ROOT, 'rec_pics', face_shape, hair_length)
    recommendations = []
    for filename in os.listdir(rec_pics_dir):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            recommendations.append(filename)
    random.shuffle(recommendations)
    return recommendations[:6]  # Return top 6 recommendations