from importlib.util import module_for_loader
import numpy as np
from sklearn.cluster import DBSCAN
from PIL import Image
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
#%matplotlib inline


def preprocess_img(fimg_name):
    img = Image.open(fimg_name)
    img_data = np.asarray(img)
    data = []
    for x in range(img.width):
        for y in range(img.height):
            z = int(3 * img_data[x][y][2] + 2 * img_data[x][y][1] + img_data[x][y][0])
            data.append([x, y, z])
    return np.array(data)
    
def cluster(data):
    model = DBSCAN(eps=2.5, min_samples=2, algorithm='ball_tree', n_jobs=4)
    model.fit_predict(data)
    pred = model.fit_predict(data)
    print(f'# clusters: {len(set(model.labels_))}')
    print(f'labels {model.labels_}')
    # to_rem = []
    # for idx, l in enumerate(model.labels_):
    #     if l == -1:
    #         to_rem.append(idx)
    # for r_idx in to_rem:
    #     del model.labels_[r_idx]
    #     del data[r_idx]
    return model.labels_

def draw_cluster(data, labels):
    fig = plt.figure()
    ax = Axes3D(fig)
    ax.scatter(data.T[0], data.T[1], data.T[2], c=labels, s=3)
    ax.view_init(azim=200)
    plt.show()