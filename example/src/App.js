import React from "react";
import { useLocale } from "react-moment-hooks";

function Example({ locale }) {
  useLocale(
    locale,
    () => {
      // Do something with loaded locale.
      // eslint-disable-next-line no-console
      console.log(locale);
    },
    (e) => {
      // Do something when locale could not be loaded.
      // eslint-disable-next-line no-console
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
