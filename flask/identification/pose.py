import cv2
import mediapipe as mp
import numpy as np

async def direction(image):

    # image = cv2.imread("c.jpg")

    mp_face_mesh = mp.solutions.face_mesh
    face_mesh = mp_face_mesh.FaceMesh(static_image_mode=True, max_num_faces=10, refine_landmarks=True, min_detection_confidence=0.5)


    image = cv2.cvtColor(cv2.flip(image, 1), cv2.COLOR_BGR2RGB)

    image.flags.writeable = False


    results = face_mesh.process(image)
    image.flags.writeable = True

    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    img_h, img_w, img_c = image.shape
    face_3d = []
    face_2d = []


    if results.multi_face_landmarks:

        if(len(results.multi_face_landmarks) > 1):
            text = "too many faces"
            print(text)
            return text

            

        for face_landmarks in results.multi_face_landmarks:
            for idx, lm in enumerate(face_landmarks.landmark):

                x, y = int(lm.x * img_w), int(lm.y * img_h)
                face_2d.append([x, y])
                face_3d.append([x, y, lm.z])       
            
            face_2d = np.array(face_2d, dtype=np.float64)
            face_3d = np.array(face_3d, dtype=np.float64)

            focal_length = 1 * img_w

            cam_matrix = np.array([ [focal_length, 0, img_h / 2], [0, focal_length, img_w / 2], [0, 0, 1]])

            dist_matrix = np.zeros((4, 1), dtype=np.float64)
            success, rot_vec, trans_vec = cv2.solvePnP(face_3d, face_2d, cam_matrix, dist_matrix)


            rmat, jac = cv2.Rodrigues(rot_vec)
            angles, mtxR, mtxQ, Qx, Qy, Qz = cv2.RQDecomp3x3(rmat)

            x = angles[0] * 360
            y = angles[1] * 360
            z = angles[2] * 360
            

            if y < -20:
                text = "left"
            elif y > 5:
                text = "right"
            elif x < -20:
                text = ""
            elif x > 20:
                text = ""
            else:
                text = "forward"


            ###### output is here


    else:
        text = "none"
    
    return text    

