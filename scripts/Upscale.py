from ISR.models import RRDN
import numpy as np
from PIL import Image
from matplotlib import pyplot as plt


img = Image.open('ThrowDiscus.png')
lr_img = np.array(img)

rdn = RRDN(weights='gans')
#sr_img = rdn.predict(lr_img)
#Image.fromarray(sr_img)
#plt.imshow(sr_img)
