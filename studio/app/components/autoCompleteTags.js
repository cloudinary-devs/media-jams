import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';
import CreatableSelect from 'react-select/creatable';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';
import { withDocument } from 'part:@sanity/form-builder';
import client from 'part:@sanity/base/client';
import { v4 as uuidv4 } from 'uuid';

const transformTagToReference = (tag) => ({
  _type: 'reference',
  _ref: tag._id,
  _key: uuidv4().split('-').pop(),
});

const createPatchFrom = (tags) => {
  return PatchEvent.from(
    Array.isArray(tags) && tags.length
      ? set(tags.map(transformTagToReference))
      : unset(),
  );
};

const autoCompleteTags = forwardRef((props, ref) => {
  const [uniqueTags, setUniqueTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState([]);

  useImperativeHandle(ref, () => ({
    focus() {
      this._inputElement.focus();
    },
  }));
  // On component load, let's fetch all tags from all images and only keep unique ones
  useEffect(() => {
    // Component is loading! Hands off!
    setIsLoading(true);
    const query = '*[_type == "tag"]{ _id, "label":title}';

    // TODO: Implement .focus() mentod

    const fetchTags = async () => {
      const allTags = await client.fetch(query);
      const selectedTags = props.document.tags.map((tag) => {
        return allTags.find((t) => t._id === tag._ref);
      });
      setUniqueTags(allTags);
      setSelected(selectedTags);
      return allTags;
    };

    fetchTags();

    // Component no longer loading
    setIsLoading(false);
  }, []);

  // Here we handle change to the tags when this change does not involve creating a new tag
  const handleChange = (newValue) => {
    setSelected(newValue);
    props.onChange(createPatchFrom(newValue));
  };

  // Ok, here's some fun: here we handle changes that involve creating new tags and
  // populating these new options into selected tags and all tags
  const createOption = (newValue) => {
    const newSelected = selected;
    newSelected.push({ value: newValue, label: newValue });
    setSelected(newSelected);

    /* 
      
      !!! BUG: Sometimes newly added tags don't count towards validation rule.
      This validation would fail in case the second required tag was just created:
      
      validation: Rule => Rule.required().min(2).error('At least 2 tags are required.')
      
      */

    // New tags need to be commited to Sanity so that we can reuse them elsewhere
    return client
      .patch(props.document._id)
      .setIfMissing([])
      .append([{ title: newValue }])
      .commit();
  };

  return (
    <>
      <label>{props.type.title}</label>
      <CreatableSelect
        disabled={isLoading}
        isLoading={isLoading}
        value={selected}
        isMulti
        onChange={handleChange}
        options={uniqueTags}
        getOptionValue={(option) => option['_id']}
      />
    </>
  );
});

export default withDocument(autoCompleteTags);
