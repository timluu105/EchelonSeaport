<?php

/**
 * Version
 *
 * This function gets the commit version of the website so whenever we update
 * the site, our scripts and styles will always be updated for users.
 *
 * @return hash
 */
function version() {
    $file = storage_path() . '/app/__version__';

    // The file should exist, so we shouldn't have to run any external commands.
    // If the file exists then we just return the contents of the file.

    if (file_exists($file))
    {
        return trim(file_get_contents($file));
    }

    // If the file does not exist, we should just return 0. It won't hurt to not
    // have anything in __version__ but it would help with caching problems to
    // have a __version__. Our gulpfile generates this file.

    return "0";
}
