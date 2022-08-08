# Nest Music

## Features

- nest
- postgres
- typeorm

## Track

| method | url             | body                                              | description        |
| ------ | --------------- | ------------------------------------------------- | ------------------ |
| POST   | /tracks         | {name: string, artist: string, text: string}      | create track       |
| GET    | /tracks         |                                                   | get all tracks     |
| GET    | /tracks/:id     |                                                   | get current track  |
| DELETE | /tracks/:id     |                                                   | delete track by id |
| POST   | /tracks/comment | {username: string, text: string, trackId: string} | create comment     |
