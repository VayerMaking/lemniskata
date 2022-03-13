# lemniskata
![image](https://user-images.githubusercontent.com/36764968/158046288-e8b3962d-2cea-414d-a077-8712512da75c.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Latest release](https://img.shields.io/github/v/release/VayerMaking/lemniskata?include_prereleases&label=latest)](https://img.shields.io/github/v/release/VayerMaking/lemniskata?include_prereleases&label=latest)
[![Vercel App](https://vercelbadge.vercel.app/api/VayerMaking/lemniskata?style=flat)](https://vercelbadge.vercel.app/api/VayerMaking/lemniskata?style=flat)

This is the Lemniskata project - a system designed to guide the landing process on space objects. 

It analyzes the probability that of the certain positions are favourable for landing. 

## Basics
The anlysis is based on multiple criterias including weather and terrain. The most important factors are whether there are dust storms and whether there are any slopes.

## Architecture
Each evaluating service is divided in a separate Docker container. The height map is generated based on the DBSCAN clustering. The algorithm separates a given topographical map on areas and evaluates its likeliness to be good enough for landing based on its slope (every plane is considered good, regardless of its exact height).

For the weather analysis is build upon the NASA's API data from the [InSight Mission](https://mars.nasa.gov/insight/weather/).

There's also a user interface from which additional requirements are provided by the user.
It displays the map of the object and works analogically to Google Maps's GUI.

![arch](https://user-images.githubusercontent.com/36995171/158045783-9d4ae068-3c0f-43f9-a595-d0daf1bb65e6.png)

## Presentation
![SpaceMaps](https://user-images.githubusercontent.com/36995171/158045339-7a4cb86b-bb72-4d15-ad10-a43eb31b8e03.jpg)
![SpaceMaps(1)](https://user-images.githubusercontent.com/36995171/158045335-f93ac483-2f99-475b-baeb-c744d1924efc.jpg)
![SpaceMaps(2)](https://user-images.githubusercontent.com/36995171/158045337-7281f5c1-5f49-4371-9709-a3d92ed91871.jpg)
![SpaceMaps(3)](https://user-images.githubusercontent.com/36995171/158045333-184cad74-d236-47e6-97e1-97ee78c1b992.jpg)
![SpaceMaps(8)](https://user-images.githubusercontent.com/36995171/158045468-71b1f3a5-7f99-4b28-b355-b6414a5183bc.jpg)
![SpaceMaps(7)](https://user-images.githubusercontent.com/36995171/158045470-47bcb04b-bfe8-40ab-9299-7e27caa5c0b4.jpg)
![SpaceMaps(5)](https://user-images.githubusercontent.com/36995171/158045475-cf8c12fa-07ed-4226-91f6-4cf209161089.jpg)
![SpaceMaps(4)](https://user-images.githubusercontent.com/36995171/158045477-f75bdcc6-64a5-46ff-ab0f-4c9a927ff3ab.jpg)
![SpaceMaps(3)](https://user-images.githubusercontent.com/36995171/158045482-665095ab-898f-4097-bfd5-61137eefb319.jpg)
![SpaceMaps(2)](https://user-images.githubusercontent.com/36995171/158045484-29bc14de-a3a9-4050-803e-5c28b62ec0a0.jpg)
![SpaceMaps(1)](https://user-images.githubusercontent.com/36995171/158045488-73d1e080-aebd-414f-b80f-263f2ff9c57b.jpg)

## Credits
<a href="https://www.flaticon.com/free-icons/planet" title="planet icons">Planet icons created by Freepik - Flaticon</a>
