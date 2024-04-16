
# CONCERT RESERVATION


# Installment  
 - both using node version 18.19.0 (nvm use 18.19.0)
 - navigate to backend using `cd ./backend` command
 - run `npm i`
 - Configure your user and password of mysql in `app.module.ts`
 - run backend `npm run start:dev`
 - make sure backend run on port 3000
 - open another terminal and navigate to client using `cd ./client` command
 - run `npm i` and `npm run dev`
 - make sure backend run on port 3001




# Overview

![alt text](https://github.com/patkamon/concert-ticket/blob/main/models.png)

The project consist of 2 models.   

            1. Concert
            2. Reservation

  Concert is keeping about the concert infomation. While reserve keep record of who reserve what concert.
  



# Library Dependencies 
  ***openapi-generator-cli:*** It's use to generate middleware to let client integrate more convinient. Simply run the command `openapi-generator-cli generate -i ./openapi.json -g typescript-axios -o ../client/client`.

  ***tailwind:*** Use for style react components.

  ***SweatAlert2:*** A pack of ready to use modals.

# Run unit test
 cd to backend directory and run `npm test`

# Bonus Task (Optional)
● Q: Express your opinion about how to optimize your website in case that this
website contains intensive data and when more people access, the lower speed
you get?    
                
       A: Create Loadbalancer, deploy multiple instances and do database index.   
● Express your opinion about how to handle when many users want to reserve the
ticket at the same time? We want to ensure that in the concerts there is no one
that needs to stand up during the show.

       A: Using message queue can helps manage the flow of requests and prevents overwhelming the system, such as rabbitMQ, kafka, aws sqs, etc.
