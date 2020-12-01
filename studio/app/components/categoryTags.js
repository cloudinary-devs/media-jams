import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { GoLink } from 'react-icons/go';
import { withDocument } from 'part:@sanity/form-builder';
import { IntentLink } from '@sanity/state-router/components';
import client from 'part:@sanity/base/client';

const categoryTags = forwardRef((props, ref) => {
  const [uniqueTags, setUniqueTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    focus() {
      this._inputElement.focus();
    },
  }));
  // On component load, let's fetch all tags from all images and only keep unique ones
  useEffect(() => {
    // Component is loading! Hands off!
    setIsLoading(true);
    const query = `*[_type == $type && _id == $id ]{
      "tags": *[ _type == "tag" && references(^._id) ]{ _id, title}
    }[0]`;

    // TODO: Implement .focus() mentod

    /**
     * Query for all tags
     * use documents referenced tag id's to get tag title as label
     * to populate the list on render
     * set unique tags and selected tags
     */
    const fetchTags = async () => {
      const refTags = await client.fetch(query, {
        type: 'category',
        id: props.document._id,
      });
      const { tags } = refTags;
      setUniqueTags(tags);
    };

    fetchTags();

    // Component no longer loading
    setIsLoading(false);
  }, []);

  return (
    <>
      <label>Current tags grouped to this category</label>
      {!isLoading && (
        <ul>
          {uniqueTags.map((tag) => (
            <li key={tag._id}>
              {tag.title}
              <IntentLink intent="edit" params={{ id: tag._id }}>
                <GoLink />
              </IntentLink>
            </li>
          ))}
        </ul>
      )}
    </>
  );
});

export default withDocument(categoryTags);
