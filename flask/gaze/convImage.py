import base64
from PIL import Image
import cv2
import numpy as np
import io



def showImage(base64Img):
    imgdata = base64.b64decode(base64Img)


    img = Image.open(io.BytesIO(imgdata))
    opencv_img= cv2.cvtColor(np.array(img), cv2.COLOR_BGR2RGB)

    cv2.imshow('a', opencv_img)

    cv2.waitKey()

