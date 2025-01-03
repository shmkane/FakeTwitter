# IOTA Messenger (Twitter Clone)

## Background  
The goal of this project was to gain hands-on experience with **AWS EC2** by building a simple social media platform. The application, hosted here (unless the instance has expired): [IOTA Messenger](http://twitter.shmkane.com), allows users to post, share messages, and interact through a lightweight web interface.

## Features  
- **Dynamic Express server** connected to **MongoDB** via **Monk** for real-time data management.
- **Multi-user functionality**, enabling posting and sharing of messages and media.
- **Basic RESTful API** with **GET**, **DELETE**, and **POST** endpoints to manage posts.
- **Frontend** built with simple **HTML/CSS/JS**, fetching data from the server and rendering it dynamically.
- **Rate-limited API** with a "bad words" filter to maintain civility (thanks to some less-than-civil friends).
- Originally called **Idiot Messenger** for personal use, the project was renamed due to a typo, resulting in the unique name **IOTA Messenger**.
- Hosted on an **AWS EC2 instance** for scalable and cost-effective cloud deployment.

If the link above is no longer active, it means the EC2 instance has likely expired. Here's a screenshot of the platform in action:

![IOTA Messenger Screenshot](https://github.com/user-attachments/assets/f8f4b6e9-fe90-49f3-92c2-d2eef59a446b)

## Technologies Used  
- **Node.js** and **Express** for server-side functionality.
- **MongoDB** with **Monk** for database management.
- **AWS EC2** for cloud hosting.
- **HTML/CSS/JS** for the simple frontend.
- **Rate limiting** and **bad words filter** for moderation.

### Purpose  
Designed as a personal project to explore cloud hosting and full-stack development, this app demonstrates a basic social platform with a server-side API and real-time data handling. Ideal for showcasing practical use of **AWS EC2**, **MongoDB**, and **RESTful architecture** in a web application.
