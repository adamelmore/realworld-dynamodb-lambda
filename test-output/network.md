```
DELETE /__TESTUTILS__/purge
```
```
200 OK

"Purged all data!"
```
# Article
```
POST /users

{
  "user": {
    "email": "author--z2gk7d@email.com",
    "username": "author--z2gk7d",
    "password": "password"
  }
}
```
```
200 OK

{
  "user": {
    "email": "author--z2gk7d@email.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF1dGhvci0tejJnazdkIiwiaWF0IjoxNjIyNTE1NTQ5LCJleHAiOjE2MjI2ODgzNDl9.QX3YFINeAzzpXMoFEhWEw3Tp4aONITtqFU8lLKTCIeU",
    "username": "author--z2gk7d",
    "bio": "",
    "image": ""
  }
}
```
```
POST /users

{
  "user": {
    "email": "authoress-lw5brt@email.com",
    "username": "authoress-lw5brt",
    "password": "password"
  }
}
```
```
200 OK

{
  "user": {
    "email": "authoress-lw5brt@email.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF1dGhvcmVzcy1sdzVicnQiLCJpYXQiOjE2MjI1MTU1NDksImV4cCI6MTYyMjY4ODM0OX0.6SJt_sl4pkRxFvtbjfH93YAam9FcsLn4qJhWSAo2w4A",
    "username": "authoress-lw5brt",
    "bio": "",
    "image": ""
  }
}
```
```
POST /users

{
  "user": {
    "email": "non-author-gvk9ww@email.com",
    "username": "non-author-gvk9ww",
    "password": "password"
  }
}
```
```
200 OK

{
  "user": {
    "email": "non-author-gvk9ww@email.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5vbi1hdXRob3ItZ3ZrOXd3IiwiaWF0IjoxNjIyNTE1NTQ5LCJleHAiOjE2MjI2ODgzNDl9.zWy76vqYK0ccZl0MJb5vV0RBSeQ3mSfvs3qODjrwVBY",
    "username": "non-author-gvk9ww",
    "bio": "",
    "image": ""
  }
}
```
## Create
### should create article
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body"
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-9edjup",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1622515549495,
    "updatedAt": 1622515549495,
    "author": {
      "username": "author--z2gk7d",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
### should create article with tags
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "tag_a",
      "tag_b"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-gfkfjo",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1622515549534,
    "updatedAt": 1622515549534,
    "author": {
      "username": "author--z2gk7d",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "tag_a",
      "tag_b"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
### should disallow unauthenticated user
```
POST /articles

{}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Must be logged in."
    ]
  }
}
```
### should enforce required fields
```
POST /articles

{}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Article must be specified."
    ]
  }
}
```
```
POST /articles

{
  "article": {}
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "title must be specified."
    ]
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title"
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "description must be specified."
    ]
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description"
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "body must be specified."
    ]
  }
}
```
## Get
### should get article by slug
```
GET /articles/title-9edjup
```
```
200 OK

{
  "article": {
    "createdAt": 1622515549495,
    "author": {
      "username": "author--z2gk7d",
      "bio": "",
      "image": "",
      "following": false
    },
    "description": "description",
    "title": "title",
    "body": "body",
    "slug": "title-9edjup",
    "updatedAt": 1622515549495,
    "tagList": [],
    "favoritesCount": 0,
    "favorited": false
  }
}
```
### should get article with tags by slug
```
GET /articles/title-gfkfjo
```
```
200 OK

{
  "article": {
    "tagList": [
      "tag_a",
      "tag_b"
    ],
    "createdAt": 1622515549534,
    "author": {
      "username": "author--z2gk7d",
      "bio": "",
      "image": "",
      "following": false
    },
    "description": "description",
    "title": "title",
    "body": "body",
    "slug": "title-gfkfjo",
    "updatedAt": 1622515549534,
    "favoritesCount": 0,
    "favorited": false
  }
}
```
### should disallow unknown slug
```
GET /articles/auz89
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Article not found: [auz89]"
    ]
  }
}
```
## Update
### should update article
```
PUT /articles/title-gfkfjo

{
  "article": {
    "title": "newtitle"
  }
}
```
```
200 OK

{
  "article": {
    "tagList": [
      "tag_a",
      "tag_b"
    ],
    "createdAt": 1622515549534,
    "author": {
      "username": "author--z2gk7d",
      "bio": "",
      "image": "",
      "following": false
    },
    "description": "description",
    "title": "newtitle",
    "body": "body",
    "slug": "title-gfkfjo",
    "updatedAt": 1622515549534,
    "favoritesCount": 0,
    "favorited": false
  }
}
```
```
PUT /articles/title-gfkfjo

{
  "article": {
    "description": "newdescription"
  }
}
```
```
200 OK

{
  "article": {
    "tagList": [
      "tag_a",
      "tag_b"
    ],
    "createdAt": 1622515549534,
    "author": {
      "username": "author--z2gk7d",
      "bio": "",
      "image": "",
      "following": false
    },
    "description": "newdescription",
    "title": "newtitle",
    "body": "body",
    "slug": "title-gfkfjo",
    "updatedAt": 1622515549534,
    "favoritesCount": 0,
    "favorited": false
  }
}
```
```
PUT /articles/title-gfkfjo

{
  "article": {
    "body": "newbody"
  }
}
```
```
200 OK

{
  "article": {
    "tagList": [
      "tag_a",
      "tag_b"
    ],
    "createdAt": 1622515549534,
    "author": {
      "username": "author--z2gk7d",
      "bio": "",
      "image": "",
      "following": false
    },
    "description": "newdescription",
    "title": "newtitle",
    "body": "newbody",
    "slug": "title-gfkfjo",
    "updatedAt": 1622515549534,
    "favoritesCount": 0,
    "favorited": false
  }
}
```
### should disallow missing mutation
```
PUT /articles/title-gfkfjo

{}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Article mutation must be specified."
    ]
  }
}
```
### should disallow empty mutation
```
PUT /articles/title-gfkfjo

{
  "article": {}
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "At least one field must be specified: [title, description, article]."
    ]
  }
}
```
### should disallow unauthenticated update
```
PUT /articles/title-gfkfjo

{
  "article": {
    "title": "newtitle"
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Must be logged in."
    ]
  }
}
```
### should disallow updating non-existent article
```
PUT /articles/foo-title-gfkfjo

{
  "article": {
    "title": "newtitle"
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Article not found: [foo-title-gfkfjo]"
    ]
  }
}
```
### should disallow non-author from updating
```
PUT /articles/title-gfkfjo

{
  "article": {
    "title": "newtitle"
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Article can only be updated by author: [author--z2gk7d]"
    ]
  }
}
```
## Favorite
### should favorite article
```
POST /articles/title-9edjup/favorite

{}
```
```
200 OK

{
  "article": {
    "createdAt": 1622515549495,
    "author": {
      "username": "author--z2gk7d",
      "bio": "",
      "image": "",
      "following": false
    },
    "description": "description",
    "title": "title",
    "body": "body",
    "slug": "title-9edjup",
    "updatedAt": 1622515549495,
    "favoritedBy": [
      "non-author-gvk9ww"
    ],
    "favoritesCount": 1,
    "tagList": [],
    "favorited": true
  }
}
```
```
GET /articles/title-9edjup
```
```
200 OK

{
  "article": {
    "createdAt": 1622515549495,
    "author": {
      "username": "author--z2gk7d",
      "bio": "",
      "image": "",
      "following": false
    },
    "description": "description",
    "title": "title",
    "body": "body",
    "favoritesCount": 1,
    "slug": "title-9edjup",
    "updatedAt": 1622515549495,
    "tagList": [],
    "favorited": true
  }
}
```
### should disallow favoriting by unauthenticated user
```
POST /articles/title-9edjup/favorite

{}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Must be logged in."
    ]
  }
}
```
### should disallow favoriting unknown article
```
POST /articles/title-9edjup_foo/favorite

{}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Article not found: [title-9edjup_foo]"
    ]
  }
}
```
### should unfavorite article
```
DELETE /articles/title-9edjup/favorite
```
```
200 OK

{
  "article": {
    "createdAt": 1622515549495,
    "author": {
      "username": "author--z2gk7d",
      "bio": "",
      "image": "",
      "following": false
    },
    "description": "description",
    "title": "title",
    "body": "body",
    "favoritesCount": 0,
    "slug": "title-9edjup",
    "updatedAt": 1622515549495,
    "tagList": [],
    "favorited": false
  }
}
```
## Delete
### should delete article
```
DELETE /articles/title-9edjup
```
```
200 OK

{}
```
```
GET /articles/title-9edjup
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Article not found: [title-9edjup]"
    ]
  }
}
```
### should disallow deleting by unauthenticated user
```
DELETE /articles/foo
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Must be logged in."
    ]
  }
}
```
### should disallow deleting unknown article
```
DELETE /articles/foobar
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Article not found: [foobar]"
    ]
  }
}
```
### should disallow deleting article by non-author
```
DELETE /articles/title-gfkfjo
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Article can only be deleted by author: [author--z2gk7d]"
    ]
  }
}
```
## List
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "5xxyov",
      "tag_0",
      "tag_mod_2_0",
      "tag_mod_3_0"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-5alest",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1622515550211,
    "updatedAt": 1622515550211,
    "author": {
      "username": "authoress-lw5brt",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "5xxyov",
      "tag_0",
      "tag_mod_2_0",
      "tag_mod_3_0"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "cavjyp",
      "tag_1",
      "tag_mod_2_1",
      "tag_mod_3_1"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-qagr34",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1622515550250,
    "updatedAt": 1622515550250,
    "author": {
      "username": "author--z2gk7d",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "cavjyp",
      "tag_1",
      "tag_mod_2_1",
      "tag_mod_3_1"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "ucght6",
      "tag_2",
      "tag_mod_2_0",
      "tag_mod_3_2"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-b98kkb",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1622515550270,
    "updatedAt": 1622515550270,
    "author": {
      "username": "authoress-lw5brt",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "ucght6",
      "tag_2",
      "tag_mod_2_0",
      "tag_mod_3_2"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "n2xq8d",
      "tag_3",
      "tag_mod_2_1",
      "tag_mod_3_0"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-g8kr5o",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1622515550289,
    "updatedAt": 1622515550289,
    "author": {
      "username": "author--z2gk7d",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "n2xq8d",
      "tag_3",
      "tag_mod_2_1",
      "tag_mod_3_0"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "gdgt1o",
      "tag_4",
      "tag_mod_2_0",
      "tag_mod_3_1"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-es4odx",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1622515550313,
    "updatedAt": 1622515550313,
    "author": {
      "username": "authoress-lw5brt",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "gdgt1o",
      "tag_4",
      "tag_mod_2_0",
      "tag_mod_3_1"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "5c8t01",
      "tag_5",
      "tag_mod_2_1",
      "tag_mod_3_2"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-f97xln",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1622515550336,
    "updatedAt": 1622515550336,
    "author": {
      "username": "author--z2gk7d",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "5c8t01",
      "tag_5",
      "tag_mod_2_1",
      "tag_mod_3_2"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "5emcz6",
      "tag_6",
      "tag_mod_2_0",
      "tag_mod_3_0"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-1cjyc0",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1622515550357,
    "updatedAt": 1622515550357,
    "author": {
      "username": "authoress-lw5brt",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "5emcz6",
      "tag_6",
      "tag_mod_2_0",
      "tag_mod_3_0"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "6h87ju",
      "tag_7",
      "tag_mod_2_1",
      "tag_mod_3_1"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-g85ubh",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1622515550377,
    "updatedAt": 1622515550377,
    "author": {
      "username": "author--z2gk7d",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "6h87ju",
      "tag_7",
      "tag_mod_2_1",
      "tag_mod_3_1"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "o7ie8n",
      "tag_8",
      "tag_mod_2_0",
      "tag_mod_3_2"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-f7nked",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1622515550409,
    "updatedAt": 1622515550409,
    "author": {
      "username": "authoress-lw5brt",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "o7ie8n",
      "tag_8",
      "tag_mod_2_0",
      "tag_mod_3_2"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "w81l5e",
      "tag_9",
      "tag_mod_2_1",
      "tag_mod_3_0"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-pth2xe",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1622515550432,
    "updatedAt": 1622515550432,
    "author": {
      "username": "author--z2gk7d",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "w81l5e",
      "tag_9",
      "tag_mod_2_1",
      "tag_mod_3_0"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "h34cks",
      "tag_10",
      "tag_mod_2_0",
      "tag_mod_3_1"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-ojstp3",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1622515550453,
    "updatedAt": 1622515550453,
    "author": {
      "username": "authoress-lw5brt",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "h34cks",
      "tag_10",
      "tag_mod_2_0",
      "tag_mod_3_1"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "n6j7i7",
      "tag_11",
      "tag_mod_2_1",
      "tag_mod_3_2"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-pa5ux6",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1622515550473,
    "updatedAt": 1622515550473,
    "author": {
      "username": "author--z2gk7d",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "n6j7i7",
      "tag_11",
      "tag_mod_2_1",
      "tag_mod_3_2"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "7j1qkw",
      "tag_12",
      "tag_mod_2_0",
      "tag_mod_3_0"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-jkgzl7",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1622515550491,
    "updatedAt": 1622515550491,
    "author": {
      "username": "authoress-lw5brt",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "7j1qkw",
      "tag_12",
      "tag_mod_2_0",
      "tag_mod_3_0"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "5y4lxy",
      "tag_13",
      "tag_mod_2_1",
      "tag_mod_3_1"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-91rpb",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1622515550514,
    "updatedAt": 1622515550514,
    "author": {
      "username": "author--z2gk7d",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "5y4lxy",
      "tag_13",
      "tag_mod_2_1",
      "tag_mod_3_1"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "xsxdlr",
      "tag_14",
      "tag_mod_2_0",
      "tag_mod_3_2"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-w8ykmd",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1622515550534,
    "updatedAt": 1622515550534,
    "author": {
      "username": "authoress-lw5brt",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "xsxdlr",
      "tag_14",
      "tag_mod_2_0",
      "tag_mod_3_2"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "64z36z",
      "tag_15",
      "tag_mod_2_1",
      "tag_mod_3_0"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-t4ohp",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1622515550559,
    "updatedAt": 1622515550559,
    "author": {
      "username": "author--z2gk7d",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "64z36z",
      "tag_15",
      "tag_mod_2_1",
      "tag_mod_3_0"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "gap4xa",
      "tag_16",
      "tag_mod_2_0",
      "tag_mod_3_1"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-2dqpjv",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1622515550582,
    "updatedAt": 1622515550582,
    "author": {
      "username": "authoress-lw5brt",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "gap4xa",
      "tag_16",
      "tag_mod_2_0",
      "tag_mod_3_1"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "6curtc",
      "tag_17",
      "tag_mod_2_1",
      "tag_mod_3_2"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-o7z4l6",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1622515550605,
    "updatedAt": 1622515550605,
    "author": {
      "username": "author--z2gk7d",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "6curtc",
      "tag_17",
      "tag_mod_2_1",
      "tag_mod_3_2"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "7zrcb0",
      "tag_18",
      "tag_mod_2_0",
      "tag_mod_3_0"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-90pwjr",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1622515550624,
    "updatedAt": 1622515550624,
    "author": {
      "username": "authoress-lw5brt",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "7zrcb0",
      "tag_18",
      "tag_mod_2_0",
      "tag_mod_3_0"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body",
    "tagList": [
      "5wtvqz",
      "tag_19",
      "tag_mod_2_1",
      "tag_mod_3_1"
    ]
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-fp0y67",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1622515550644,
    "updatedAt": 1622515550644,
    "author": {
      "username": "author--z2gk7d",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [
      "5wtvqz",
      "tag_19",
      "tag_mod_2_1",
      "tag_mod_3_1"
    ],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
### should list articles
```
GET /articles
```
```
200 OK

{
  "articles": [
    {
      "tagList": [
        "5wtvqz",
        "tag_19",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550644,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-fp0y67",
      "updatedAt": 1622515550644,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "7zrcb0",
        "tag_18",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1622515550624,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-90pwjr",
      "updatedAt": 1622515550624,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "6curtc",
        "tag_17",
        "tag_mod_2_1",
        "tag_mod_3_2"
      ],
      "createdAt": 1622515550605,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-o7z4l6",
      "updatedAt": 1622515550605,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "gap4xa",
        "tag_16",
        "tag_mod_2_0",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550582,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-2dqpjv",
      "updatedAt": 1622515550582,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "64z36z",
        "tag_15",
        "tag_mod_2_1",
        "tag_mod_3_0"
      ],
      "createdAt": 1622515550559,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-t4ohp",
      "updatedAt": 1622515550559,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "tag_14",
        "tag_mod_2_0",
        "tag_mod_3_2",
        "xsxdlr"
      ],
      "createdAt": 1622515550534,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-w8ykmd",
      "updatedAt": 1622515550534,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "5y4lxy",
        "tag_13",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550514,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-91rpb",
      "updatedAt": 1622515550514,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "7j1qkw",
        "tag_12",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1622515550491,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-jkgzl7",
      "updatedAt": 1622515550491,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "n6j7i7",
        "tag_11",
        "tag_mod_2_1",
        "tag_mod_3_2"
      ],
      "createdAt": 1622515550473,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-pa5ux6",
      "updatedAt": 1622515550473,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "h34cks",
        "tag_10",
        "tag_mod_2_0",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550453,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-ojstp3",
      "updatedAt": 1622515550453,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "tag_9",
        "tag_mod_2_1",
        "tag_mod_3_0",
        "w81l5e"
      ],
      "createdAt": 1622515550432,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-pth2xe",
      "updatedAt": 1622515550432,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "o7ie8n",
        "tag_8",
        "tag_mod_2_0",
        "tag_mod_3_2"
      ],
      "createdAt": 1622515550409,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-f7nked",
      "updatedAt": 1622515550409,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "6h87ju",
        "tag_7",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550377,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-g85ubh",
      "updatedAt": 1622515550377,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "5emcz6",
        "tag_6",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1622515550357,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-1cjyc0",
      "updatedAt": 1622515550357,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "5c8t01",
        "tag_5",
        "tag_mod_2_1",
        "tag_mod_3_2"
      ],
      "createdAt": 1622515550336,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-f97xln",
      "updatedAt": 1622515550336,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "gdgt1o",
        "tag_4",
        "tag_mod_2_0",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550313,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-es4odx",
      "updatedAt": 1622515550313,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "n2xq8d",
        "tag_3",
        "tag_mod_2_1",
        "tag_mod_3_0"
      ],
      "createdAt": 1622515550289,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-g8kr5o",
      "updatedAt": 1622515550289,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "tag_2",
        "tag_mod_2_0",
        "tag_mod_3_2",
        "ucght6"
      ],
      "createdAt": 1622515550270,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-b98kkb",
      "updatedAt": 1622515550270,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "cavjyp",
        "tag_1",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550250,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-qagr34",
      "updatedAt": 1622515550250,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "5xxyov",
        "tag_0",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1622515550211,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-5alest",
      "updatedAt": 1622515550211,
      "favoritesCount": 0,
      "favorited": false
    }
  ]
}
```
### should list articles with tag
```
GET /articles?tag=tag_7
```
```
200 OK

{
  "articles": [
    {
      "tagList": [
        "6h87ju",
        "tag_7",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550377,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-g85ubh",
      "updatedAt": 1622515550377,
      "favoritesCount": 0,
      "favorited": false
    }
  ]
}
```
```
GET /articles?tag=tag_mod_3_2
```
```
200 OK

{
  "articles": [
    {
      "tagList": [
        "6curtc",
        "tag_17",
        "tag_mod_2_1",
        "tag_mod_3_2"
      ],
      "createdAt": 1622515550605,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-o7z4l6",
      "updatedAt": 1622515550605,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "tag_14",
        "tag_mod_2_0",
        "tag_mod_3_2",
        "xsxdlr"
      ],
      "createdAt": 1622515550534,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-w8ykmd",
      "updatedAt": 1622515550534,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "n6j7i7",
        "tag_11",
        "tag_mod_2_1",
        "tag_mod_3_2"
      ],
      "createdAt": 1622515550473,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-pa5ux6",
      "updatedAt": 1622515550473,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "o7ie8n",
        "tag_8",
        "tag_mod_2_0",
        "tag_mod_3_2"
      ],
      "createdAt": 1622515550409,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-f7nked",
      "updatedAt": 1622515550409,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "5c8t01",
        "tag_5",
        "tag_mod_2_1",
        "tag_mod_3_2"
      ],
      "createdAt": 1622515550336,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-f97xln",
      "updatedAt": 1622515550336,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "tag_2",
        "tag_mod_2_0",
        "tag_mod_3_2",
        "ucght6"
      ],
      "createdAt": 1622515550270,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-b98kkb",
      "updatedAt": 1622515550270,
      "favoritesCount": 0,
      "favorited": false
    }
  ]
}
```
### should list articles by author
```
GET /articles?author=authoress-lw5brt
```
```
200 OK

{
  "articles": [
    {
      "tagList": [
        "7zrcb0",
        "tag_18",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1622515550624,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-90pwjr",
      "updatedAt": 1622515550624,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "gap4xa",
        "tag_16",
        "tag_mod_2_0",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550582,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-2dqpjv",
      "updatedAt": 1622515550582,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "tag_14",
        "tag_mod_2_0",
        "tag_mod_3_2",
        "xsxdlr"
      ],
      "createdAt": 1622515550534,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-w8ykmd",
      "updatedAt": 1622515550534,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "7j1qkw",
        "tag_12",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1622515550491,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-jkgzl7",
      "updatedAt": 1622515550491,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "h34cks",
        "tag_10",
        "tag_mod_2_0",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550453,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-ojstp3",
      "updatedAt": 1622515550453,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "o7ie8n",
        "tag_8",
        "tag_mod_2_0",
        "tag_mod_3_2"
      ],
      "createdAt": 1622515550409,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-f7nked",
      "updatedAt": 1622515550409,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "5emcz6",
        "tag_6",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1622515550357,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-1cjyc0",
      "updatedAt": 1622515550357,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "gdgt1o",
        "tag_4",
        "tag_mod_2_0",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550313,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-es4odx",
      "updatedAt": 1622515550313,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "tag_2",
        "tag_mod_2_0",
        "tag_mod_3_2",
        "ucght6"
      ],
      "createdAt": 1622515550270,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-b98kkb",
      "updatedAt": 1622515550270,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "5xxyov",
        "tag_0",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1622515550211,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-5alest",
      "updatedAt": 1622515550211,
      "favoritesCount": 0,
      "favorited": false
    }
  ]
}
```
### should list articles favorited by user
```
GET /articles?favorited=non-author-gvk9ww
```
```
200 OK

{
  "articles": []
}
```
### should list articles by limit/offset
```
GET /articles?author=author--z2gk7d&limit=2
```
```
200 OK

{
  "articles": [
    {
      "tagList": [
        "5wtvqz",
        "tag_19",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550644,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-fp0y67",
      "updatedAt": 1622515550644,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "6curtc",
        "tag_17",
        "tag_mod_2_1",
        "tag_mod_3_2"
      ],
      "createdAt": 1622515550605,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-o7z4l6",
      "updatedAt": 1622515550605,
      "favoritesCount": 0,
      "favorited": false
    }
  ]
}
```
```
GET /articles?author=author--z2gk7d&limit=2&offset=2
```
```
200 OK

{
  "articles": [
    {
      "tagList": [
        "64z36z",
        "tag_15",
        "tag_mod_2_1",
        "tag_mod_3_0"
      ],
      "createdAt": 1622515550559,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-t4ohp",
      "updatedAt": 1622515550559,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "5y4lxy",
        "tag_13",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550514,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-91rpb",
      "updatedAt": 1622515550514,
      "favoritesCount": 0,
      "favorited": false
    }
  ]
}
```
### should list articles when authenticated
```
GET /articles
```
```
200 OK

{
  "articles": [
    {
      "tagList": [
        "5wtvqz",
        "tag_19",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550644,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-fp0y67",
      "updatedAt": 1622515550644,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "7zrcb0",
        "tag_18",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1622515550624,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-90pwjr",
      "updatedAt": 1622515550624,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "6curtc",
        "tag_17",
        "tag_mod_2_1",
        "tag_mod_3_2"
      ],
      "createdAt": 1622515550605,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-o7z4l6",
      "updatedAt": 1622515550605,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "gap4xa",
        "tag_16",
        "tag_mod_2_0",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550582,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-2dqpjv",
      "updatedAt": 1622515550582,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "64z36z",
        "tag_15",
        "tag_mod_2_1",
        "tag_mod_3_0"
      ],
      "createdAt": 1622515550559,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-t4ohp",
      "updatedAt": 1622515550559,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "tag_14",
        "tag_mod_2_0",
        "tag_mod_3_2",
        "xsxdlr"
      ],
      "createdAt": 1622515550534,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-w8ykmd",
      "updatedAt": 1622515550534,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "5y4lxy",
        "tag_13",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550514,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-91rpb",
      "updatedAt": 1622515550514,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "7j1qkw",
        "tag_12",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1622515550491,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-jkgzl7",
      "updatedAt": 1622515550491,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "n6j7i7",
        "tag_11",
        "tag_mod_2_1",
        "tag_mod_3_2"
      ],
      "createdAt": 1622515550473,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-pa5ux6",
      "updatedAt": 1622515550473,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "h34cks",
        "tag_10",
        "tag_mod_2_0",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550453,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-ojstp3",
      "updatedAt": 1622515550453,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "tag_9",
        "tag_mod_2_1",
        "tag_mod_3_0",
        "w81l5e"
      ],
      "createdAt": 1622515550432,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-pth2xe",
      "updatedAt": 1622515550432,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "o7ie8n",
        "tag_8",
        "tag_mod_2_0",
        "tag_mod_3_2"
      ],
      "createdAt": 1622515550409,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-f7nked",
      "updatedAt": 1622515550409,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "6h87ju",
        "tag_7",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550377,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-g85ubh",
      "updatedAt": 1622515550377,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "5emcz6",
        "tag_6",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1622515550357,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-1cjyc0",
      "updatedAt": 1622515550357,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "5c8t01",
        "tag_5",
        "tag_mod_2_1",
        "tag_mod_3_2"
      ],
      "createdAt": 1622515550336,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-f97xln",
      "updatedAt": 1622515550336,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "gdgt1o",
        "tag_4",
        "tag_mod_2_0",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550313,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-es4odx",
      "updatedAt": 1622515550313,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "n2xq8d",
        "tag_3",
        "tag_mod_2_1",
        "tag_mod_3_0"
      ],
      "createdAt": 1622515550289,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-g8kr5o",
      "updatedAt": 1622515550289,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "tag_2",
        "tag_mod_2_0",
        "tag_mod_3_2",
        "ucght6"
      ],
      "createdAt": 1622515550270,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-b98kkb",
      "updatedAt": 1622515550270,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "cavjyp",
        "tag_1",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550250,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-qagr34",
      "updatedAt": 1622515550250,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "5xxyov",
        "tag_0",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1622515550211,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": false
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-5alest",
      "updatedAt": 1622515550211,
      "favoritesCount": 0,
      "favorited": false
    }
  ]
}
```
### should disallow multiple of author/tag/favorited
```
GET /articles?tag=foo&author=bar
```
```
GET /articles?author=foo&favorited=bar
```
```
GET /articles?favorited=foo&tag=bar
```
## Feed
### should get feed
```
GET /articles/feed
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Only one of these can be specified: [tag, author, favorited]"
    ]
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Only one of these can be specified: [tag, author, favorited]"
    ]
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Only one of these can be specified: [tag, author, favorited]"
    ]
  }
}
```
```
200 OK

{
  "articles": []
}
```
```
POST /profiles/authoress-lw5brt/follow

{}
```
```
200 OK

{
  "profile": {
    "username": "authoress-lw5brt",
    "bio": "",
    "image": "",
    "following": true
  }
}
```
```
GET /articles/feed
```
```
200 OK

{
  "articles": [
    {
      "tagList": [
        "7zrcb0",
        "tag_18",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1622515550624,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-90pwjr",
      "updatedAt": 1622515550624,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "gap4xa",
        "tag_16",
        "tag_mod_2_0",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550582,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-2dqpjv",
      "updatedAt": 1622515550582,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "tag_14",
        "tag_mod_2_0",
        "tag_mod_3_2",
        "xsxdlr"
      ],
      "createdAt": 1622515550534,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-w8ykmd",
      "updatedAt": 1622515550534,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "7j1qkw",
        "tag_12",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1622515550491,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-jkgzl7",
      "updatedAt": 1622515550491,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "h34cks",
        "tag_10",
        "tag_mod_2_0",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550453,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-ojstp3",
      "updatedAt": 1622515550453,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "o7ie8n",
        "tag_8",
        "tag_mod_2_0",
        "tag_mod_3_2"
      ],
      "createdAt": 1622515550409,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-f7nked",
      "updatedAt": 1622515550409,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "5emcz6",
        "tag_6",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1622515550357,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-1cjyc0",
      "updatedAt": 1622515550357,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "gdgt1o",
        "tag_4",
        "tag_mod_2_0",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550313,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-es4odx",
      "updatedAt": 1622515550313,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "tag_2",
        "tag_mod_2_0",
        "tag_mod_3_2",
        "ucght6"
      ],
      "createdAt": 1622515550270,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-b98kkb",
      "updatedAt": 1622515550270,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "5xxyov",
        "tag_0",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1622515550211,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-5alest",
      "updatedAt": 1622515550211,
      "favoritesCount": 0,
      "favorited": false
    }
  ]
}
```
```
POST /profiles/author--z2gk7d/follow

{}
```
```
200 OK

{
  "profile": {
    "username": "author--z2gk7d",
    "bio": "",
    "image": "",
    "following": true
  }
}
```
```
GET /articles/feed
```
```
200 OK

{
  "articles": [
    {
      "tagList": [
        "5wtvqz",
        "tag_19",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550644,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-fp0y67",
      "updatedAt": 1622515550644,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "7zrcb0",
        "tag_18",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1622515550624,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-90pwjr",
      "updatedAt": 1622515550624,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "6curtc",
        "tag_17",
        "tag_mod_2_1",
        "tag_mod_3_2"
      ],
      "createdAt": 1622515550605,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-o7z4l6",
      "updatedAt": 1622515550605,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "gap4xa",
        "tag_16",
        "tag_mod_2_0",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550582,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-2dqpjv",
      "updatedAt": 1622515550582,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "64z36z",
        "tag_15",
        "tag_mod_2_1",
        "tag_mod_3_0"
      ],
      "createdAt": 1622515550559,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-t4ohp",
      "updatedAt": 1622515550559,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "tag_14",
        "tag_mod_2_0",
        "tag_mod_3_2",
        "xsxdlr"
      ],
      "createdAt": 1622515550534,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-w8ykmd",
      "updatedAt": 1622515550534,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "5y4lxy",
        "tag_13",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550514,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-91rpb",
      "updatedAt": 1622515550514,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "7j1qkw",
        "tag_12",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1622515550491,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-jkgzl7",
      "updatedAt": 1622515550491,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "n6j7i7",
        "tag_11",
        "tag_mod_2_1",
        "tag_mod_3_2"
      ],
      "createdAt": 1622515550473,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-pa5ux6",
      "updatedAt": 1622515550473,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "h34cks",
        "tag_10",
        "tag_mod_2_0",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550453,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-ojstp3",
      "updatedAt": 1622515550453,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "tag_9",
        "tag_mod_2_1",
        "tag_mod_3_0",
        "w81l5e"
      ],
      "createdAt": 1622515550432,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-pth2xe",
      "updatedAt": 1622515550432,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "o7ie8n",
        "tag_8",
        "tag_mod_2_0",
        "tag_mod_3_2"
      ],
      "createdAt": 1622515550409,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-f7nked",
      "updatedAt": 1622515550409,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "6h87ju",
        "tag_7",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550377,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-g85ubh",
      "updatedAt": 1622515550377,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "5emcz6",
        "tag_6",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1622515550357,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-1cjyc0",
      "updatedAt": 1622515550357,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "5c8t01",
        "tag_5",
        "tag_mod_2_1",
        "tag_mod_3_2"
      ],
      "createdAt": 1622515550336,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-f97xln",
      "updatedAt": 1622515550336,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "gdgt1o",
        "tag_4",
        "tag_mod_2_0",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550313,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-es4odx",
      "updatedAt": 1622515550313,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "n2xq8d",
        "tag_3",
        "tag_mod_2_1",
        "tag_mod_3_0"
      ],
      "createdAt": 1622515550289,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-g8kr5o",
      "updatedAt": 1622515550289,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "tag_2",
        "tag_mod_2_0",
        "tag_mod_3_2",
        "ucght6"
      ],
      "createdAt": 1622515550270,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-b98kkb",
      "updatedAt": 1622515550270,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "cavjyp",
        "tag_1",
        "tag_mod_2_1",
        "tag_mod_3_1"
      ],
      "createdAt": 1622515550250,
      "author": {
        "username": "author--z2gk7d",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-qagr34",
      "updatedAt": 1622515550250,
      "favoritesCount": 0,
      "favorited": false
    },
    {
      "tagList": [
        "5xxyov",
        "tag_0",
        "tag_mod_2_0",
        "tag_mod_3_0"
      ],
      "createdAt": 1622515550211,
      "author": {
        "username": "authoress-lw5brt",
        "bio": "",
        "image": "",
        "following": true
      },
      "description": "description",
      "title": "title",
      "body": "body",
      "slug": "title-5alest",
      "updatedAt": 1622515550211,
      "favoritesCount": 0,
      "favorited": false
    }
  ]
}
```
### should disallow unauthenticated feed
```
GET /articles/feed
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Must be logged in."
    ]
  }
}
```
## Tags
### should get tags
```
GET /tags
```
```
200 OK

{
  "tags": [
    "6h87ju",
    "tag_7",
    "tag_mod_2_1",
    "tag_mod_3_1",
    "cavjyp",
    "tag_1",
    "5c8t01",
    "tag_5",
    "tag_mod_3_2",
    "5y4lxy",
    "tag_13",
    "h34cks",
    "tag_10",
    "tag_mod_2_0",
    "o7ie8n",
    "tag_8",
    "5emcz6",
    "tag_6",
    "tag_mod_3_0",
    "6curtc",
    "tag_17",
    "tag_a",
    "tag_b",
    "64z36z",
    "tag_15",
    "gap4xa",
    "tag_16",
    "tag_14",
    "xsxdlr",
    "7zrcb0",
    "tag_18",
    "5xxyov",
    "tag_0",
    "n6j7i7",
    "tag_11",
    "7j1qkw",
    "tag_12",
    "tag_9",
    "w81l5e",
    "5wtvqz",
    "tag_19",
    "n2xq8d",
    "tag_3",
    "tag_2",
    "ucght6",
    "gdgt1o",
    "tag_4"
  ]
}
```
# Comment
```
POST /users

{
  "user": {
    "email": "author-qxv8th@email.com",
    "username": "author-qxv8th",
    "password": "password"
  }
}
```
```
200 OK

{
  "user": {
    "email": "author-qxv8th@email.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImF1dGhvci1xeHY4dGgiLCJpYXQiOjE2MjI1MTU1NTEsImV4cCI6MTYyMjY4ODM1MX0.3Ml5Rvl-g27CV7cubMZMeV2mRDkHOSYTeueZiDPOlTY",
    "username": "author-qxv8th",
    "bio": "",
    "image": ""
  }
}
```
```
POST /users

{
  "user": {
    "email": "commenter-4iadyo@email.com",
    "username": "commenter-4iadyo",
    "password": "password"
  }
}
```
```
200 OK

{
  "user": {
    "email": "commenter-4iadyo@email.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNvbW1lbnRlci00aWFkeW8iLCJpYXQiOjE2MjI1MTU1NTEsImV4cCI6MTYyMjY4ODM1MX0.YHro5UCm1AteqLTzWINdqTBIfA11W-FnDF6UtKHH5Ew",
    "username": "commenter-4iadyo",
    "bio": "",
    "image": ""
  }
}
```
```
POST /articles

{
  "article": {
    "title": "title",
    "description": "description",
    "body": "body"
  }
}
```
```
200 OK

{
  "article": {
    "slug": "title-iph4o",
    "title": "title",
    "description": "description",
    "body": "body",
    "createdAt": 1622515551432,
    "updatedAt": 1622515551432,
    "author": {
      "username": "author-qxv8th",
      "bio": "",
      "image": "",
      "following": false
    },
    "tagList": [],
    "favorited": false,
    "favoritesCount": 0
  }
}
```
## Create
### should create comment
```
POST /articles/title-iph4o/comments

{
  "comment": {
    "body": "test comment lwq3az"
  }
}
```
```
200 OK

{
  "comment": {
    "id": "82b237b2-43e6-41bb-a383-f5e5eaf39a69",
    "slug": "title-iph4o",
    "body": "test comment lwq3az",
    "createdAt": 1622515551459,
    "updatedAt": 1622515551459,
    "author": {
      "username": "commenter-4iadyo",
      "bio": "",
      "image": "",
      "following": false
    }
  }
}
```
```
POST /articles/title-iph4o/comments

{
  "comment": {
    "body": "test comment 99n8al"
  }
}
```
```
200 OK

{
  "comment": {
    "id": "6f2529c2-f1eb-48ce-bcaa-1bc16d676a3f",
    "slug": "title-iph4o",
    "body": "test comment 99n8al",
    "createdAt": 1622515551485,
    "updatedAt": 1622515551485,
    "author": {
      "username": "commenter-4iadyo",
      "bio": "",
      "image": "",
      "following": false
    }
  }
}
```
```
POST /articles/title-iph4o/comments

{
  "comment": {
    "body": "test comment ianpp"
  }
}
```
```
200 OK

{
  "comment": {
    "id": "1cfe7258-1f25-4ee6-b0b3-543579cc22ff",
    "slug": "title-iph4o",
    "body": "test comment ianpp",
    "createdAt": 1622515551508,
    "updatedAt": 1622515551508,
    "author": {
      "username": "commenter-4iadyo",
      "bio": "",
      "image": "",
      "following": false
    }
  }
}
```
```
POST /articles/title-iph4o/comments

{
  "comment": {
    "body": "test comment qfm0zq"
  }
}
```
```
200 OK

{
  "comment": {
    "id": "bbc71780-58d9-459f-9508-432609c15577",
    "slug": "title-iph4o",
    "body": "test comment qfm0zq",
    "createdAt": 1622515551538,
    "updatedAt": 1622515551538,
    "author": {
      "username": "commenter-4iadyo",
      "bio": "",
      "image": "",
      "following": false
    }
  }
}
```
```
POST /articles/title-iph4o/comments

{
  "comment": {
    "body": "test comment v1islb"
  }
}
```
```
200 OK

{
  "comment": {
    "id": "4ef8aef9-1a8d-4149-ac5f-0c239f934146",
    "slug": "title-iph4o",
    "body": "test comment v1islb",
    "createdAt": 1622515551572,
    "updatedAt": 1622515551572,
    "author": {
      "username": "commenter-4iadyo",
      "bio": "",
      "image": "",
      "following": false
    }
  }
}
```
```
POST /articles/title-iph4o/comments

{
  "comment": {
    "body": "test comment 3ncxb6"
  }
}
```
```
200 OK

{
  "comment": {
    "id": "0e796334-e6ac-4ad8-af3e-1c9c74e89543",
    "slug": "title-iph4o",
    "body": "test comment 3ncxb6",
    "createdAt": 1622515551594,
    "updatedAt": 1622515551594,
    "author": {
      "username": "commenter-4iadyo",
      "bio": "",
      "image": "",
      "following": false
    }
  }
}
```
```
POST /articles/title-iph4o/comments

{
  "comment": {
    "body": "test comment p4enho"
  }
}
```
```
200 OK

{
  "comment": {
    "id": "e61ae9cf-e8ae-4d6f-ba7a-93f60574d438",
    "slug": "title-iph4o",
    "body": "test comment p4enho",
    "createdAt": 1622515551626,
    "updatedAt": 1622515551626,
    "author": {
      "username": "commenter-4iadyo",
      "bio": "",
      "image": "",
      "following": false
    }
  }
}
```
```
POST /articles/title-iph4o/comments

{
  "comment": {
    "body": "test comment o4w4hh"
  }
}
```
```
200 OK

{
  "comment": {
    "id": "133981f1-87d5-4295-a032-45cd6483b184",
    "slug": "title-iph4o",
    "body": "test comment o4w4hh",
    "createdAt": 1622515551651,
    "updatedAt": 1622515551651,
    "author": {
      "username": "commenter-4iadyo",
      "bio": "",
      "image": "",
      "following": false
    }
  }
}
```
```
POST /articles/title-iph4o/comments

{
  "comment": {
    "body": "test comment 5u5s1a"
  }
}
```
```
200 OK

{
  "comment": {
    "id": "4fd8ee84-1083-4b01-a3c2-280458df46df",
    "slug": "title-iph4o",
    "body": "test comment 5u5s1a",
    "createdAt": 1622515551678,
    "updatedAt": 1622515551678,
    "author": {
      "username": "commenter-4iadyo",
      "bio": "",
      "image": "",
      "following": false
    }
  }
}
```
```
POST /articles/title-iph4o/comments

{
  "comment": {
    "body": "test comment mzof9m"
  }
}
```
```
200 OK

{
  "comment": {
    "id": "4c04a7b1-4b30-4b63-a087-817aefead0df",
    "slug": "title-iph4o",
    "body": "test comment mzof9m",
    "createdAt": 1622515551706,
    "updatedAt": 1622515551706,
    "author": {
      "username": "commenter-4iadyo",
      "bio": "",
      "image": "",
      "following": false
    }
  }
}
```
### should disallow unauthenticated user
```
POST /articles/title-iph4o/comments

{}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Must be logged in."
    ]
  }
}
```
### should enforce comment body
```
POST /articles/title-iph4o/comments

{}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Comment must be specified."
    ]
  }
}
```
### should disallow non-existent article
```
POST /articles/foobar/comments

{
  "comment": {
    "body": "test comment cuh66g"
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Article not found: [foobar]"
    ]
  }
}
```
## Get
### should get all comments for article
```
GET /articles/title-iph4o/comments
```
```
200 OK

{
  "comments": [
    {
      "createdAt": 1622515551678,
      "id": "4fd8ee84-1083-4b01-a3c2-280458df46df",
      "body": "test comment 5u5s1a",
      "slug": "title-iph4o",
      "author": {
        "username": "commenter-4iadyo",
        "bio": "",
        "image": "",
        "following": false
      },
      "updatedAt": 1622515551678
    },
    {
      "createdAt": 1622515551508,
      "id": "1cfe7258-1f25-4ee6-b0b3-543579cc22ff",
      "body": "test comment ianpp",
      "slug": "title-iph4o",
      "author": {
        "username": "commenter-4iadyo",
        "bio": "",
        "image": "",
        "following": false
      },
      "updatedAt": 1622515551508
    },
    {
      "createdAt": 1622515551594,
      "id": "0e796334-e6ac-4ad8-af3e-1c9c74e89543",
      "body": "test comment 3ncxb6",
      "slug": "title-iph4o",
      "author": {
        "username": "commenter-4iadyo",
        "bio": "",
        "image": "",
        "following": false
      },
      "updatedAt": 1622515551594
    },
    {
      "createdAt": 1622515551626,
      "id": "e61ae9cf-e8ae-4d6f-ba7a-93f60574d438",
      "body": "test comment p4enho",
      "slug": "title-iph4o",
      "author": {
        "username": "commenter-4iadyo",
        "bio": "",
        "image": "",
        "following": false
      },
      "updatedAt": 1622515551626
    },
    {
      "createdAt": 1622515551459,
      "id": "82b237b2-43e6-41bb-a383-f5e5eaf39a69",
      "body": "test comment lwq3az",
      "slug": "title-iph4o",
      "author": {
        "username": "commenter-4iadyo",
        "bio": "",
        "image": "",
        "following": false
      },
      "updatedAt": 1622515551459
    },
    {
      "createdAt": 1622515551572,
      "id": "4ef8aef9-1a8d-4149-ac5f-0c239f934146",
      "body": "test comment v1islb",
      "slug": "title-iph4o",
      "author": {
        "username": "commenter-4iadyo",
        "bio": "",
        "image": "",
        "following": false
      },
      "updatedAt": 1622515551572
    },
    {
      "createdAt": 1622515551538,
      "id": "bbc71780-58d9-459f-9508-432609c15577",
      "body": "test comment qfm0zq",
      "slug": "title-iph4o",
      "author": {
        "username": "commenter-4iadyo",
        "bio": "",
        "image": "",
        "following": false
      },
      "updatedAt": 1622515551538
    },
    {
      "createdAt": 1622515551706,
      "id": "4c04a7b1-4b30-4b63-a087-817aefead0df",
      "body": "test comment mzof9m",
      "slug": "title-iph4o",
      "author": {
        "username": "commenter-4iadyo",
        "bio": "",
        "image": "",
        "following": false
      },
      "updatedAt": 1622515551706
    },
    {
      "createdAt": 1622515551485,
      "id": "6f2529c2-f1eb-48ce-bcaa-1bc16d676a3f",
      "body": "test comment 99n8al",
      "slug": "title-iph4o",
      "author": {
        "username": "commenter-4iadyo",
        "bio": "",
        "image": "",
        "following": false
      },
      "updatedAt": 1622515551485
    },
    {
      "createdAt": 1622515551651,
      "id": "133981f1-87d5-4295-a032-45cd6483b184",
      "body": "test comment o4w4hh",
      "slug": "title-iph4o",
      "author": {
        "username": "commenter-4iadyo",
        "bio": "",
        "image": "",
        "following": false
      },
      "updatedAt": 1622515551651
    }
  ]
}
```
## Delete
### should delete comment
```
DELETE /articles/title-iph4o/comments/82b237b2-43e6-41bb-a383-f5e5eaf39a69
```
```
200 OK

{}
```
### only comment author should be able to delete comment
```
DELETE /articles/title-iph4o/comments/6f2529c2-f1eb-48ce-bcaa-1bc16d676a3f
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Only comment author can delete: [commenter-4iadyo]"
    ]
  }
}
```
### should disallow unauthenticated user
```
DELETE /articles/title-iph4o/comments/6f2529c2-f1eb-48ce-bcaa-1bc16d676a3f
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Must be logged in."
    ]
  }
}
```
### should disallow deleting unknown comment
```
DELETE /articles/title-iph4o/comments/foobar_id
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Comment ID not found: [foobar_id]"
    ]
  }
}
```
# User
## Create
### should create user
```
POST /users

{
  "user": {
    "email": "user1-0.yqegpe9z2r@email.com",
    "username": "user1-0.yqegpe9z2r",
    "password": "password"
  }
}
```
```
200 OK

{
  "user": {
    "email": "user1-0.yqegpe9z2r@email.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxLTAueXFlZ3BlOXoyciIsImlhdCI6MTYyMjUxNTU1MSwiZXhwIjoxNjIyNjg4MzUxfQ.ftZ_IsP5VpolaGNUtcxk8ZDffgA3nBu6Gfhz0i1xbbo",
    "username": "user1-0.yqegpe9z2r",
    "bio": "",
    "image": ""
  }
}
```
### should disallow same username
```
POST /users

{
  "user": {
    "email": "user1-0.yqegpe9z2r@email.com",
    "username": "user1-0.yqegpe9z2r",
    "password": "password"
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Username already taken: [user1-0.yqegpe9z2r]"
    ]
  }
}
```
### should disallow same email
```
POST /users

{
  "user": {
    "username": "user2",
    "email": "user1-0.yqegpe9z2r@email.com",
    "password": "password"
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Email already taken: [user1-0.yqegpe9z2r@email.com]"
    ]
  }
}
```
### should enforce required fields
```
POST /users

{}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "User must be specified."
    ]
  }
}
```
```
POST /users

{
  "user": {
    "foo": 1
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Username must be specified."
    ]
  }
}
```
```
POST /users

{
  "user": {
    "username": 1
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Email must be specified."
    ]
  }
}
```
```
POST /users

{
  "user": {
    "username": 1,
    "email": 2
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Password must be specified."
    ]
  }
}
```
## Login
### should login
```
POST /users/login

{
  "user": {
    "email": "user1-0.yqegpe9z2r@email.com",
    "password": "password"
  }
}
```
```
200 OK

{
  "user": {
    "email": "user1-0.yqegpe9z2r@email.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxLTAueXFlZ3BlOXoyciIsImlhdCI6MTYyMjUxNTU1MiwiZXhwIjoxNjIyNjg4MzUyfQ.8sFSTDuYIOOFLIoOZcKYr8E9NLuL4-n1E9JYrrm0XQY",
    "username": "user1-0.yqegpe9z2r",
    "bio": "",
    "image": ""
  }
}
```
### should disallow unknown email
```
POST /users/login

{
  "user": {
    "email": "0.qgy6lu65h3",
    "password": "somepassword"
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Email not found: [0.qgy6lu65h3]"
    ]
  }
}
```
### should disallow wrong password
```
POST /users/login

{
  "user": {
    "email": "user1-0.yqegpe9z2r@email.com",
    "password": "0.1y0hiv8wwa1"
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Wrong password."
    ]
  }
}
```
### should enforce required fields
```
POST /users/login

{}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "User must be specified."
    ]
  }
}
```
```
POST /users/login

{
  "user": {}
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Email must be specified."
    ]
  }
}
```
```
POST /users/login

{
  "user": {
    "email": "someemail"
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Password must be specified."
    ]
  }
}
```
## Get
### should get current user
```
GET /user
```
```
200 OK

{
  "user": {
    "email": "user1-0.yqegpe9z2r@email.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxLTAueXFlZ3BlOXoyciIsImlhdCI6MTYyMjUxNTU1MiwiZXhwIjoxNjIyNjg4MzUyfQ.8sFSTDuYIOOFLIoOZcKYr8E9NLuL4-n1E9JYrrm0XQY",
    "username": "user1-0.yqegpe9z2r",
    "bio": "",
    "image": ""
  }
}
```
### should disallow bad tokens
```
GET /user
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Token not present or invalid."
    ]
  }
}
```
```
GET /user
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Token not present or invalid."
    ]
  }
}
```
```
GET /user
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Token not present or invalid."
    ]
  }
}
```
```
GET /user
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Token not present or invalid."
    ]
  }
}
```
## Profile
### should get profile
```
GET /profiles/user1-0.yqegpe9z2r
```
```
200 OK

{
  "profile": {
    "username": "user1-0.yqegpe9z2r",
    "bio": "",
    "image": "",
    "following": false
  }
}
```
### should disallow unknown username
```
GET /profiles/foo_0.tsmvs0zyk4q
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "User not found: [foo_0.tsmvs0zyk4q]"
    ]
  }
}
```
### should follow/unfollow user
```
POST /users

{
  "user": {
    "username": "followed_user",
    "email": "followed_user@mail.com",
    "password": "password"
  }
}
```
```
200 OK

{
  "user": {
    "email": "followed_user@mail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZvbGxvd2VkX3VzZXIiLCJpYXQiOjE2MjI1MTU1NTIsImV4cCI6MTYyMjY4ODM1Mn0.E9ya4cgFjVuAEPZ_cnFFkfWql8QBvikw4AbQ047AngE",
    "username": "followed_user",
    "bio": "",
    "image": ""
  }
}
```
```
POST /profiles/followed_user/follow
```
```
200 OK

{
  "profile": {
    "username": "followed_user",
    "bio": "",
    "image": "",
    "following": true
  }
}
```
```
POST /profiles/followed_user/follow
```
```
200 OK

{
  "profile": {
    "username": "followed_user",
    "bio": "",
    "image": "",
    "following": true
  }
}
```
```
GET /profiles/followed_user
```
```
200 OK

{
  "profile": {
    "username": "followed_user",
    "bio": "",
    "image": "",
    "following": true
  }
}
```
```
GET /profiles/followed_user
```
```
200 OK

{
  "profile": {
    "username": "followed_user",
    "bio": "",
    "image": "",
    "following": false
  }
}
```
```
POST /users

{
  "user": {
    "username": "user2-0.txmvma5k2zf",
    "email": "user2-0.txmvma5k2zf@mail.com",
    "password": "password"
  }
}
```
```
200 OK

{
  "user": {
    "email": "user2-0.txmvma5k2zf@mail.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIyLTAudHhtdm1hNWsyemYiLCJpYXQiOjE2MjI1MTU1NTIsImV4cCI6MTYyMjY4ODM1Mn0.Vo6XDAW0N0zRI-qgOiZnxMPMSljzt-RK0aEzJiaUynA",
    "username": "user2-0.txmvma5k2zf",
    "bio": "",
    "image": ""
  }
}
```
```
POST /profiles/followed_user/follow
```
```
200 OK

{
  "profile": {
    "username": "followed_user",
    "bio": "",
    "image": "",
    "following": true
  }
}
```
```
DELETE /profiles/followed_user/follow
```
```
200 OK

{
  "profile": {
    "username": "followed_user",
    "bio": "",
    "image": "",
    "following": false
  }
}
```
```
DELETE /profiles/followed_user/follow
```
```
200 OK

{
  "profile": {
    "username": "followed_user",
    "bio": "",
    "image": "",
    "following": false
  }
}
```
```
DELETE /profiles/followed_user/follow
```
```
200 OK

{
  "profile": {
    "username": "followed_user",
    "bio": "",
    "image": "",
    "following": false
  }
}
```
### should disallow following with bad token
```
POST /profiles/followed_user/follow
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Token not present or invalid."
    ]
  }
}
```
## Update
### should update user
```
PUT /user

{
  "user": {
    "email": "updated-user1-0.yqegpe9z2r@email.com"
  }
}
```
```
200 OK

{
  "user": {
    "username": "user1-0.yqegpe9z2r",
    "email": "updated-user1-0.yqegpe9z2r@email.com",
    "image": "",
    "bio": "",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxLTAueXFlZ3BlOXoyciIsImlhdCI6MTYyMjUxNTU1MiwiZXhwIjoxNjIyNjg4MzUyfQ.8sFSTDuYIOOFLIoOZcKYr8E9NLuL4-n1E9JYrrm0XQY"
  }
}
```
```
PUT /user

{
  "user": {
    "password": "newpassword"
  }
}
```
```
200 OK

{
  "user": {
    "username": "user1-0.yqegpe9z2r",
    "email": "updated-user1-0.yqegpe9z2r@email.com",
    "image": "",
    "bio": "",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxLTAueXFlZ3BlOXoyciIsImlhdCI6MTYyMjUxNTU1MiwiZXhwIjoxNjIyNjg4MzUyfQ.8sFSTDuYIOOFLIoOZcKYr8E9NLuL4-n1E9JYrrm0XQY"
  }
}
```
```
PUT /user

{
  "user": {
    "bio": "newbio"
  }
}
```
```
200 OK

{
  "user": {
    "username": "user1-0.yqegpe9z2r",
    "bio": "newbio",
    "image": "",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxLTAueXFlZ3BlOXoyciIsImlhdCI6MTYyMjUxNTU1MiwiZXhwIjoxNjIyNjg4MzUyfQ.8sFSTDuYIOOFLIoOZcKYr8E9NLuL4-n1E9JYrrm0XQY"
  }
}
```
```
PUT /user

{
  "user": {
    "image": "newimage"
  }
}
```
```
200 OK

{
  "user": {
    "username": "user1-0.yqegpe9z2r",
    "image": "newimage",
    "bio": "newbio",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxLTAueXFlZ3BlOXoyciIsImlhdCI6MTYyMjUxNTU1MiwiZXhwIjoxNjIyNjg4MzUyfQ.8sFSTDuYIOOFLIoOZcKYr8E9NLuL4-n1E9JYrrm0XQY"
  }
}
```
### should disallow missing token/email in update
```
PUT /user
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Token not present or invalid."
    ]
  }
}
```
```
PUT /user

{}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "User must be specified."
    ]
  }
}
```
### should disallow reusing email
```
POST /users

{
  "user": {
    "email": "user2-0.301f4zsp21y@email.com",
    "username": "user2-0.301f4zsp21y",
    "password": "password"
  }
}
```
```
200 OK

{
  "user": {
    "email": "user2-0.301f4zsp21y@email.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIyLTAuMzAxZjR6c3AyMXkiLCJpYXQiOjE2MjI1MTU1NTIsImV4cCI6MTYyMjY4ODM1Mn0.A9vfJ1GcpM7wXdPytJbw-RrePtrFNU7GX6EodGcAhZQ",
    "username": "user2-0.301f4zsp21y",
    "bio": "",
    "image": ""
  }
}
```
```
PUT /user

{
  "user": {
    "email": "user2-0.301f4zsp21y@email.com"
  }
}
```
```
422 Unprocessable Entity

{
  "errors": {
    "body": [
      "Email already taken: [user2-0.301f4zsp21y@email.com]"
    ]
  }
}
```
# Util
## Ping
### should ping
```
GET /ping
```
```
200 OK

{
  "pong": "2021-06-01T02:45:52.616Z",
  "AWS_REGION": "us-east-1",
  "DYNAMODB_NAMESPACE": "dev"
}
```
