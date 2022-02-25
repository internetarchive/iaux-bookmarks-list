[![Build Status](https://travis-ci.com/internetarchive/iaux-bookmarks-list.svg?branch=master)](https://travis-ci.com/internetarchive/iaux-bookmarks-list)
[![codecov](https://codecov.io/gh/internetarchive/iaux-bookmarks-list/branch/master/graph/badge.svg)](https://codecov.io/gh/internetarchive/iaux-bookmarks-list)

# Deprecated.  See [@internetarchive/bookreader](https://github.com/internetarchive/bookreader)

# \<ia-bookmarks-list>

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation
```bash
npm i @internetarchive/ia-bookmarks-list
```

## Usage
```html
<script type="module">
  import '@internetarchive/ia-bookmarks-list/ia-bookmarks-list.js';
</script>

<ia-bookmarks-list></ia-bookmarks-list>
```

## Linting with ESLint, Prettier, and Types
To scan the project for linting errors, run
```bash
npm run lint
```

To automatically fix many linting errors, run
```bash
npm run format
```

## Testing with Karma
To run the suite of karma tests, run
```bash
npm run test
```

To run the tests in watch mode (for <abbr title="test driven development">TDD</abbr>, for example), run

```bash
npm run test:watch
```


## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Local Demo with `es-dev-server`
```bash
npm start
```
To run a local development server that serves the basic demo located in `demo/index.html`
