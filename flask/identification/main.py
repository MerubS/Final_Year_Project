import face_recognition
from . import improve 
import pickle
from time import sleep
import cv2
import os , json
import numpy as np
import pydash as _

def count_condition(arr, condition):
    count = 0
    for item in arr:
        if condition(item):
            count += 1
    return count

async def identify(fr , face_encoding , id , identification_payload):

    TOTAL_SNAPSHOTS = identification_payload['total_snapshots']
    NO_FACE = identification_payload['no_face']
    CORRECT_FACE = identification_payload['correct_face']
    WRONG_FACE = identification_payload['wrong_face']
    

    while(1):
        print(os.getcwd())
        if (os.getcwd().split('\\')[-1] != 'flask'):
            os.chdir('../')
        else:
            os.chdir(os.path.join(os.getcwd() , 'identification'))
            break;  

    TOTAL_SNAPSHOTS = TOTAL_SNAPSHOTS + 1

    print(os.getcwd())
    cascPathface = os.path.dirname(
    cv2.__file__) + "/data/haarcascade_frontalface_alt2.xml"

    faceCascade = cv2.CascadeClassifier(cascPathface)

    data = pickle.loads(open('face_enc', "rb").read())

    print("Streaming started")
    # video_capture = cv2.VideoCapture(0)

    # ret, fr = video_capture.read()
    gray = cv2.cvtColor(fr, cv2.COLOR_BGR2GRAY)

    gray = improve.adjust_dark_spots(gray)
    gray = improve.adjust_brightness(gray)

    faces = faceCascade.detectMultiScale(gray,scaleFactor=1.1, minNeighbors=6,minSize=(160, 160), flags=cv2.CASCADE_SCALE_IMAGE)

    rgb = cv2.cvtColor(fr, cv2.COLOR_BGR2RGB)

    encodings = face_recognition.face_encodings(rgb) # fr
    face_encoding = json.loads(face_encoding)  # face_encodings

    # print("abc" , np.array(encodings).shape)

    if (np.array(encodings).shape)[0] == 0:
        # with open(os.path.join(os.getcwd() , 'face_results' ,  f'{str(id)}.txt') , 'w') as f:
        #     f.write("demo")
        # return False # when there's no one on the screen.
        NO_FACE = NO_FACE + 1 
        print('b')
        (identification_payload['total_snapshots'] , identification_payload['no_face'] , identification_payload['correct_face'] , identification_payload['wrong_face']) = (TOTAL_SNAPSHOTS , NO_FACE , CORRECT_FACE , WRONG_FACE)
        return identification_payload
        
    # print((np.array(encodings)[0]) , np.array(encodings))
    


    # if np.array(encodings)[0] == 0:
    #     print('hello')

    # print(len(encodings))
    # result = _.map_(np.array(face_encoding), lambda r: r == np.array(encodings)[0])
    # print(result)

    # print("Encodings :" , len(face_encoding))

    matches = 0
    for encoding in encodings:
        print('dsadadsasdaas')
        matches = face_recognition.compare_faces(face_encoding, encoding)

        print("MATCHES : " , matches)

        # name = "Unknown"
        
        # if True in matches:
        
        #     # print(matches)
        #     matchedIdxs = [i for (i, b) in enumerate(matches) if b]
        #     counts = {}
            
        #     # print(matchedIdxs)
        #     for i in matchedIdxs:
                
        #         name = data["name"][i]
        #         counts[name] = counts.get(name, 0) + 1

        #     name = max(counts, key=counts.get)

        # names.append(name)

    if count_condition(matches , lambda x: x == True) > len(matches)/2:
        CORRECT_FACE = CORRECT_FACE + 1
        print('a')
        # with open("face_identification.txt") as f:
        #     f.write('FACE VERIFIED')
        #     f.close()
        # return True # right shakal
    else:
        WRONG_FACE = WRONG_FACE + 1

    # return False
    # with open("face_identification.txt") as f:
    #     f.write('FACE NOT VERIFIED')
    #     f.close()
    #return False # wrong shakal

    (identification_payload['total_snapshots'] , identification_payload['no_face'] , identification_payload['correct_face'] , identification_payload['wrong_face']) = (TOTAL_SNAPSHOTS , NO_FACE , CORRECT_FACE , WRONG_FACE)
    return identification_payload
    
async def detect(fr):

    while(1):
        print(os.getcwd())
        if (os.getcwd().split('\\')[-1] != 'flask'):
            os.chdir('../')
        else:
            os.chdir(os.path.join(os.getcwd() , 'identification'))
            break;      
    print(os.getcwd())
    cascPathface = os.path.dirname(
    cv2.__file__) + "/data/haarcascade_frontalface_alt2.xml"

    faceCascade = cv2.CascadeClassifier(cascPathface)

    data = pickle.loads(open('face_enc', "rb").read())

    print("Streaming started")
    # video_capture = cv2.VideoCapture(0)

    # ret, fr = video_capture.read()
    gray = cv2.cvtColor(fr, cv2.COLOR_BGR2GRAY)

    gray = improve.adjust_dark_spots(gray)
    gray = improve.adjust_brightness(gray)

    faces = faceCascade.detectMultiScale(gray,scaleFactor=1.1, minNeighbors=6,minSize=(160, 160), flags=cv2.CASCADE_SCALE_IMAGE)

    rgb = cv2.cvtColor(fr, cv2.COLOR_BGR2RGB)

    encodings = face_recognition.face_encodings(rgb)
    names = []

    #sleep(1)
    print('Data Encodings : ' , data['encodings'])
    
    for encoding in encodings:
        print('dsadadsasdaas')
        matches = face_recognition.compare_faces(data["encodings"], encoding)
    
        name = "Unknown"
        
        if True in matches:
        
            # print(matches)
            matchedIdxs = [i for (i, b) in enumerate(matches) if b]
            counts = {}
            
            # print(matchedIdxs)
            for i in matchedIdxs:
                
                name = data["name"][i]
                counts[name] = counts.get(name, 0) + 1

            name = max(counts, key=counts.get)

        names.append(name)
    
        for ((x, y, w, h), name) in zip(faces, names):
            cv2.rectangle(fr, (x, y), (x + w, y + h), (0, 255, 0), 2)
            cv2.putText(fr, name, (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.75, (0, 255, 0), 2)

        # with open("test.txt", "r") as file:
        #     lines = [line.rstrip() for line in file]
        # file.close()

        # with open("test.txt", "a") as file:
        #     for obj in detections:
        #         if obj not in lines:
        #             file.write(obj + '\n')
        print(names)
        print('DSADAKSKDSAKDKSAD') 

        with open("test.txt", "r") as file:
            lines = [line.rstrip() for line in file]
        file.close()

        with open("test.txt", "a") as file:
            for obj in names:
                if obj not in lines:
                    file.write(obj + '\n')

        # cv2.imshow("Detector", fr)
        # cv2.waitKey(0)
        # cv2.destroyAllWindows()
