/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@utils/test-utils';
import CodeBlock from '@components/CodeBlock';

// prettier-ignore
const helloWorld = `javascript
const x = 'hello world';
const y = { m: 'm ewo'
}
`;

// prettier-ignore
const jsxCode = `
export default {
data() {
return {
loading: false,
error: null,
image: null,
}
},
methods: {
async selectFile(e) {
const file = e.target.files[0]

/* Make sure file exists */
if (!file) return;

this.loading = true

const readData = (f) =>
new Promise((resolve) => {
const reader = new FileReader()
reader.onloadend = () => resolve(reader.result)
reader.readAsDataURL(f)
})
const data = await readData(file)
const resource = await this.$axios.$post('/api/upload', {
file: data
})

this.loading = false

if (resource.error) {
this.error = resource.error
return
}

this.image = resource
}
}
}
`;

test("renders 'hello world'", () => {
  const { debug } = render(<CodeBlock>{helloWorld}</CodeBlock>);
  expect(screen.getByText(/hello world/)).toBeInTheDocument();
});

/**
 * Code component does render
 * TODO: Prettier format
 */
test('render and format jsx', () => {
  render(<CodeBlock>{jsxCode}</CodeBlock>);
  expect(screen.getByText(/this.loading = true/)).toBeInTheDocument();
});
