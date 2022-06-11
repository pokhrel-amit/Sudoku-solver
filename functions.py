import cv2
import numpy as np

def preProcess(img):
    imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)  # CONVERT IMAGE TO GRAY SCALE
    imgBlur = cv2.GaussianBlur(imgGray, (5, 5), 1)  # ADD GAUSSIAN BLUR
    imgThreshold = cv2.adaptiveThreshold(imgBlur, 255, 1, 1, 11, 2)  # APPLY ADAPTIVE THRESHOLD
    return imgThreshold


def splitBoxes(img):
    rows = np.vsplit(img,9)
    boxes=[]
    for r in rows:
        cols= np.hsplit(r,9)
        for box in cols:
            boxes.append(box)
    return boxes


def biggestContour(contours):
    max_area = 0
    biggest = np.array([])
    for i in contours:
        area = cv2.contourArea(i)
        if area > 50:
            peri = cv2.arcLength(i, True)
            approx = cv2.approxPolyDP(i, 0.02 * peri, True)
            if area > max_area and len(approx) == 4:
                biggest = approx
                max_area = area
    return biggest,max_area


def getPredection(image,model,i):
    img = np.asarray(image)
    img = img[4:img.shape[0] - 4, 4:img.shape[1] -4]
    cv2.imwrite("./boxes/bater"+str(i)+".jpg",img)
    img = cv2.resize(img, (28, 28))
    img = np.array(img)
    img = img.reshape(1, 28, 28, 1)
    img = img / 255.0

    predictions = model.predict(img)
    classIndex = model.predict_classes(img)
    probabilityValue = np.amax(predictions)

    print(probabilityValue,classIndex)
    
    if probabilityValue > 0.9:
         result = int(classIndex[0])
    else:
         result = "0"
    return result


