from decord import VideoReader
import matplotlib.pyplot as plt
import numpy as np
import mxnet as mx
from mxnet import gluon, nd, image
from mxnet.gluon.data.vision import transforms
from gluoncv.data.transforms import video
from gluoncv import utils
from gluoncv.model_zoo import get_model
from gluoncv.utils import try_import_cv2
cv2 = try_import_cv2()
import sys  

url = 'public/' + sys.argv[1]
video_fname = (url)
type(video_fname)


cap = cv2.VideoCapture(video_fname)
cnt = 0
video_frames = []
while(cap.isOpened()):
    if len(video_frames) > 5:
        break
    ret, frame = cap.read()
    try:
        frame = cv2.resize(frame, (240,320))
    except Exception as e:
        pass
        #print(str(e))
    cnt += 1
    if ret and cnt % 25 == 0:
        video_frames.append(frame)
    if not ret: break

cap.release()
 
transform_fn = transforms.Compose([
    video.VideoCenterCrop(size=224),
    video.VideoToTensor(),
    video.VideoNormalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])


#print('We evenly extract %d frames from the video %s.' % (len(video_frames), video_fname))

net = get_model('vgg16_ucf101', nclass=101, pretrained=True)

video_frames_transformed = transform_fn(video_frames)

#print(video_frames[0].shape)
final_pred = 0
for _, frame_img in enumerate(video_frames_transformed):
    pred = net(nd.array(frame_img).expand_dims(axis=0))
    final_pred += pred
final_pred /= len(video_frames)

classes = net.classes
topK = 5
ind = nd.topk(final_pred, k=topK)[0].astype('int')
#print('The input video is classified to be')
for i in range(topK):
    print('{"class":"[%s]",  "probability" :%.3f}-'%
          (classes[ind[i].asscalar()], nd.softmax(final_pred)[0][ind[i]].asscalar()))

