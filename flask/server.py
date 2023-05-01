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
from multiprocessing import Process
import requests , json
from dotenv import load_dotenv
from identification.main import detect, identify
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
    identification_payload = payload["identification_payload"]
    face_encoding = payload["face_encoding"]
    data = payload['data']
    id = payload['id']
    message = payload['message']
    print(message)

    imgdata = base64.b64decode(data)
    img = Image.open(io.BytesIO(imgdata))
    print("KHIZPUR")

    print(payload['gaze_payload'])
    payload["identification_payload"] = asyncio.run(identify(np.array(img) , face_encoding , payload['id'] , identification_payload))
    payload['gaze_payload'] = asyncio.run(tracking.main_func(np.array(img) , payload['gaze_payload']))
    # asyncio.run(detect(np.array(img)))
    asyncio.run(perform_inference(img , id))

    while(1):
        if (os.getcwd().split('\\')[-1] != 'flask'):
            os.chdir('../')
        else:
            break;   

    (rightmovement,leftmovement,nomovement) = (payload['gaze_payload']['right_movement'], payload['gaze_payload']['left_movement'], payload['gaze_payload']['no_movement'])
    totalmovement = rightmovement+leftmovement+nomovement
    gaze_result = "Left Movement = "+str(leftmovement) + "\nNo Movement = "+ str(nomovement)+"\nRight Movement = "+str(rightmovement)+"\n\nLeft Movement "+str(round((leftmovement/totalmovement)*100,2))+"%"\
            +"\nNo Movement "+str(round((nomovement/totalmovement)*100,2))+"%"+"\nRight Movement "+str(round((rightmovement/totalmovement)*100,2))+"%"
            # with open(os.path.join(os.getcwd() , 'identification' , 'face_results' , f'{str(id)}.txt') , 'w') as f1 , open(os.path.join(os.getcwd() , 'gaze' , 'gaze_results' , f'{str(id)}.txt') , 'w') as f2 , open(os.path.join(os.getcwd() , 'yolo' , 'results.txt') , 'w') as f3:

    
    (total,no_face,correct_face,wrong_face) = (payload['identification_payload']['total_snapshots'], payload['identification_payload']['no_face'], payload['identification_payload']['correct_face'], payload['identification_payload']['wrong_face'])
    identification_result = "Correct Face = "+str(correct_face) + "\nNo Face = "+ str(no_face)+"\nWrong Face = "+str(wrong_face)+"\n\Correct Face "+str(round((correct_face/total)*100,2))+"%"\
        +"\nNo Face "+str(round((no_face/total)*100,2))+"%"+"\nWrong Face "+str(round((wrong_face/totalmovement)*100,2))+"%"
    
    with open(os.path.join(os.getcwd() , 'yolo' , 'results' , f'{str(id)}.txt') , 'r') as f:
            inference_result = f.read()

    if message == 'TEST ENDED':
        message = 'ACKNOWLEDGE'
        # with open(os.path.join(os.getcwd() , 'identification' , 'test.txt') , 'w') as f1 , open(os.path.join(os.getcwd() , 'gaze' , 'test.txt') , 'w') as f2 , open(os.path.join(os.getcwd() , 'yolo' , 'results.txt') , 'w') as f3:
        #     f1.write('')
        #     f2.write('')
        #     f3.write('')
        
        with open(os.path.join(os.getcwd() , 'gaze' , 'gaze_results' , f'{str(id)}.txt') , 'w') as f1:
            (rightmovement,leftmovement,nomovement) = (payload['gaze_payload']['right_movement'], payload['gaze_payload']['left_movement'], payload['gaze_payload']['no_movement'])
            totalmovement = rightmovement+leftmovement+nomovement
            f1.write(f"Left Movement = "+str(leftmovement) + "\nNo Movement = "+ str(nomovement)+"\nRight Movement = "+str(rightmovement)+"\n\nLeft Movement "+str(round((leftmovement/totalmovement)*100,2))+"%"\
            +"\nNo Movement "+str(round((nomovement/totalmovement)*100,2))+"%"+"\nRight Movement "+str(round((rightmovement/totalmovement)*100,2))+"%")
        
        with open(os.path.join(os.getcwd() ,'identification' , 'face_results' , f'{str(id)}.txt') , 'w') as f2:
            (total,no_face,correct_face,wrong_face) = (payload['identification_payload']['total_snapshots'], payload['identification_payload']['no_face'], payload['identification_payload']['correct_face'], payload['identification_payload']['wrong_face'])
            f2.write(f"Correct Face = "+str(correct_face) + "\nNo Face = "+ str(no_face)+"\nWrong Face = "+str(wrong_face)+"\n\Correct Face "+str(round((correct_face/total)*100,2))+"%"\
            +"\nNo Face "+str(round((no_face/total)*100,2))+"%"+"\nWrong Face "+str(round((wrong_face/totalmovement)*100,2))+"%")
                
        

    emit('SEND_LIVE_STREAM' , (identification_result, payload["identification_payload"]  , gaze_result , inference_result , message , payload['gaze_payload'] , face_encoding))

@socketio.on_error_default
def default_error_handler(e):
    print("Error: {}".format(e))
    socketio.stop()

if __name__ == '__main__':
    print('SERVER STARTED')
    socketio.run(app, host="0.0.0.0", port=9000)
