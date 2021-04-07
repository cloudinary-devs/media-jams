import TextSection from './TextSection';
import React from 'react';
import { upperFirst } from 'lodash';

const SectionComponents = {
  TextSection,
};

function resolveSections(section) {
  // eslint-disable-next-line import/namespace
  const Section = SectionComponents[upperFirst(section._type)];

  if (Section) {
    return Section;
  }

  console.error('Cant find section', section); // eslint-disable-line no-console
  return null;
}

function RenderPageSections(props) {
  const { sections } = props;

  if (!sections) {
    console.error('Missing section');
    return <div>Missing sections</div>;
  }

  return (
    <>
      {sections.map((section) => {
        const SectionComponent = resolveSections(section);
        if (!SectionComponent) {
          return <div>Missing section {section._type}</div>;
        }
        return <SectionComponent {...section} key={section._key} />;
      })}
    </>
  );
}

export default RenderPageSections;
