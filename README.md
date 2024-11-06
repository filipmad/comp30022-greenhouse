# Greenhouse

Greenhouse aims to provide a way to teach about the SDGs, along with informing them of the many career prospects that is offered. This website will not only help students learn about the SDGs, but also allow them to connect closer to the goals through finding relevant information from the real world, along with provide a fun and educational way through games and the garden and a way to communicate with others through the community and polls. 



 - React
 - Golang
 - Azure DB
 - Phaser.JS for games
 

## Prequisites

- Requires approval from Database firewall to access database communicaiton
## Installation
Step 1
Clone the repository
- git clone https://github.com/filipmad/comp30022-greenhouse.git


## Features
### Login Page
The login page is the first page that the user sees when logging in, users enter their username and password. If they don't have an account, they can make an account within the following page:
([Login Page](https://github.com/filipmad/comp30022-greenhouse/blob/main/img/login.png))
([Account Page](https://github.com/filipmad/comp30022-greenhouse/blob/main/img/create.png))


### Games Page
This Page has 3 games and 3 quizzes. The Quizzes are related to the SDG goals that the user can play the following games are:

 - CityScape 
 - Wordsearch
 - EcoAdventure

 ([Game Example](https://github.com/filipmad/comp30022-greenhouse/blob/main/img/games.png))



Users can earn in-game currency that can be used in the garden section.
### Information Page
This page contains all the information relating to the SDG goals, they are organized into three sections:
Economic, Social and Environmental. It also contains information about relevant careers and links for users to learn more about them.

 ([![Discover Page](img\discover.png)](https://github.com/filipmad/comp30022-greenhouse/blob/main/img/discover.png))
 ([![Discover Page 2t](img\discover2.png)](https://github.com/filipmad/comp30022-greenhouse/blob/main/img/discover2.png))
([![aDiscover Page 3](img\discover3.png)](https://github.com/filipmad/comp30022-greenhouse/blob/main/img/discover3.png))


### Community Page
This page allows users to see all community posts and polls that they can vote on. Admins can create community posts and polls. Users can also see milestones and how to achieve those milestones. 
([![Community Page](img\community.png)](https://github.com/filipmad/comp30022-greenhouse/blob/main/img/community.png))


### News Page
This page allows users to look at news relating to the SDGS and the weekly newsletter.
([![News Page](img\news.png)](https://github.com/filipmad/comp30022-greenhouse/blob/main/img/news.png))


### Garden
This is a gameplay feature allowing for users to grow their plants.  Users can buy plants and plant them in the garden, where they can grow them. The plants relate to the SDG goals, and users will be allow to grow their plants bit by bit whenever they log in. There is also a tree that grows based upon the number of days the user logs in. 
([![Garden Page](img\garden.png)](https://github.com/filipmad/comp30022-greenhouse/blob/main/img/garden.png))

### Bug Report on Features:
The garden aims to be a way for the user to find some sort of accomplishment through learning the SDGs by allowing them to plant different plants that they can take care of through the currency earned throughout the website. Furthermore, they can learn more through the description of the flowers about the SDGs goals. This will allow the user be able to encourage user retention. 

## Garden:
#1 - On load of the Garden, Garden doesn’t store the output of the streak from the database at all, only stores null 
Steps to reproduce – Click Start Game on Grow tab
Expected Result – Tree should have the streak number
Actual Result – Says undefined
Severity - Medium
#2 - On load of the Garden, Garden doesn’t receive the output of the garden positions from the database correctly
Steps to reproduce – Click Start Game on Grow tab 
Expected Result – Receiving the output of what plants the user has that are growing in a Json struct 
Actual Result – Receives nothing  
Severity - High

#3 - Garden can’t open shop due to the Garden being unable to get the positions from it
Steps to reproduce – Click the door that has the arrow pointing in it on Garden 
Expected Result – Brings you to the shop page
Actual Result – Nothing happens
Severity - High

Garden can’t plant plants and sell plants at the moment due to being unable to buy plants at the store

Games: 
#4 -  Cityscape doesn’t store the stats properly 
Steps to reproduce – Click Save button within the CityScape game 
Expected Result – Game should save the result of the player
Actual Result – Does Nothing
Severity – Medium
#5 -  Cityscape doesn’t store the stats properly
Steps to reproduce – Load Cityscape
Expected Result – Game should show their stats 
Actual Result – Does Nothing
Severity – Medium

CI/CD
Due to a change in platform, the  CI/CD Pipeline needs changing for future releases 


# Features to be added:
Password recovery aims to recover the password for the user if the user forgets their passwords and wants a new password. 
The steps that the user would take would be as follows:
User would go to the forget password page and enter their email
An email would be sent to the user with a code to enter into the next page and 
User would enter the code into the following page: enter code 
User would need to enter a new password and re-enter the same password to ensure they know the password.
Password is updated in the backend and user will be brought back to the login page




