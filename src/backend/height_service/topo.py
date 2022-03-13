from importlib.util import module_for_loader
from tokenize import group
import numpy as np
from sklearn.cluster import DBSCAN
from PIL import Image
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
#%matplotlib inline
import geojson as gj
from operator import itemgetter
from scipy.spatial import distance

class TopoEvaluator:

    def __init__(self, fimgs = {}):
        self.fimgs_nm = list(fimgs.keys())
        self.fimgs = list(fimgs.values())

    def __preprocess_img(self, img):
        img_data = np.asarray(img)
        data = []
        for x in range(img.width):
            for y in range(img.height):
                z = int(3 * img_data[x][y][2] + 2 * img_data[x][y][1] + img_data[x][y][0])
                data.append((x, y, z))
        return data


    def __clusterize(self, data):
        model = DBSCAN(eps=2.5, min_samples=2, algorithm='ball_tree', n_jobs=4)
        model.fit(data)
        # print(f'# clusters: {len(set(model.labels_))}')
        # print(f'labels {model.labels_}')
        return dict(filter(lambda e: e[1] >= 0, zip(data, model.labels_)))


    def __draw_clusters(self, clusters, centroids=None):
        coords = np.array([list(t) for t in clusters.keys()])
        fig = plt.figure()
        ax = Axes3D(fig)
        ax.scatter(coords.T[0], coords.T[1], coords.T[2], c=list(float(f) for f in clusters.values()), s=30)
        if centroids:
            for cluster_id in set(clusters.values()):
                centroid = centroids[cluster_id]
                ax.scatter(centroid[0], centroids[1], centroids[2], c=[100, 100, 100], s=50)
        ax.view_init(azim=200)
        plt.show()


    '''
    Given a set of clusters of the form  { cluter_id : [ (x, y), .. ] }
    calculates the centroids of the clusters
    '''
    def __estimate_centroids(self, clusters):
        clusters_with_centroids = {}
        for cluster_id, coords3d in clusters.items():
            clusters_with_centroids[cluster_id] = tuple(np.mean(coords3d, axis=0))
        return clusters_with_centroids


    '''
    Accepts clusters = { cluster_id : [ (x, y, z), (x1, y1, z1), ... ] }
    Produces { cluster_id : [ (x, y), .. ] } where (x,y) are euclidean coords
    '''
    def __group_clusters(self, clusters):
        grouped = {}
        for coords, cluster_id in clusters.items():
            if cluster_id not in grouped:
                grouped[cluster_id] = [coords]
            else:
                grouped[cluster_id].append(coords)
        return grouped


    '''
    Accepts clusters = { cluster_id : [ (x, y, z), (x1, y1, z1), ... ] }
    Creates a map containing the probability for each position of the cluster to be
    appropriate for landing.
    Returns [ a1, a2, a3, a4, ...] where aN е [0; 1]
    '''
    def __make_probab_map(self, grouped_clusters, centroids):
        probab_map = {}
        # print("Centroids")
        for cluster_id in grouped_clusters.keys():
            cluster_prob_map = {}
            cluster_centroid = centroids[cluster_id]
            total_coords3d = grouped_clusters[cluster_id]
            for coords in total_coords3d:
                dist = distance.euclidean(cluster_centroid, coords)
                cluster_prob_map[tuple(coords)] = dist
            cluster_prob_map = dict(sorted(cluster_prob_map.items(), key = itemgetter(1)))
            assert len(list(cluster_prob_map.values())) > 0
            max_dist = max(cluster_prob_map.values())
            # print(f"#{cluster_id}: cluster_prob_map = {cluster_prob_map}")
            for k, _ in cluster_prob_map.items():
                cluster_prob_map[k] /= max_dist
            probab_map[cluster_id] = cluster_prob_map
        return probab_map


    '''
    Accepts clusters of the form { cluster_id : [ (x, y, z), (x1, y1, z1), ... ] } and map with probabilities.
    Selects points which should be passed back to gateway for rendering.
    '''
    def __geoborders(self, grouped_clusters, probab_map):
        N = 4
        gb = {}
        for cluster_id, coords3d in grouped_clusters.items():
            gb[cluster_id] = list(probab_map[cluster_id].keys())[:N]
        return gb

    '''
    Performs a single step of the evaluation algorithm.
    Called multiple times by eval().
    '''
    def __single_step(self, img: Image):
        data = self.__preprocess_img(img)
        clusters = self.__clusterize(data)
        grouped_clusters = self.__group_clusters(clusters)
        centroids = self.__estimate_centroids(grouped_clusters)
        probab_map = self.__make_probab_map(grouped_clusters, centroids)
        gb = self.__geoborders(grouped_clusters, probab_map)
        return probab_map, gb


    def eval(self):
        result = {}
        for i, fimg in enumerate(self.fimgs):
            result[self.fimgs_nm[i]] = self.__single_step(fimg)
        return result
