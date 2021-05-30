from PIL import Image
import face_recognition
from mtcnn.mtcnn import MTCNN
from matplotlib import pyplot
from matplotlib.patches import Rectangle
import sys
import cv2



#filePath = 'public/' + sys.argv[1]
filePath = 'F:/FYP/Implementation/backend/public/yt1s.com - HD CCTV Camera video 3MP 4MP iProx CCTV HDCCTVCamerasnet retail store.mp4'

if filePath.endswith('.jpg') or filePath.endswith('.png') or filePath.endswith('.jpeg'):
    image = face_recognition.load_image_file(filePath)
    face_locations = face_recognition.face_locations(image, number_of_times_to_upsample=0, model="cnn")
    #detector = MTCNN()
    #face_locations = detector.detect_faces(image)
    print("I found {} face(s) in this photograph.".format(len(face_locations)))

    for face_location in face_locations:

        # Print the location of each face in this image
        top, right, bottom, left = face_location
        print("A face is located at pixel location Top: {}, Left: {}, Bottom: {}, Right: {}".format(top, left, bottom, right))

        # You can access the actual face itself like this:
        face_image = image[top:bottom, left:right]
        #pil_image = Image.fromarray(face_image)
        pil_image = Image.fromarray(face_image)
        pil_image.save('F:/FYP/Implementation/backend/public/faces/'+ str(bottom) + str(left) + '_faces.jpg')
        #pil_image.save(str(bottom) + str(left) + '_faces.jpg')
        


        
elif filePath.endswith('.mp4') or filePath.endswith('.flv') or filePath.endswith('.mpeg') or filePath.endswith('.mkv'):
    cap= cv2.VideoCapture(filePath)
    i=0
    while(cap.isOpened()):
        ret, frame = cap.read()
        if ret == False:
            break
        #cv2.imwrite('face'+str(i)+'.jpg',frame)
        #gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        #print('3')
        
        face_locations = face_recognition.face_locations(frame, number_of_times_to_upsample=0, model="cnn")

        detector = MTCNN()
        face_locations = detector.detect_faces(frame)
        print("I found {} face(s) in this photograph.".format(len(face_locations)))

        #print("Found {0} Faces!".format(len(faces)))
        

        for face_location in face_locations:
            # Print the location of each face in this image
            x1, y1, width, height = face_location['box']
            x2, y2 = x1 + width, y1 + height
            top, right, bottom, left = y1,y2,x1,x2
            print("A face is located at pixel location Top: {}, Left: {}, Bottom: {}, Right: {}".format(top, left, bottom, right))

            # You can access the actual face itself like this:
            face_image = frame[top:bottom, left:right]
            pil_image = Image.fromarray(face_image)
            #pil_image = Image.fromarray(cv2.cvtColor(face_image,cv2.COLOR_BGR2RGB))
            #pil_image  = cv2.cvtColor(pil_image , cv2.COLOR_BGR2RGB)            
            pil_image.save('F:/FYP/Implementation/backend/public/faces/' + str(bottom) + str(left) + '_faces.jpg')
            
         
    cap.release()
    cv2.destroyAllWindows() 
