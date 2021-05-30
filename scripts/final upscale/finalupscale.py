import cv2
from cv2 import dnn_superres
from mxnet import image
import sys


# Create an SR object
sr = dnn_superres.DnnSuperResImpl_create()

# Read image
imgpath = 'F:/FYP/Implementation/backend/public/' + sys.argv[1] 
img = cv2.imread(imgpath)
cv2.imwrite('F:/FYP/Implementation/backend/public/upscaled/orignal.jpg', img)

# Read the desired model
try:
    path = "F:/FYP/Implementation/backend/scripts/final upscale/EDSR_x4.pb"
    sr.readModel(path)

    # Set the desired model and scale to get correct pre- and post-processing
    sr.setModel("edsr", 4)

    # Upscale the image
    result = sr.upsample(img)

    # Save the image
    cv2.imwrite("F:/FYP/Implementation/backend/public/upscaled/superres.jpg", result)
    print("done")

except Exception as e:
    print(e)
