import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
from functions import *

pathImage = "./public/saved_images/originalImage.jpg"

from tensorflow.keras.models import load_model

model = load_model("./model/myModel.h5")
f = open("test.txt","w")


print(model.summary())
img = cv2.imread(pathImage)
original_image = img.copy()
imgThreshold = preProcess(img)

contours, hierarchy = cv2.findContours(imgThreshold, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE) 

biggest, maxArea = biggestContour(contours)


if (biggest.size !=0):   
    peri = cv2.arcLength(biggest,True)
    approx = cv2.approxPolyDP(biggest,0.1*peri,True)
    
    ax = approx.item(0)
    ay = approx.item(1)
    bx = approx.item(2)
    by = approx.item(3)
    cx = approx.item(4)
    cy = approx.item(5)
    dx = approx.item(6)
    dy = approx.item(7)

    w,h = 900,900

    pt1 = np.float32([[bx,by],[ax,ay],[cx,cy],[dx,dy]])
    pt2 = np.float32([[0,0],[w,0],[0,h],[w,h]])

    matrix = cv2.getPerspectiveTransform(pt1,pt2)
    img_perspective = cv2.warpPerspective(original_image,matrix,(w,h))
    frame = cv2.cvtColor(img_perspective,cv2.COLOR_BGR2GRAY)
    frame = cv2.rotate(frame,cv2.ROTATE_90_COUNTERCLOCKWISE)

    boxes = splitBoxes(frame)

    for i in range(0,81):
        number = getPredection(boxes[i],model,i)
        f.write(str(number))
        if((i+1)%9== 0 and i!=0):
          f.write("\n")
        else:
          f.write(" ")
f.close()
       
    





