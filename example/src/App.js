import React from "react";
import { useLocale } from "react-moment-hooks";
import { allSupportedLocales } from "moment-utl";

function Example({ locale }) {
  useLocale(locale, {
    callback: (normalizedLocale) => {
      // Do something with the loaded normalized locale.
      // This callback will be called when the given locale is either known or unknown.
      //
      // If the given locale is unknown, this function will still be called
      // with "normalizedLocale" set to the default Moment's locale (USA's English, i.e. "en"),
      // but only after calling "unknownLocaleCallback" which will always be called before
      // (this is guaranteed by the underlying "moment-utl" package).
      // eslint-disable-next-line no-console
      console.log(normalizedLocale);
    },
    unknownLocaleCallback: (defaultLocale, locale) => {
      // Do something with unknown locale.
      // "defaultLocale" will always be "en" (USA's English).
      // "locale" will be the original locale passed to the hook
      // as first parameter.
      // eslint-disable-next-line no-console
      console.log(defaultLocale, locale);
    },
    errorCallback: (e) => {
      // Do something when locale could not be loaded.
      // eslint-disable-next-line no-console
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
    </div>
  );
}
