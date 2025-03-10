## Docker Build Command

To build a Docker image with the specified `<imageName>` and `<version-tag>`, you can use the following command:

```bash
docker build -t <imageName>:<version-tag> .
```
To run the Docker image in Container, you can use the following command

```bash 
docker run -p <host-port>:<container-port> <image-name>
```
