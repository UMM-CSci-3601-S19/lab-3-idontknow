Lab 3
By, Ananya Teklu and Nathan Foss

1. There are three .gitignore’s in this project. One of them is inside the Server direactory, and only contains two lines, build and !/src/libs/3601-lab3-todos.jar. The second .gitignore is inside the default project directory (just like the last project) and contains many of the same files that our old .gitignore contained. The third is inside the client folder, and contains retrictions on node/yarn, angular related things, and e2e test. We suspect there are multiple .gitignores because of the server/client seperateness in our project.

2. The build.gradle’s are located in the same folders as the gitignores. They are connected to the gitignores, in that they generate things for our project, and the corresponding gitignores prevent us from pushing those generated files to git, and cluttering everything up. We have multiple for the same reason we have multiple gitignores.

3. Server.java is creating routes between the API and the database, while the app.routes.ts is making the requests from the client to the API. 

4. 4. User-list.service.ts handles requests, and it's seperate from user-list.component because we want to allow other components to have access to this service. If we put it inside the component, this wouldn't be possible.
