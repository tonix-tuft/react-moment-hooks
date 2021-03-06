/* eslint-disable no-console */
import React from "react";
import { useLocale } from "react-moment-hooks";
import { allSupportedLocales, allSupportedLocalesMap } from "moment-utl";

function Example({ locale }) {
  useLocale(locale, {
    callback: normalizedLocale => {
      // Do something with the loaded normalized locale.
      // This callback will be called when the given locale is either known or unknown.
      //
      // If the given locale is unknown, this function will still be called
      // with "normalizedLocale" set to the default Moment's locale (USA's English, i.e. "en"),
      // but only after calling "unknownLocaleCallback" which will always be called before
      // (this is guaranteed by the underlying "moment-utl" package).
      console.log(normalizedLocale);
    },
    unknownLocaleCallback: (defaultLocale, locale) => {
      // Do something with unknown locale.
      // "defaultLocale" will always be "en" (USA's English).
      // "locale" will be the original locale passed to the hook
      // as first parameter.
      console.log(defaultLocale, locale);
    },
    errorCallback: e => {
      // Do something when locale could not be loaded.
      // If this error callback is not given to "useLocale",
      // then an error will be logged to the console during development (not in production)
      // if an error occurs.
      console.error(e);
    },
  });
  return <div />;
}

export default function App() {
  return (
    <div>
      <Example locale="ru" />
      <div>
        <pre>
          <code>{JSON.stringify(allSupportedLocales(), void 0, 4)}</code>
        </pre>
      </div>
      <div>
        <pre>
          <code>{JSON.stringify(allSupportedLocalesMap(), void 0, 4)}</code>
        </pre>
      </div>
    </div>
  );
}
