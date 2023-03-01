import os

async def perform_inference(img):

    while(1):
        print(os.getcwd())
        if (os.getcwd().split('\\')[-1] != 'flask'):
            os.chdir('../')
        else:
            os.chdir(os.path.join(os.getcwd() , 'yolo'))
            break;    
    print(os.getcwd())
    img.save(os.path.join('Inference','1.jpg'))

    os.system("python yolov5/detect.py --weights yolov5s.pt --img 416 --conf 0.6 --source \"Inference\\1.jpg\" --device cpu")


    objects = ["cell phone", "remote", "laptop", 'person']

    detections = []
    lines = []

    with open("detections.txt", "r") as file:
        lines = [line.rstrip() for line in file]
    file.close()
  
    if len(lines) > 0:

        for obj in lines:
            if (obj in objects and obj not in detections):
                
                if (obj == "person" and lines.count("person") > 1):
                    detections.append("person")
                
                elif (obj == "person" and lines.count("person") == 1):
                    continue

                else:
                    detections.append(obj)


    with open("results.txt", "r") as file:
        lines = [line.rstrip() for line in file]
    file.close()

    with open("results.txt", "a") as file:
            for obj in detections:
                if obj not in lines:
                    file.write(obj + '\n')

    file.close()
