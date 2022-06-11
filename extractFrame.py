import  cv2
import numpy as np


original_image = cv2.imread("./public/saved_images/originalImage.jpg")

def biggestContour(contours):
    biggest = np.array([])
    max_area = 0
    for i in contours:
        area = cv2.contourArea(i)
        if area > 50:
            peri = cv2.arcLength(i, True)
            approx = cv2.approxPolyDP(i, 0.02 * peri, True)
            if area > max_area and len(approx) == 4:
                biggest = approx
                max_area = area
    return biggest,max_area


def pre_process_image(img):
    imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)  # CONVERT IMAGE TO GRAY SCALE
    imgBlur = cv2.GaussianBlur(imgGray, (5, 5), 1)  # ADD GAUSSIAN BLUR
    imgThreshold = cv2.adaptiveThreshold(imgBlur, 255, 1, 1, 11, 2)  # APPLY ADAPTIVE THRESHOLD
    return imgThreshold


threshold_img = pre_process_image(original_image)     

contours, hierarchy = cv2.findContours(threshold_img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE) 
frame = None

biggest, maxArea = biggestContour(contours) # FIND THE BIGGEST CONTOUR
if (biggest.size !=0):   
     perimeter = cv2.arcLength(biggest,True)
     
     approx = cv2.approxPolyDP(biggest,0.02*perimeter,True)

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
     cv2.imwrite("./public/saved_images/frame_binary.jpg",frame)
else:
    print("No frame detected")
    exit(1)

