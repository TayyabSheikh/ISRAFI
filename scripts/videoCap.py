import cv2

filePath = 'F:/FYP/Implementation/backend/public/WhatsApp Video 2021-03-07 at 7.59.30 PM.mp4'
cap= cv2.VideoCapture(filePath)
i=0
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
        cv2.imwrite('F:/FYP/Implementation/backend/public/faces/' + str(w) + str(h) + '_faces.jpg', roi_color)
        i+=1
        print(i)
     
cap.release()
cv2.destroyAllWindows()
