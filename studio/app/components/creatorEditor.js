import PropTypes from 'prop-types';
import React from 'react';
import Fieldset from 'part:@sanity/components/fieldsets/default';
import { setIfMissing } from 'part:@sanity/form-builder/patch-event';
// FormBuilderInput automatically generates fields from a schema
import { FormBuilderInput } from 'part:@sanity/form-builder';
// a Higher Order Component that passes document values as props
import { withDocument } from 'part:@sanity/form-builder';

import styles from './creatorEditor.css';
// a Higher Order Component that passes document values as props
const CreatorEditor = ({
  document,
  type,
  value,
  level,
  focusPath,
  onFocus,
  onBlur,
}) => {
  const firstFieldInput = React.createRef();

  const handleFieldChange = (field, fieldPatchEvent) => {
    const { onChange, type } = this.props;
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

  const focus = () => {
    this.firstFieldInput.current.focus();
  };

  return (
    <Fieldset
      level={level}
      legend={type.title}
      description={type.description}
      isCollapsible={!!type.options && !!type.options.collapsible}
      isCollapsed={!!type.options && !!type.options.collapsed}
    >
      This is my custom object input with fields
      <div>
        {type.fields.map((field, i) => (
          // Delegate to the generic FormBuilderInput. It will resolve and insert the actual input component
          // for the given field type
          <FormBuilderInput
            level={level + 1}
            ref={i === 0 ? this.firstFieldInput : null}
            key={field.name}
            type={field.type}
            value={value && value[field.name]}
            onChange={(patchEvent) => this.handleFieldChange(field, patchEvent)}
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
export default withDocument(CreatorEditor);
