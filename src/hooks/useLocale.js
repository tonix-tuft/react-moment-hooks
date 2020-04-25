/*
 * Copyright (c) 2020 Anton Bagdatyev (Tonix)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

import { useEffect } from "react";
import { useCallbackRef } from "react-js-utl/hooks";
import { importLocale } from "moment-utl";

/**
 * Hook to use an asynchronously loaded moment locale.
 *
 * @param {string|*} locale The locale to load. Check out the "moment/locale/" directory in "node_modules"
 *                          for builtin available locales.
 *                          If a value which is not a string is passed as parameter, it will be treated as an unknown locale
 *                          and the "obj.callback" callback will be executed with a "normalizedLocale" parameter
 *                          set to the Moment's default locale (USA's English, i.e. "en").
 * @param {Object} obj An object with further parameters.
 * @param {(locale: string) => *} obj.callback The callback to execute once the locale has been loaded.
 *                                             Note that the callback will be re-executed only
 *                                             when the given locale parameter changes from the previous one.
 * @param {undefined|(normalizedLocale: string, locale: string) => *} [unknownLocaleCallback] A callback called with the Moment's default locale (USA's English, i.e. "en")
 *                                                                                            if the given locale is unknown as its first parameter and the given locale as the second parameter.
 *                                                                                            See the "unknownLocaleCallback" parameter of the "importLocale" function of the "moment-utl" package.
 * @param {undefined|(e: Error, locale: string) => *} [obj.errorCallback] An optional callback to execute when the locale
 *                                                                        cannot be loaded (e.g. Moment locale chunk file not found or network error).
 * @return {undefined}
 */
export default function useLocale(
  locale,
  { callback, unknownLocaleCallback = void 0, errorCallback = void 0 }
) {
  const callbackRef = useCallbackRef(callback);
  const unknownLocaleCallbackRef = useCallbackRef(unknownLocaleCallback);
  const errorCallbackRef = useCallbackRef(errorCallback);
  useEffect(() => {
    (async () => {
      try {
        const normalizedLocale = await importLocale(
          locale,
          unknownLocaleCallbackRef.current
        );
        callbackRef.current(normalizedLocale);
      } catch (e) {
        errorCallbackRef.current && errorCallbackRef.current(e, locale);
      }
    })();
  }, [locale, callbackRef, unknownLocaleCallbackRef, errorCallbackRef]);
}
