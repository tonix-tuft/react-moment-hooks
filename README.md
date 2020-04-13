# react-moment-hooks

React hooks for dealing with the Moment.js library.

[![NPM](https://img.shields.io/npm/v/react-moment-hooks.svg)](https://www.npmjs.com/package/react-moment-hooks) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save moment react-moment-hooks
```

## Usage

### `useLocale` hook

```jsx
import React from "react";
import { useLocale } from "react-moment-hooks";

function Example({ locale }) {
  useLocale(
    locale,
    () => {
      // Do something with loaded locale.
      console.log(locale);
    },
    (e) => {
      // Do something when locale could not be loaded.
      console.error(e);
    }
  );
  return <div />;
}

export default function App() {
  return (
    <div>
      <Example locale="ru" />
    </div>
  );
}
```

## License

MIT © [Anton Bagdatyev (Tonix)](https://github.com/tonix-tuft)
