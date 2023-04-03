# Media Jams Studio

Content Management for Media Jams

## Sanity CMS

All Media Jam Content lives here. Roles include 'Creator' and 'Moderator'. (author and creator are interchangable) An 'Author Profile' is generated anytime a new creator logs in. This is where they can update their name, profile image, social handles, bio, and anything else added can be used to display on their author page `mediajams.dev/<author-slug>` https://mediajams.dev/docs/getting-started/installation is meant to be a walk through guide to getting the authors content into a solid Jam format and ready to review.

### Dashboard

Contains a couple of helpful widgets.

- Image upload let's creators uplaod any image to Media Jams' Cloudinary account, and automatticly files a directory for each author.
- List of the user's jams and their current status. Along with quick links to start a new Jam.
- Moderators will see a 3rd widget listing the number of jams any tag is currently added to.

### Desktop

- Creators
  Will see 'Jams' and 'Author Profile'

- Moderators
  Will see the above if they are also a creator. And in addition a folder structure similar to the finder or windows explore. Used for navigation from jams, categories, or tags.

### Moderation

General workflow is from 'jam creation' -> 'in review' -> 'approved' -> 'published'

![workflow](https://res.cloudinary.com/jesse-thisdot/image/upload/v1634236868/e-5f80acaf5907aa0068f59a19/twwt9haijw2gybjpwnbp.jpg)

1. Newly created jam can only go to 'In Review'
1. From 'In Review' a jam is edited.

- Editing involes the following steps.
  1. Technical Accuracy
  1. Content and Grammer
  1. General Understanability

1. From 'In Review' a jam can go to either 'Request for Changes' or 'Approved'
1. From 'Request for Changes', the author looks over feedback from moderators, makes adjustments as needed and requests review again. **NOW** it will go to 'Update Review'. Remember, only newly created jams go to 'In Review'. 'Updated Review' simply means this is not the first pass by a moderator on this jam.
1. From here a jam can go back and forth between 'Request for Changes' <-> 'Updated Review' as we make the best possible content we can. Then its off to 'Approved'
1. 'Approved' has been through the moderation process and is ready to publish
1. 'Published' 🥳 now it's out in the world

---

- From 'Published' an author can and hofully will makes changes and updates to their jams. Once a published jam has been changed, it's versioned automatticly and that draft version continues through the process of 'Request for Changes' <-> 'Updated Review' until it's approved, and published.
- During this process the version of the jam that was 'Published' remains live and out to the world, unchanged, until it is updated by a newly published version of itself.

## Export data

Exporting data can be achieved with the following guidelines.

1. Install the Sanity CLI
1. Login to the Sanity CLI
1. execute `sh ./scripts jsonPostOutpush.sh`
1. A `.json` and `.csv` will not be in the studio directory. This includes all published posts and meta data for each format.
1. If a copy of the raw markdown is needed again. The json output can be run through the `wpConvertData.js` and it will transform the body of each post into a separate markdown file.

## Redirects.

1. The project and prod .env's are hosted on Vercel
1. Any redirects from posts to another URL should be done in the Nextjs Config and then deployed.
