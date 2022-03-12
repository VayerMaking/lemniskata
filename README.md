# lemniskata
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

