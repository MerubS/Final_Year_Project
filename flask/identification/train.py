from imutils import paths
import face_recognition
import pickle
import cv2
import os
import numpy

# name = input('Enter Name : ')
def train_model():
    print("Out : ",os.getcwd())
    while(1):
        print(os.getcwd())
        if (os.getcwd().split('\\')[-1] != 'flask'):
            os.chdir('../')
        else:
            os.chdir(os.path.join(os.getcwd() , 'identification'))
            break;  
       
    print("Out : ",os.getcwd())


    imagePaths = list(paths.list_images('images'))
    print(imagePaths)
    data = {}
    encodings = []
    names = []

    if os.path.exists('face_enc'):
        data = pickle.loads(open('face_enc', "rb").read())

        encodings = data['encodings']
        names = data['name']

    for (i, imagePath) in enumerate(imagePaths):
        print(imagePath)
        image = cv2.imread(imagePath)
        rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        root, name = os.path.dirname(imagePath).split('\\')

        print(name)

        boxes = face_recognition.face_locations(rgb,model='hog')
        img_encodings = face_recognition.face_encodings(rgb, boxes)
        
        for encoding in img_encodings:
            encodings.append(encoding)
            names.append(name)
        
    
    data = {'encodings' : encodings, 'name' : names}
    # data[name] = encodings
    print('Data : ' , numpy.array(encodings).shape , numpy.array(names).shape)
    with open('face_enc', 'wb') as fp:
        pickle.dump(data, fp)
    
    os.chdir('../')

    return encodings
