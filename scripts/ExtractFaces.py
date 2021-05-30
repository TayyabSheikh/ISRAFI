import os
import cv2
import numpy as np
from matplotlib import pyplot as plt
import sys
import cv2


filePath = 'public/' + sys.argv[1]


if filePath.endswith('.jpg') or filePath.endswith('.png') or filePath.endswith('.jpeg'):
    image = cv2.imread(filePath)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    print('3')

    faceCascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")  
    faces = faceCascade.detectMultiScale(
            gray,
            scaleFactor=1.3,
            minNeighbors=3,
            minSize=(10, 10)
    )

    print("Found {0} Faces!".format(len(faces)))

    for (x, y, w, h) in faces:
        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
        roi_color = image[y:y + h, x:x + w]
        #print("[INFO] Object found. Saving locally.")
        cv2.imwrite('public/faces/' + str(w) + str(h) + '_faces.jpg', roi_color)


elif filePath.endswith('.mp4') or filePath.endswith('.flv') or filePath.endswith('.mpeg') or filePath.endswith('.mkv'):
    cap= cv2.VideoCapture(filePath)
    i=0
    counter = 0
    while(cap.isOpened()):
        ret, frame = cap.read()
        if ret == False:
            break
        #cv2.imwrite('face'+str(i)+'.jpg',frame)
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        #print('3')

        faceCascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
        faces = faceCascade.detectMultiScale(
                gray,
                scaleFactor=1.3,
                minNeighbors=3,
                minSize=(10, 10)
        )

        #print("Found {0} Faces!".format(len(faces)))
        
        for (x, y, w, h) in faces:
            
            cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
            roi_color = frame[y:y + h, x:x + w]
            #print("[INFO] Object found. Saving locally.")
            cv2.imwrite('F:/FYP/Implementation/backend/public/faces/' + str(w) + str(h) + str(counter) + '_faces.jpg', roi_color)
            i+=1
            counter+=1
            #print(i)
         
    cap.release()
    cv2.destroyAllWindows()
