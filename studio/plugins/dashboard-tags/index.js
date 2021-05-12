/* eslint-disable complexity */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { IntentLink } from 'part:@sanity/base/router';
import SanityPreview from 'part:@sanity/base/preview';
import Spinner from 'part:@sanity/components/loading/spinner';
import schema from 'part:@sanity/base/schema';
import sanityClient from 'part:@sanity/base/client';
import IntentButton from 'part:@sanity/components/buttons/intent';
import { List, Item } from 'part:@sanity/components/lists/default';
import { getPublishedId } from 'part:@sanity/base/util/draft-utils';
import { chain } from 'lodash';
import { getSubscription } from './sanityConnector';
import styles from './Tag.css';

const client = sanityClient.withConfig({ apiVersion: '2019-05-28' });

function Tags() {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const documentCount$ = client.observable
      .fetch(
        `*[_type == 'post']{
        "tags":tags[]->
      }`,
      )
      .subscribe((tags) =>
        setTags(
          chain(tags)
            .map((t) => t.tags)
            .flatten()
            .groupBy('_id')
            .values()
            .map((group) => ({ ...group[0], qty: group.length }))
            .filter((t) => t.qty > 1)
            .orderBy(['qty'], ['desc'])
            .value(), // used to unwrap the lodash chain
        ),
      );
    return () => documentCount$.unsubscribe();
  }, []);
  return (
    <div className={styles.container}>
      <span className={styles.title}>Tags by Count</span>
      <ul className={styles.content}>
        {tags.map((tag) => {
          const type = schema.get(tag._type);
          console.log(type);
          return (
            <IntentLink
              className={styles.link}
              intent="edit"
              params={{
                type: tag._type,
                id: tag._id,
              }}
            >
              <li className={styles.listitem} key={tag._id}>
                <span> {tag.qty}</span>
                {tag.title}
              </li>
            </IntentLink>
          );
        })}
      </ul>
    </div>
  );
}

export default {
  name: 'tags-count',
  component: Tags,
};
