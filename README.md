# About

This is Frontend for Gifbudka. App connect with backend. You can check it [here](https://bitbucket.org/shot-me/gifbudka-server/src/master/)

## Creating GIFs

Gifs are created from pictures which are made by [webcam](https://bitbucket.org/shot-me/gifbudka-box/src/master/docs/webcam.md) or [camera](https://bitbucket.org/shot-me/gifbudka-box/src/master/docs/camera.md)

## GIFs lifecycle

Ready to send GIFs are kept on `gif/gifs` catalog. Our backend listen this catalog in equal time intervals. Based on different GIF ids backend know which pictures have been sent and which are to send.

## Deployment

To deploy our application we use Docker. You can find mor information [here](https://bitbucket.org/shot-me/gifbudka-box/src/master/docs/docker.md)
