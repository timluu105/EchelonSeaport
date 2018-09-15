<?php

/**
 * Place Image Generator
 *
 * @param int    width            - The width of the image. Default is 250.
 * @param int    height           - The height of the image. Default is 250.
 * @param string provider         - The provider where to get the placeholder image from. A sensible default as been set.
 * @param string background color - The color of the background image. Default aaaaaa. Do not include `#` in your hex!
 * @param string foreground color - The color of text on the image. Default eeeeee. Do not include `#` in your hex!
 * @param string text             - Text to go in the center of the image. Default null.
 *
 * @return string
 */
function placeimage($width = 250, $height = 250, $provider = 'default', $bg_color = 'aaaaaa', $fg_color = 'eeeeee', $text = null) {
    return [
        // Real placeholder image services
        'default'    => "http://placehold.it/$width"."x$height/$bg_color/$fg_color".(is_null($text) ? '' : "?text=$text"),
        'dummy'      => "http://dummyimage.com/$width"."x$height/$bg_color/$fg_color".(is_null($text) ? '' : "?text=$text"),

        // Fun placeholder image services
        'kittens'    => "http://placekitten.com/$width/$height",
        'goats'      => "http://placegoat.com/$width/$height",
        'billmurray' => "http://placegoat.com/$width/$height",
        'bears'      => "http://placebear.com/$width/$height",
    ][$provider];
}
