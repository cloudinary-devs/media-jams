/* eslint-disable complexity */
import React from 'react';
import PropTypes from 'prop-types';
import { IntentLink } from 'part:@sanity/base/router';
import SanityPreview from 'part:@sanity/base/preview';
import Spinner from 'part:@sanity/components/loading/spinner';
import schema from 'part:@sanity/base/schema';
import IntentButton from 'part:@sanity/components/buttons/intent';
import userStore from 'part:@sanity/base/user';
import { List, Item } from 'part:@sanity/components/lists/default';
import { getPublishedId } from 'part:@sanity/base/util/draft-utils';
import { intersection } from 'lodash';
import { getSubscription } from './sanityConnector';
import styles from './MyJamList.css';

const schemaTypeNames = schema.getTypeNames();

class MyJamList extends React.Component {
  state = {
    documents: null,
    loading: true,
    error: null,
  };

  static propTypes = {
    title: PropTypes.string,
    types: PropTypes.arrayOf(PropTypes.string),
    query: PropTypes.string,
    queryParams: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    order: PropTypes.string,
    limit: PropTypes.number,
    createButtonText: PropTypes.string,
  };

  static defaultProps = {
    title: 'Last created',
    order: '_createdAt asc',
    limit: 10,
    types: null,
    query: null,
    queryParams: {},
    createButtonText: null,
  };

  componentDidMount = async () => {
    const { query, limit } = this.props;
    const { assembledQuery, params } = await this.assembleQuery();
    if (!assembledQuery) {
      return;
    }
    this.unsubscribe();
    this.subscription = getSubscription(assembledQuery, params).subscribe({
      next: (documents) =>
        this.setState({ documents: documents.slice(0, limit), loading: false }),
      error: (error) => this.setState({ error, query, loading: false }),
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  assembleQuery = async () => {
    const { query, queryParams, types, order, limit } = this.props;
    if (query) {
      return { assembledQuery: query, params: queryParams };
    }
    const { id: currentUserId } = await userStore.getUser('me');
    return {
      assembledQuery: `*[_type == $type && author._ref == $currentUserId]  | order(${order}) [0...${
        limit * 2
      }] `,
      params: {
        type: 'post',
        currentUserId: `${currentUserId}-self`,
      },
    };
  };

  render() {
    const { title, types, createButtonText } = this.props;
    const { documents, loading, error } = this.state;
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
        </header>
        <div className={styles.content}>
          {error && <div>{error.message}</div>}
          {!error && loading && <Spinner center message="Loading..." />}
          {!error && !documents && !loading && (
            <div>Could not locate any documents :/</div>
          )}
          <List>
            {documents &&
              documents.map((doc) => {
                const type = schema.get(doc._type);
                return (
                  <Item key={doc._id}>
                    <IntentLink
                      intent="edit"
                      params={{
                        type: doc._type,
                        id: getPublishedId(doc._id),
                      }}
                      className={styles.link}
                    >
                      <SanityPreview
                        layout="default"
                        type={type}
                        value={doc}
                        key={doc._id}
                      />
                    </IntentLink>
                  </Item>
                );
              })}
          </List>
        </div>
        {types && types.length === 1 && (
          <div className={styles.footer}>
            <IntentButton
              bleed
              color="primary"
              kind="simple"
              intent="create"
              params={{ type: types[0], template: 'post-by-author' }}
            >
              {createButtonText || `Create new ${types[0]}`}
            </IntentButton>
          </div>
        )}
      </div>
    );
  }
}

export default MyJamList;
