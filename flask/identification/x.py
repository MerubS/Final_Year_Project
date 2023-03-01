import cv2 as cv
from time import sleep
import os

cap = cv.VideoCapture(0)


haar_cascade = cv.CascadeClassifier('cascades\data\haarcascade_frontalface_alt2.xml')
pictures = 1
name = ''

name = input("Enter name : ")

pth = os.getcwd()
pth = os.path.join(pth, 'images')
os.chdir(pth)

isExist = os.path.exists(os.path.join(pth, name))

if not isExist:
    os.mkdir(name)

pth = os.path.join(pth, name)
os.chdir(pth)


while True:

    if pictures == 30:
        exit(0)

    ret, frame = cap.read()
    gray_image = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)

    cv.imshow("x", frame)
    if cv.waitKey(2) & 0xFF == ord('q'):
        break

    faces =  haar_cascade.detectMultiScale(gray_image,scaleFactor= 1.5,minNeighbors= 8, minSize=(30,30),flags=cv.CASCADE_SCALE_IMAGE)
    sleep(0.5)
    if len(faces) == 0 :
        print("Face cant be detected kindly repostion your face")
        continue
    
    if len(faces) > 1:
        print("A single Face cant be detected kindly register 1 face")
        continue

  
    cv.imwrite(str(pictures)+'.jpg',frame)
    pictures += 1

