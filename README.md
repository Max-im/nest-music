# Nest Music

## Features

- nest
- postgres
- typeorm
- next
- react

## Track

| method | url                  | body                                                                     | description        |
| ------ | -------------------- | ------------------------------------------------------------------------ | ------------------ |
| POST   | /tracks              | {name: string, artist: string, text: string, picture: file, audio: file} | create track       |
| GET    | /tracks              |                                                                          | get all tracks     |
| GET    | /tracks/search?query |                                                                          | search tracks      |
| GET    | /tracks/:id          |                                                                          | get current track  |
| DELETE | /tracks/:id          |                                                                          | delete track by id |
| POST   | /tracks/comment      | {username: string, text: string, trackId: string}                        | create comment     |
| PUT    | /tracks/listen/:id   |                                                                          | listen track       |
