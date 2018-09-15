<?php

/**
 * Lorem Ipsum Generator
 *
 * This function is the ultimate lorem ipsum generator.
 *
 * @param  int  word_count       - Set the word count. Default 25.
 * @param  bool ucfirstword      - Enables the first word to be uppercased. Default true.
 * @param  bool punctuation      - Enables punctuation when true. Default true.
 * @param  bool punctuation_hard - Enabes a lot of punctuation when true. Default false.
 * @return string
 */
function lorem($word_count = 25, $ucfirstword = true, $punctuation = true, $punctuation_hard = false) {
    // Words are for our phrase. We'll use this array to get a randomly sorted
    // bunch of words at the specific word count specified. By default, that
    // word count is 25.

    $words = [
        'lorem',
        'ipsum',
        'dolor',
        'sit',
        'amet',
        'consectetur',
        'adipiscing',
        'elit',
        'sed',
        'do',
        'for',
        'the',
        'a',
        'at',
        'ut',
        'ex',
        'ea',
        'duis',
        'in',
        'on',
        'eu',
        'nulla',
        'non',
        'qui',
        'laborum',
        'est',
        'proident',
        'voluptate',
        'velit',
    ];

    // Symbols are for punctuation. If punctuation is set to true (which it is by
    // default), we'll use these to randomly place in our phrase. We don't want
    // to add a period (`.`) to this array because this helper should only ever
    // be used to generate one sentence.

    $symbols = [
        ',',
        ':',
        ';',
        '-',
    ];

    $text = '';

    for ($i = 0; $i < $word_count; $i++) {
        $w = rand(0, count($words)-1);
        $s = rand(0, count($symbols)-1);

        if ($i !== 0) {
            $text .= ' ';
        }

        $text .= $words[$w];

        // If we have punctuation enabled, we want to add that shit. If we have
        // punctuation_hard enabled, then we want to make the chances of having
        // punctuation even easier. We also want to make sure we don't add any
        // extra punctuation to the end of the string.

        if ($punctuation && $i !== $word_count-1) {
            $text .= $punctuation_hard ? (rand(0,5)   === 0 ? $symbols[$s] : '') : (rand(0, 10) === 0 ? $symbols[$s] : '');
        }

        // If the user wants the very first word to be capitalized, we make sure to
        // capitalize that shit.

        if ($i === 0 && $ucfirstword) {
            $text = ucfirst($text);
        }
    }

    // If the user wants punctuation for their placeholder string, we want to give them
    // a period at the end of the string.

    if ($punctuation) {
        $text .= '.';
    }

    return "<span class='lorem'>$text</span>";
}
