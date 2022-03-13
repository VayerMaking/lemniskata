# lemniskata
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Latest release](https://img.shields.io/github/v/release/VayerMaking/lemniskata?include_prereleases&label=latest)](https://img.shields.io/github/v/release/VayerMaking/lemniskata?include_prereleases&label=latest)


The current repo consists of a repo for project of team Lemniskata of Hack TUES Infinity (Hack TUES 8). This is an analyzer of the probability that a certain piece of the planet Mars is favourable for landing. 

## Factors for evaluation
The current criteria that are used are:
1. Weather (if currently there are dust storms in the region)
2. Height map. We highly prefer platos over slopes

However, the user is able to tell their preferences regarding the coefficients concerning the weight of each parameter. This forms a mathematical function. For instance:
> 2 * height_map + 1.5 * weather_storms 

## Architecture

Each evaluating service is divided in a separate Docker container. The height map is generated based on the DBSCAN clustering. The algorithm separates a given topographical map on areas and evaluates its likeliness to be good enough for landing based on its slope (every plane is considered good, regardless of its exact height).

For the weather analysis is build upon the NASA's API data from the [InSight Mission](https://mars.nasa.gov/insight/weather/).

There's also a frontend from which the coefficients could be supplied. The map there works analogically to Google Maps's dragging through the planet.

![Untitled Diagram drawio(2)](https://user-images.githubusercontent.com/36995171/158036757-20c2d760-f166-436f-bbfb-90f496fcabc7.png)

## Presentation
![Copy of SpaceMaps](https://user-images.githubusercontent.com/36995171/158045339-7a4cb86b-bb72-4d15-ad10-a43eb31b8e03.jpg)
![Copy of SpaceMaps(1)](https://user-images.githubusercontent.com/36995171/158045335-f93ac483-2f99-475b-baeb-c744d1924efc.jpg)
![Copy of SpaceMaps(2)](https://user-images.githubusercontent.com/36995171/158045337-7281f5c1-5f49-4371-9709-a3d92ed91871.jpg)
![Copy of SpaceMaps(3)](https://user-images.githubusercontent.com/36995171/158045333-184cad74-d236-47e6-97e1-97ee78c1b992.jpg)

![Copy of SpaceMaps(8)](https://user-images.githubusercontent.com/36995171/158045468-71b1f3a5-7f99-4b28-b355-b6414a5183bc.jpg)
![Copy of SpaceMaps(7)](https://user-images.githubusercontent.com/36995171/158045470-47bcb04b-bfe8-40ab-9299-7e27caa5c0b4.jpg)

![SpaceMaps(5)](https://user-images.githubusercontent.com/36995171/158045475-cf8c12fa-07ed-4226-91f6-4cf209161089.jpg)
![SpaceMaps(4)](https://user-images.githubusercontent.com/36995171/158045477-f75bdcc6-64a5-46ff-ab0f-4c9a927ff3ab.jpg)
![SpaceMaps(3)](https://user-images.githubusercontent.com/36995171/158045482-665095ab-898f-4097-bfd5-61137eefb319.jpg)
![SpaceMaps(2)](https://user-images.githubusercontent.com/36995171/158045484-29bc14de-a3a9-4050-803e-5c28b62ec0a0.jpg)


![SpaceMaps(1)](https://user-images.githubusercontent.com/36995171/158045488-73d1e080-aebd-414f-b80f-263f2ff9c57b.jpg)



