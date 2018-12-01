# About

This is Frontend for Gifbudka. App connect with backend. You can check it [here](https://bitbucket.org/shot-me/gifbudka-server/src/master/)

## Creating GIFs

Gifs are created from pictures which are made by [webcam](https://bitbucket.org/shot-me/gifbudka-box/src/master/docs/webcam.md) or [camera](https://bitbucket.org/shot-me/gifbudka-box/src/master/docs/camera.md).

If you want to change URL for backend change proccess.env.NODE_ENV. On NODE_ENV = `production` you'll able to use `http://192.168.99.100` and on NODE_ENV = `dev` you'll able to use `http://localhost`

## GIFs lifecycle

Ready to send GIFs are kept on `gif/gifs` catalog. Our backend listen this catalog in equal time intervals. Based on different GIF ids backend know which pictures have been sent and which are to send.

## Services

Web App - port: 3002
Generate Service - port: 3003
Print Service - port: 3004
Test Service - port: 3005