import { suite } from 'uvu';
import * as assert from 'uvu/assert';
import { doc } from './test-utils.js';
import { setup, setupBuild } from './helpers.js';

const Components = suite('<Code>');

setup(Components, './fixtures/astro-component-code');

Components('<Code> without lang or theme', async ({ runtime }) => {
  let result = await runtime.load('/no-lang');
  assert.ok(!result.error, `build error: ${result.error}`);
  const $ = doc(result.contents);
  assert.equal($('pre').length, 1);
  assert.equal($('pre').attr('style'), 'background-color: #2e3440ff', 'applies default theme');
  assert.equal($('pre > code').length, 1);
  assert.ok($('pre > code span').length > 1, 'contains some generated spans');
});

Components('<Code lang="...">', async ({ runtime }) => {
  let result = await runtime.load('/basic');
  assert.ok(!result.error, `build error: ${result.error}`);
  const $ = doc(result.contents);
  assert.equal($('pre').length, 1);
  assert.equal($('pre > code').length, 1);
  assert.ok($('pre > code span').length > 6, 'contains many generated spans');
});

Components('<Code theme="...">', async ({ runtime }) => {
  let result = await runtime.load('/custom-theme');
  assert.ok(!result.error, `build error: ${result.error}`);
  const $ = doc(result.contents);
  assert.equal($('pre').length, 1);
  assert.equal($('pre').attr('style'), 'background-color: #1E1E1E', 'applies custom theme');
});

Components.run();
