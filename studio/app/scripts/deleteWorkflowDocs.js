import sanityClient from 'part:@sanity/base/client';

const client = sanityClient.withConfig({ apiVersion: '2019-05-28' });

client
  .fetch(`* [_type == "workflow.metadata"]`)
  .then((docs) =>
    docs
      .reduce((acc, doc) => acc.delete(doc._id), client.transaction())
      .commit(),
  )
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
