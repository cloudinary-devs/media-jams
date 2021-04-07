/**
 * THIS SCRIPT DELETES DATA!
 *
 * To use this script:
 * 1. Put this script in your studio-folder
 * 2. Write a GROQ filter that outputs the documents you want to delete
 * 3. Run `sanity dataset export` to backup your dataset before deleting a bunch of documents
 * 4. Run `sanity exec deleteDocsByFilter.js --with-user-token` to delete the documents
 *
 * NOTE: For the time being you should not delete more than ~1000 documents in one transaction. This will change in the future.
 * See docs:https://www.sanity.io/docs/http-api/http-mutations#deleting-multiple-documents-by-query
 *
 * remove all posts by Jesse 'Zitty' T from stage '*[_type == "post" && author._ref == "e-5f8a2ac9edc64a00681eb8ab-self"][0...999]'
 */

import sanityClient from 'part:@sanity/base/client';
const client = sanityClient.withConfig({ apiVersion: '2019-05-28' });

client
  .delete({
    query:
      '*[_type == "post" && author._ref == "e-5f8a2ac9edc64a00681eb8ab-self"][0...999]',
  })
  .then(console.log)
  .catch(console.error);
