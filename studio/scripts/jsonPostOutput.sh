#!/bin/bash

# Define a timestamp function
timestamp() {
  date "+%Y.%m.%d-%H.%M.%S" # current time
}


sanity documents query --api-version v2021-06-07 '*[_type == "post" && !(_id in path("drafts.**"))]{
   "id": _id, title,description, "tags": tags[]-> {title}, "url_title": slug.current,"created_at":_createdAt, "published_at":publishedAt, "updated_at": _updatedAt, "image_url": cover.asset->url, "content": body , "author": author->name, "author_title" : author->jobTitle, "author_image_url": author->image.asset->url, "author_twitter" : author->socialHandles.twitter, "author_github" : author->socialHandles.github, "author_linkedin" : author->socialHandles.linkedin, "author_bio" : author->bio[0].children[0].text
    }'  --dataset production --pretty | tee "posts_$(timestamp).json" |  jq -r '(map(keys) | add | unique) as $cols 
| map(. as $row | $cols | map($row[.]  | if type=="array" then map(. | select(.title) | ."title") | join(",")  else . end)) as $rows 
| $cols, $rows[] | @csv' | tee "posts_$(timestamp).csv"
    
# sanity documents query --api-version v2021-06-07 '*[_type == "post"]{
#    "id": _id, title, "tags": tags[]-> {title}, "url_title": slug.current,"created_at":_createdAt, "published_at":publishedAt, "updated_at": _updatedAt, "image_url": cover.asset->url, "content": body , "author": author->name, "author_title" : author->jobTitle, "author_image_url": author->image.asset->url, "author_twitter" : author->socialHandles.twitter, "author_github" : author->socialHandles.github, "author_linkedin" : author->socialHandles.linkedin, "author_bio" : author->bio[0].children[0].text
#     }'  --dataset production --pretty | tee "posts_$(timestamp).json" |  jq -r '(map(keys) | add | unique) as $cols | map(. as $row | $cols | map($row[.])) as $rows | $cols, $rows[] | @csv' | tee "posts_$(timestamp).csv"


# sanity documents query --api-version v2021-06-07 '*[_type == "post"]{
#    "id": _id, title, "url_title": slug.current,"created_at":_createdAt, "published_at":publishedAt, "updated_at": _updatedAt, "author": author->name, "author_title" : author->jobTitle, "author_bioRaw" : author->bio,  "image_url": cover.asset->url, "content": body 
#     }'  --dataset production --pretty | tee "posts_$(timestamp).json" |  jq -r '(map(keys) | add | unique) as $cols | map(. as $row | $cols | map($row[.])) as $rows | $cols, $rows[] | @csv' | tee "posts_$(timestamp).csv"