import numpy as np
from sklearn.cluster import DBSCAN
from PIL import Image
import matplotlib.pyplot as plt

img = Image.open('0.jpg')
img_data = np.asarray(img)

data = []

for x in range(img.width):
    new_data = []
    for y in range(img.height):
        z = 3 * img_data[x][y][2] + 2 * img_data[x][y][1] + img_data[x][y]
        new_data.append(x, y, calc_height())
        data.append(new_data)

clustering = DBSCAN(eps=0.7, min_samples=2).fit(new_data)
core_samples_mask[clustering.core_sample_indices_] = True
labels = clustering.labels_
core_samples_mask = np.zeros_like(labels, dtype=bool)
n_clusters_ = len(set(labels)) - (1 if -1 in labels else 0)
n_noise_ = list(labels).count(-1)

unique_labels = set(labels)
colors = [plt.cm.Spectral(each) for each in np.linspace(0, 1, len(unique_labels))]
for k, col in zip(unique_labels, colors):
    if k == -1:
        # Black used for noise.
        col = [0, 0, 0, 1]

    class_member_mask = labels == k

    xy = X[class_member_mask & core_samples_mask]
    plt.plot(
        xy[:, 0],
        xy[:, 1],
        "o",
        markerfacecolor=tuple(col),
        markeredgecolor="k",
        markersize=14,
    )

    xy = X[class_member_mask & ~core_samples_mask]
    plt.plot(
        xy[:, 0],
        xy[:, 1],
        "o",
        markerfacecolor=tuple(col),
        markeredgecolor="k",
        markersize=6,
    )

plt.title("Estimated number of clusters: %d" % n_clusters_)
plt.show()
