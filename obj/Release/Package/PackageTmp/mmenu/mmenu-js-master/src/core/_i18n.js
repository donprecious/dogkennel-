"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _helpers_1 = require("./_helpers");
var translations = {};
/**
 * Add translations to a language.
 * @param {object}  text        Object of key/value translations.
 * @param {string}  language    The translated language.
 */
function add(text, language) {
    if (typeof translations[language] == 'undefined') {
        translations[language] = {};
    }
    _helpers_1.extend(translations[language], text);
}
exports.add = add;
/**
 * Find a translated text in a language.
 * @param   {string} text       The text to find the translation for.
 * @param   {string} language   The language to search in.
 * @return  {string}            The translated text.
 */
function get(text, language) {
    if (typeof language == 'string' &&
        typeof translations[language] != 'undefined') {
        return translations[language][text] || text;
    }
    return text;
}
exports.get = get;
/**
 * Get all translated text in a language.
 * @param   {string} language   The language to search for.
 * @return  {object}            The translations.
 */
function all(language) {
    return translations;
}
exports.all = all;
