import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

// Import workflow types
import workflowMetadata from './objects/workflow/metadata';
// We import object and document schemas
import blockContent from './objects/blockContent';
import socialHandles from './objects/social';
import tag from './tag';
import group from './group';
import category from './category';
import post from './post';
import author from './author';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    post,
    author,
    tag,
    group,
    category,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    blockContent,
    workflowMetadata,
    socialHandles,
  ]),
});
