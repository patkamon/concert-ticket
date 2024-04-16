
# CONCERT RESERVATION


# Installment
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
