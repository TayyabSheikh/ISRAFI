from matplotlib import pyplot
from matplotlib.patches import Rectangle
from matplotlib.patches import Circle
from mtcnn.mtcnn import MTCNN
import cv2

 
# draw each face separately
def draw_faces(filename, result_list):
	# load the image
	data = filename
	# plot each face as a subplot
	for i in range(len(result_list)):
		# get coordinates
		x1, y1, width, height = result_list[i]['box']
		x2, y2 = x1 + width, y1 + height
		# define subplot
		#pyplot.subplot(1, len(result_list), i+1)
		#pyplot.axis('off')
		# plot face
		img = data[y1:y2, x1:x2]    
		cv2.imwrite('F:/FYP/Implementation/backend/public/faces/' + str(x1) + str(x2) + '_faces.jpg', img)
		
	# show the plot
	

filename = 'F:/FYP/Implementation/backend/public/1622281637848-1615135659650-WhatsApp Video 2021-03-07 at 7.59.30 PM.mp4'

if filename.endswith('.jpg') or filename.endswith('.png') or filename.endswith('.jpeg'):
    # load image from file
    pixels = pyplot.imread(filename)
    # create the detector, using default weights
    detector = MTCNN()
    # detect faces in the image
    faces = detector.detect_faces(pixels)
    # display faces on the original image
    draw_faces(pixels, faces)

elif filename.endswith('.mp4') or filename.endswith('.flv') or filename.endswith('.mpeg') or filename.endswith('.mkv'):
    cap= cv2.VideoCapture(filename)
    i=0
    while(cap.isOpened()):
        ret, frame = cap.read()
        if ret == False:
            break
        # load image from file
        pixels = frame
        # create the detector, using default weights
        detector = MTCNN()
        # detect faces in the image
        faces = detector.detect_faces(pixels)
        # display faces on the original image
        draw_faces(pixels, faces)







