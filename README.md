# REACT Application with Pre-render State v2.0 

## Docker - Development Environment

If you do not want to use docker on your system skip this step, but it is recommended that
you use docker, to avoid conflicting dependencies

To start the docker development environment with webpack watch run:

```
docker-compose up
```


This compiles the assets and runs the application at:

```
http://localhost:3000
````

Webpack watch will also be running to reflect any changes made during development


## Docker - Production Build

To build the production version of the application

```
docker build -t <name of container> -f Dockerfile.prod .
```
To test the production build

```
docker run --name app -p 80:3000 <name of container>
```

## Run a local environment for development
### 1. Fork the repository to your Github
Everyone should use his own repository to develop a new feature, and then make a `pull request` (PR) for requesting merging the code into master branch. So, first of all, you should click the `Fork` button which is at the top-left of the Github to make a new copy of the repository to your own.
[Screenshot](https://drive.google.com/open?id=0B7nEHGVPFeE9dG5tc1VQdmJKbkk)

### 2. Clone the code into your local environment
Use `Git clone` to clone a mirror copy of code to your dist (Run the command on your terminal):
`git clone https://github.com/[YOUR BRANCH NAME]/SDMFrontEnd.git`

### 3. Set up node related packages
Move into the product directory, and then install all the node packages by running:
`npm install`

### 4. Running web servers
`npm run dev-server`
By default, the server will be started at **http://127.0.0.1:3000**
If the port 3000 has been taken, you can find the application which is using that port by `lsof -i:3000`. Then, kill that application and try to run the server again.

### 5. Auto-compiling while development
`npm run dev`

In addition, all the availible scripts can be found at `package.json`.
