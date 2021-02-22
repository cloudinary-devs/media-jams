import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import Fieldset from 'part:@sanity/components/fieldsets/default';
import { setIfMissing } from 'part:@sanity/form-builder/patch-event';
// FormBuilderInput automatically generates fields from a schema
import { FormBuilderInput } from 'part:@sanity/form-builder';
// a Higher Order Component that passes document values as props
import { withDocument } from 'part:@sanity/form-builder';

import { userModerator } from '../lib/user/';

const ObjectInput = (props) => {
  const {
    document,
    type,
    value,
    level,
    focusPath,
    onFocus,
    onBlur,
    onChange,
  } = props;
  const firstFieldInput = React.useRef(null);
  const isModerator = userModerator();

  const handleFieldChange = (field, fieldPatchEvent) => {
    // Whenever the field input emits a patch event, we need to make sure to each of the included patches
    // are prefixed with its field name, e.g. going from:
    // {path: [], set: <nextvalue>} to {path: [<fieldName>], set: <nextValue>}
    // and ensure this input's value exists
    onChange(
      fieldPatchEvent
        .prefixAll(field.name)
        .prepend(setIfMissing({ _type: type.name })),
    );
  };
  const focus = () => firstFieldInput.current.focus();

  if (!isModerator) return null;
  return (
    <Fieldset level={level} legend={type.title} description={type.description}>
      <div>
        {type.fields.map((field, i) => (
          // Delegate to the generic FormBuilderInput. It will resolve and insert the actual input component
          // for the given field type
          <FormBuilderInput
            level={level + 1}
            ref={i === 0 ? firstFieldInput : null}
            key={field.name}
            type={field.type}
            value={value && value[field.name]}
            onChange={(patchEvent) => handleFieldChange(field, patchEvent)}
            path={[field.name]}
            focusPath={focusPath}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        ))}
      </div>
    </Fieldset>
  );
};

export default withDocument(ObjectInput);
