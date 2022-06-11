import  cv2
import numpy as np
import os
import sys

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'


img_path = sys.argv[1]

image = cv2.imread("./images/"+img_path)     ## Load the image
original_image = image.copy()                ## Copy the image for backup

imgGray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)  
imgBlur = cv2.GaussianBlur(imgGray, (5, 5), 1)  
threshold_img = cv2.adaptiveThreshold(imgBlur, 255, 1, 1, 11, 2)  


cv2.imwrite("./public/saved_images/originalImage.jpg",original_image)
cv2.imwrite("./public/saved_images/preProcess.jpg",threshold_img)
