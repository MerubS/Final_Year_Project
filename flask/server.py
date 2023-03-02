from flask import Flask, request
from flask_socketio import SocketIO, emit, join_room , send
from gaze.convImage import showImage
import gaze.tracking as tracking
from identification.train import train_model
import base64
from PIL import Image
import cv2
import numpy as np
import io , os
import asyncio
# from multiprocessing import Process
import requests , json
from dotenv import load_dotenv
from identification.main import detect
from yolo.inference import perform_inference
import tracemalloc

tracemalloc.start()
load_dotenv()

class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)

app = Flask(__name__)
app.secret_key = 'random secret key!'
socketio = SocketIO(app, cors_allowed_origins="*",max_http_buffer_size=10 * 1024 * 1024,async_mode='eventlet')

@app.route('/', methods=['GET'])
def index():
    print('Called')
    url = "http://{}:{}/get_data_stream".format(os.environ.get("SERVER_BASE_URL") , os.environ.get("SERVER_PORT"))
    x = requests.post(url , data = json.dumps({'abc' :'abcd'}) , headers = {'Content-Type': 'application/json'})
    print(x)
    return "..."

@socketio.on('connect')
def connect(data):
    print('Connected')


@socketio.on('register_user')
def register_user(payload):

    data = payload['data']
    id = payload['id']
    count = payload['count']

    imgdata = base64.b64decode(data)
    img = Image.open(io.BytesIO(imgdata))

    print(os.getcwd())
        
    if (os.getcwd().split('\\')[-1] != str(id)):
        if not os.path.exists(os.path.join(os.getcwd() ,  'identification' , 'images' , str(id))):
            print(os.getcwd())
            os.mkdir(os.path.join(os.getcwd() , 'identification' , 'images' , str(id)))

        if os.path.isdir(os.path.join(os.getcwd() , 'identification' , 'images' , str(id))):
            print('1')
            os.chdir(os.path.join(os.getcwd() , 'identification' , 'images' , str(id)))

    print(os.getcwd())
    img.save('{}.jpg'.format(str(count)))

    if count == 29:
        encodings = train_model()
        # print((encodings))
        encodings = json.dumps(encodings, cls=NumpyEncoder)
        # encodings = json.loads(encodings)     
        print(encodings)
        emit('ADD_User_Encodings' , (encodings))
        # print("MODEL RESULT " , train_model())
        # socketio.stop()
        print('All Done')

# IDENTIFICATION
@socketio.on('identification')
def get_identification(payload):

    print(payload["gaze_payload"])
    face_encoding = payload["face_encoding"]
    data = payload['data']
    id = payload['id']
    message = payload['message']
    print(message)

    imgdata = base64.b64decode(data)
    img = Image.open(io.BytesIO(imgdata))
    print("KHIZPUR")

    print(payload['gaze_payload'])
    asyncio.run(tracking.identify(np.array(img)))
    payload['gaze_payload'] = asyncio.run(tracking.main_func(np.array(img) , payload['gaze_payload']))
    asyncio.run(detect(np.array(img)))
    asyncio.run(perform_inference(img))

    while(1):
        if (os.getcwd().split('\\')[-1] != 'flask'):
            os.chdir('../')
        else:
            break;   

    with open(os.path.join(os.getcwd() , 'identification' , 'test.txt')) as f1 , open(os.path.join(os.getcwd() , 'gaze' , 'test.txt')) as f2 , open(os.path.join(os.getcwd() , 'gaze' , 'test.txt')) as f3:
        identification_result = f1.read()
        gaze_result = f2.read()
        inference_result = f3.read()

    print(identification_result)
    print(gaze_result)
    print(inference_result)
    
    if message == 'TEST ENDED':
        message = 'ACKNOWLEDGE'
        with open(os.path.join(os.getcwd() , 'identification' , 'test.txt') , 'w') as f1 , open(os.path.join(os.getcwd() , 'gaze' , 'test.txt') , 'w') as f2 , open(os.path.join(os.getcwd() , 'yolo' , 'results.txt') , 'w') as f3:
            f1.write('')
            f2.write('')
            f3.write('')

    emit('SEND_LIVE_STREAM' , (identification_result , gaze_result , inference_result , message , payload['gaze_payload'] , face_encoding))

@socketio.on_error_default
def default_error_handler(e):
    print("Error: {}".format(e))
    socketio.stop()

if __name__ == '__main__':
    print('SERVER STARTED')
    socketio.run(app, host="0.0.0.0", port=9000)
