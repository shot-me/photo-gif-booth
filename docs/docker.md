# Docker integration

## How to run container:

1. Use `docker build -t shotme/gifbudka-box .` to build your app.
2. Check if app built succeed using `$ docker images`.
   You should see this result

```
$ docker images

# Example
REPOSITORY                      TAG        ID              CREATED
node                            8          1934b0b038d1    5 days ago
shotme/gifbudka-box             latest     d64d3505b0d2    1 minute ago
```

3. Run: `docker run -p 8080:8080 shotme/gifbudka-box`.
4. To get container ID use `docker ps`.
5. If you need to go inside the container you can use the `exec` command:

```
# Enter the container
$ docker exec -it <container id> /bin/bash
```

## Upoading image to Docker Hub

Use `docker push shotme/gifbudka-box`

## Downloading from Docker Hub

To run production you need

```
docker run -v ///c/Users/gif/gifs:/app/gifs -v ///c/Users/gif/camera_output:/app/camera_output --restart on-failure -p 8080:8080 shotme/gifbudka-box
```

Where `///c/Users/gif/gifs` is the folder with newly created gifs and `///c/Users/gif/camera_output` is the folder where new photos should go to

## Stop restating Docker container

Use docker update `--restart=no <CONTAINER ID>` to stop restart container.
