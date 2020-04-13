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
 * @param {string} locale The locale to load. Check out the "moment/locale/" directory in "node_modules"
 *                        for builtin available locales.
 * @param {(locale: string) => *} callback The callback to execute once the locale has been loaded.
 *                                         Note that the callback will be re-executed only
 *                                         when the given locale parameter changes from the previous one.
 * @param {undefined|(e: Error, locale: string) => *} [errorCallback] An optional callback to execute when the locale
 *                                                                    cannot be loaded (e.g. locale not found or network error).
 * @return {undefined}
 */
export default function useLocale(locale, callback, errorCallback = void 0) {
  const callbackRef = useCallbackRef(callback);
  const errorCallbackRef = useCallbackRef(errorCallback);
  useEffect(() => {
    (async () => {
      try {
        await importLocale(locale);
        callbackRef.current(locale);
      } catch (e) {
        errorCallbackRef.current && errorCallbackRef.current(e, locale);
      }
    })();
  }, [locale, callbackRef, errorCallbackRef]);
}
