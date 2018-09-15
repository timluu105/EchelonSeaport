#!/usr/bin/env bash

#
# base.sh: perform tasks to configure the website before deployment
#

# The list of dependencies required by the script to run
dependencies=('php' 'composer' 'npm' 'bower' 'gulp')

# Colors
[[ -t 1 ]] && {
    c_d=$'\e[1;30m' # DARK GREY
    c_r=$'\e[1;31m' # RED
    c_g=$'\e[1;32m' # GREEN
    c_y=$'\e[1;33m' # YELLOW
    c_b=$'\e[1;34m' # BLUE
    c_m=$'\e[1;35m' # VIOLET
    c_t=$'\e[1;36m' # TEAL
    c_w=$'\e[1;37m' # WHITE
    c_c=$'\e[0m'    # DISABLE COLOUR
}

# Function: display a formatted message
function msg {
    printf '%s %s %s\n' "$c_b==>" "$c_w$1:" "$c_y$2$c_c"
}

# Function: display an error, notify slack if configured to do so, and exit with an error
function error_exit {
    printf '%s %s\n' "${c_r}ERROR:" "${c_w}unable to deploy to $c_y${PWD##*/}$c_w on $c_b$HOSTNAME $c_d-> $c_m$1$c_c" >&2
    exit 1
}

# Function: draw a horizontal divider the width of the screen
function draw_hr {
    local char='#' hr="$char"
    cols=$(tput cols 2>/dev/null)
    (( $? )) && cols=11

    for (( x=1; x < cols; x++ )); do
        hr+="$char"
    done

    printf '\n%s\n\n' "$c_w$hr$c_c"
}

# Trap kill signals and exit with an error if received
trap 'error_exit "caught kill signal"' SIGINT SIGQUIT

# Check that dependencies are available and exit with an error if any are missing
declare -a missing_dependencies=()

for dep in "${dependencies[@]}"; do
    type -P "$dep" >/dev/null \
        || missing_dependencies=( ${missing_dependencies[@]} "$dep" )
done

[[ -n "${missing_dependencies[*]}" ]] && {
    error_exit "${c_w}missing dependencies ($(
        for (( x=0; x < ${#missing_dependencies[@]}; x++ )); do
            printf '%s' "$c_m${missing_dependencies[$x]}$c_c"
            (( (( x + 1 )) < ${#missing_dependencies[@]} )) && printf '%s' ', '
        done
    )$c_w)$c_c"
}

# Add missing variables from .env.example to .env if .env exists
env_file=.env
env_file_example=.env.example

function var_check_env {
    while read -r; do
        [[ "$REPLY" =~ ^${1}= ]] \
            && return 0
    done < "$env_file"

    return 1
}

[[ -f "$env_file" ]] && {
    while read -r; do
        [[ -n "$REPLY" ]] && {
            full_var="$REPLY"
            var="${full_var/=*}"

            var_check_env "$var" \
                || printf '%s\n' "$full_var" >> "$env_file"
        }
    done < "$env_file_example"
}

# Run artisan database functionality by default
artisan_db=1

# Disable artisan database functionality if base.sh is run with the --no-db flag
[[ -n "$1" && "$1" = '--no-db' ]] && artisan_db=0

# === Install/Update Composer ===
#
# Now that we're in maintenance mode we can update composer.
# This is the main reason we want to put our site into
# maintenance mode because you'll see PHP errors saying that
# everything is not currently installed if we do not put it
# into maintenance mode.
#
msg 'Installing/Updating Composer' 'composer install'
composer install --no-interaction --no-dev \
    || error_exit 'composer failed' 
draw_hr

# === Clear Blade and Route Cache ===
#
# Now that the composer dependencies have been updated, we
# should clear the cache for blades and routes in case
# changes affect how these are handled.
#
msg 'Clearing the route cache' 'php artisan route:clear'
php artisan route:clear \
    || error_exit 'failed to clear route cache' 
msg 'Clearing the blade cache' 'php artisan view:clear'
php artisan view:clear \
    || error_exit 'failed to clear blade cache' 
draw_hr

# === Generate Encryption Key ===
#
# With artisan installed we can generate an encryption key
# if the .env file exists and a key isn't already set.
#
[[ -f "$env_file" ]] && {
    while read -r; do
        [[ "$REPLY" =~ ^APP_KEY=(.*)$ && -z "${BASH_REMATCH[1]}" ]] && {
            msg 'Generating Encryption Key' 'php artisan key:generate'
            php artisan key:generate \
                || error_exit 'key generation failed' 
            draw_hr
        }
    done < "$env_file"
}

# === Run Database Migrations ===
#
# Now that composer is done installing we can run go ahead
# and run migrations for the site. If there is nothing to
# migrate, then it will just say `nothing to migrate` and
# continue to the next step.
#
(( artisan_db )) && {
    msg 'Running Database Migration' 'php artisan migrate'
    php artisan migrate --force \
        || error_exit 'migration failed' 
    draw_hr
}

# === Install/Update Node.js Dependencies ===
#
# Next we're going to update dependencies with npm. All of
# the npm modules that we used are for gulp, which will run
# right before this script ends. If this command fails then
# we clean the cache and try running it again. If it fails
# for a second time then remove the node_modules folder
# and try again. If that fails again then we'll just
# yell to slack saying something fucked up.
#
msg 'Installing/Updating Node.js Dependencies' 'npm prune && npm install --production'
npm prune && npm install --production \
    || { npm cache clean && npm install --production; } \
    || { [[ -d 'node_modules' ]] && { rm -rf node_modules; npm install --production; }; } \
    || error_exit 'npm failed' 
draw_hr

# === Bower ===
#
# Next we're going to update dependencies with bower. We
# need to get these before we run gulp because it is
# possible that we have new JS/CSS to be compiled, or that
# there are new fonts/other things we need to move. If the
# command fails then we clean the cache and try running it
# again.
#
msg 'Updating Bower' 'bower prune && bower install'
bower prune && bower install \
    || { bower cache clean && bower prune && bower install; } \
    || error_exit 'bower failed' 
draw_hr

# === Gulp ===
#
# Now that we've updated everything we need to update, we
# are going to run gulp and get the sites JS/CSS compiled,
# minified, and put in the right place. We're also going to
# move other dependencies from bower to places needing them.
#
msg 'Running Gulp' 'gulp --production'
gulp --production
draw_hr
