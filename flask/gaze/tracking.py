import cv2 as cv
import numpy as np
from . import module as m
import time , os

# COUNTER = 0
# TOTAL_BLINKS = 0
# CLOSED_EYES_FRAME = 3
# videoPath = "Video/Your Eyes Independently_Trim5.mp4"
# FRAME_COUNTER = 0
# START_TIME = time.time()
# FPS = 0
# rightmovement,leftmovement,nomovement = 0,0,0

async def main_func(frame , gaze_payload):

    
    COUNTER = gaze_payload['counter']
    TOTAL_BLINKS = gaze_payload['total_blinks']
    CLOSED_EYES_FRAME = gaze_payload['closed_eyes_frame']
    videoPath = gaze_payload['video_path']
    FRAME_COUNTER = gaze_payload['frame_counter']
    START_TIME = gaze_payload['start_time']
    FPS = gaze_payload['fps']
    (rightmovement,leftmovement,nomovement) = (gaze_payload['right_movement'], gaze_payload['left_movement'], gaze_payload['no_movement'])
    # camera = cv.VideoCapture(cameraID)

    while(1):
        print(os.getcwd())
        if (os.getcwd().split('\\')[-1] != 'flask'):
            os.chdir('../')
        else:
            os.chdir(os.path.join(os.getcwd() , 'gaze'))
            break;   
    
    print(os.getcwd())
    print(rightmovement , leftmovement , nomovement , START_TIME)
    fourcc = cv.VideoWriter_fourcc(*'XVID')
    # f = camera.get(cv.CAP_PROP_FPS)
    # width = camera.get(cv.CAP_PROP_FRAME_WIDTH)
    # height = camera.get(cv.CAP_PROP_FRAME_HEIGHT)
    # print(width, height, f)
    fileName = videoPath.split('/')[1]
    name = fileName.split('.')[0]
    print(name) 
    print('FPS : ' , FPS)

    # while True:
    #     FRAME_COUNTER += 1
    #     ret, frame = camera.read()
    #     if ret == False:
    #         break

    grayFrame = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
    height, width = grayFrame.shape
    circleCenter = (int(width/2), 50)
    image, face = m.faceDetector(frame, grayFrame)
    if face is not None:

        image, PointList = m.faceLandmakDetector(frame, grayFrame, face, False)

        RightEyePoint = PointList[36:42]
        LeftEyePoint = PointList[42:48]
        leftRatio, topMid, bottomMid = m.blinkDetector(LeftEyePoint)
        rightRatio, rTop, rBottom = m.blinkDetector(RightEyePoint)

        blinkRatio = (leftRatio + rightRatio)/2

        mask, pos, color = m.EyeTracking(frame, grayFrame, RightEyePoint)
        if pos == "Right":
            rightmovement+=1
        elif pos == "Left":
            leftmovement+=1
        else:
            nomovement+=1
        maskleft, leftPos, leftColor = m.EyeTracking(
            frame, grayFrame, LeftEyePoint)

        cv.line(image, (30, 90), (100, 90), color[0], 30)
        cv.line(image, (25, 50), (135, 50), m.WHITE, 30)
        cv.line(image, (int(width-150), 50), (int(width-45), 50), m.WHITE, 30)
        cv.line(image, (int(width-140), 90),
                (int(width-60), 90), leftColor[0], 30)

        cv.putText(image, f'{pos}', (35, 95), m.fonts, 0.6, color[1], 2)
        cv.putText(image, f'{leftPos}', (int(width-140), 95),
                m.fonts, 0.6, leftColor[1], 2)
        cv.putText(image, f'Right Eye', (35, 55), m.fonts, 0.6, color[1], 2)
        cv.putText(image, f'Left Eye', (int(width-145), 55),
                m.fonts, 0.6, leftColor[1], 2)

        # cv.imshow('Frame', image)
    else:
        # cv.imshow('Frame', frame)
        ...
    # print(time.time() , START_TIME)
    # SECONDS = time.time() - START_TIME
    # FPS = FRAME_COUNTER/SECONDS

    # key = cv.waitKey(1)

    # if key == ord('q'):
    #     break

    
    # camera.release()

    with open("test.txt","w") as f:
        totalmovement = leftmovement+rightmovement+nomovement
        f.write(f"Left Movement = "+str(leftmovement) + "\nNo Movement = "+ str(nomovement)+"\nRight Movement = "+str(rightmovement)+"\n\nLeft Movement "+str(round((leftmovement/totalmovement)*100,2))+"%"\
            +"\nNo Movement "+str(round((nomovement/totalmovement)*100,2))+"%"+"\nRight Movement "+str(round((rightmovement/totalmovement)*100,2))+"%")
        f.close
    cv.destroyAllWindows()

    
    (gaze_payload['counter'] , gaze_payload['total_blinks'] , gaze_payload['closed_eyes_frame'] , gaze_payload['video_path'] , gaze_payload['frame_counter'] , gaze_payload['start_time'] , gaze_payload['fps'] , gaze_payload['right_movement'], gaze_payload['left_movement'], gaze_payload['no_movement']) = (COUNTER , TOTAL_BLINKS , CLOSED_EYES_FRAME , videoPath , FRAME_COUNTER , START_TIME , FPS , rightmovement,leftmovement,nomovement) 

    return gaze_payload