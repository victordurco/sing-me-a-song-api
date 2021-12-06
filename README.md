# Sing Me A Song API 🎶

An api made for you to recommend songs and receive recommendations

## Documentation 🧾

### Get recommendation

```
GET /recommendations/random
```

#### Possible responses

```bash
- 200: Success
```

#### What you will receive from this route

```jsx
{
  "id": recommendationId,
  "name": recommendationName,
  "youtube_link": recommendationLink,
  "score": recommendationScore
}
```

if you get nothing from this request with a 200 status, it is because there is no music registered yet

---

### Get top songs

```
GET /recommendations/top/:amount
```

#### Possible response status

```bash
- 400: You have sent a invalid amount
- 200: Success
```

#### What you will receive from this route

```jsx
[
  {
    "id": recommendationId,
    "name": recommendationName,
    "youtube_link": recommendationLink,
    "score": recommendationScore
  },
]
```

---

### Recommend song

```
POST /recommendations
```

#### Expected body

```jsx
{
  name: String, at least 2 characters, 
  youtube_link: String, must be a valid youtube link
}
```

#### Possible response status

```bash
- 400: You have sent a invalid body, check your params
- 409: This music name or link is already been recommended
- 201: Success
```

---

### Upvote song

```
POST /recommendations/:recommendation_id/upvote
```

#### Possible response status

```bash
- 400: You have sent a invalid id
- 404: The recommendation does not exist
- 204: Success
```

---

### Downvote song

```
POST /recommendations/:recommendation_id/downvote
```

#### Possible response status

```bash
- 400: You have sent a invalid id
- 404: The recommendation does not exist
- 204: Success
```

---

## How to run in your machine 🖥️

```
git clone https://github.com/victordurco/sing-me-a-song-api
```

```
cd sing-me-a-song-api
```

```
npm i 
```

Create a .env.dev file and fill it using your environment variables following the .env.dev.example</a>

### In your terminal

```
sudo su postgres
```

```
psql
```

```
CREATE DATABASE sing_me_a_song
```

```
\c sing_me_a_song
```

Copy everything in the DUMP.sql file and paste on the terminal</br>
You can not exit the postgres admin, and run

```
npm run start:dev
```

</br>

## How to run the tests in your machine 🖥️

Create a .env.test file and fill it using your environment variables following the .env.test.example file

### In your terminal

```
sudo su postgres
```

```
psql
```

```
CREATE DATABASE sing_me_a_song_test;
```

```
\c sing_me_a_song_test
```

Copy everything in the DUMP.sql file and paste on the terminal</br>

You can not exit the postgres admin, and run

```
npm run test
```

</br>
  
  
## Deployment 🚀

<p align="center"><a  href="https://api--singmeasong.herokuapp.com/">You can interact with the server running on this link</a></p>

</br>

## Tech Stack 🧮 

<p align="center">
    <img alt="javascript" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/>
<img alt="postgres" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
<img alt="nodejs" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
<img alt="npm" src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"/>
<img alt="jest" src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
<img alt="expressjs" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
<img alt="eslinter" src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white"/>

</p>

<br>

---


