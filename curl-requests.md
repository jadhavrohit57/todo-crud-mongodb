# crate todo

    curl --location --request POST 'localhost:4000/todo' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "title":"cloths",
        "description":"get cloths from market",
        "status":"draft"
    }'



# get all  todos

    curl --location --request POST 'localhost:4000/todo/getAll' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "filter": {
            "status": "draft"
        },
        "project": {
            "title": 1,
            "description": 1
        },
        "page": 1,
        "limit": 3
    }'


# get todo details by ID
    curl --location --request GET 'localhost:4000/todo/64e60976cd52d511d1679fe4'


# update to status by ID

    curl --location --request PATCH 'localhost:4000/todo/64e60976cd52d511d1679fe4' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "status":"In process"
    }'


# delete todo by ID

    curl --location --request DELETE 'localhost:4000/todo/64e60976cd52d511d1679fe4'