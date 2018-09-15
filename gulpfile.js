/*
|--------------------------------------------------------------------------
| Dependencies and Settings
|--------------------------------------------------------------------------
*/

const gulp = require("gulp"),
    gutil = require("gulp-util"),
    sass = require("gulp-sass"),
    sassGlob = require("gulp-sass-glob"),
    postCSS = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    babel = require("gulp-babel"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    plumber = require("gulp-plumber"),
    stripDebug = require("gulp-strip-debug"),
    crypto = require("crypto"),
    browserify = require("browserify"),
    vueify = require("vueify"),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer"),
    fs = require("fs");

// Boolean stating whether gulp is being run with --production
const isProduction = gutil.env.production;

// Settings
const vuePaths = [ "./bower_components", "./node_modules", "./resources/components", "./resources/assets/js" ],
    sassPaths = [ "bower_components", "node_modules" ],
    sassOutputStyle = isProduction ? "compressed" : "nested",
    autoprefixerSettings = { browsers: [ "last 6 versions", "Explorer >= 11" ], cascade: false, remove: false };

const js_app_libs = [
    "bower_components/jquery/dist/jquery.js",
    "bower_components/bootstrap-sass/assets/javascripts/bootstrap.js",
    "bower_components/jquery-detect-swipe/jquery.detect_swipe.js",
    "node_modules/gsap/src/uncompressed/TweenMax.js",
    "resources/assets/js/lib/turn.js",
    "resources/assets/js/lib/zoom.js"
];

const js_dashboard = [
    "resources/assets/js/etc/location.js",
    "resources/assets/js/etc/poof.js",
    "resources/assets/js/etc/reorder.js",
    "resources/assets/js/etc/prompt.js",
    "resources/assets/js/dashboard/access.js",
    "resources/assets/js/dashboard/availability.js",
    "resources/assets/js/dashboard/content.js",
    "resources/assets/js/dashboard/press.js",
    "resources/assets/js/dashboard.js"
];

const js_dashboard_libs = [
    "bower_components/jquery/dist/jquery.js",
    "bower_components/bootstrap-sass/assets/javascripts/bootstrap.js",
    "bower_components/jquery.tablesorter/dist/js/jquery.tablesorter.min.js",
    "bower_components/Sortable/Sortable.min.js",
    "bower_components/simplemde/dist/simplemde.min.js",
    "bower_components/jquery-ui/ui/widgets/datepicker.js",
    "bower_components/jquery.transit/jquery.transit.js",
    "node_modules/cropperjs/dist/cropper.js"
];

// Include promise support for older versions of node
require("es6-promise").polyfill();

/*
|--------------------------------------------------------------------------
| Functions
|--------------------------------------------------------------------------
*/

// Handle gulp errors
function handleError(err) {
    gutil.log(err);
    this.emit("end");
}

// Process sass files
function processSass(filename) {
    return gulp.src("resources/assets/sass/" + filename + ".scss")
        .pipe(plumber(handleError))
        .pipe(sassGlob())
        .pipe(sass({ outputStyle: sassOutputStyle, includePaths: sassPaths }))
        .pipe(concat(filename + ".css"))
        .pipe(postCSS([ autoprefixer(autoprefixerSettings) ]))
        .pipe(gulp.dest("public/css/"));
}

// Process javascript files
function processJavaScript(ouputFilename, inputFiles, es6) {
    const javascript = gulp.src(inputFiles)
        .pipe(plumber(handleError))
        .pipe(concat(ouputFilename + ".js"));

    if (es6) { javascript.pipe(babel()); }
    if (isProduction) { javascript.pipe(stripDebug()).pipe(uglify().on("error", handleError)); }
    return javascript.pipe(gulp.dest("public/js/"));
}

// Process vue-based javascript files
function processVue(filename) {
    const javascript = browserify({
        entries: [ "resources/assets/js/" + filename + ".js" ],
        paths: vuePaths
    }).transform("babelify")
        .transform(vueify)
        .bundle()
        .on("error", handleError)
        .pipe(source(filename + ".js"))
        .pipe(buffer());

    if (isProduction) { javascript.pipe(stripDebug()).pipe(uglify().on("error", handleError)); }
    return javascript.pipe(gulp.dest("private/js/"));
}

/*
|--------------------------------------------------------------------------
| Sass Tasks
|--------------------------------------------------------------------------
*/

gulp.task("sass_public", function() { return processSass("app"); });
gulp.task("sass_dashboard", function() { return processSass("dashboard"); });
gulp.task("sass_auth", function() { return processSass("auth"); });
gulp.task("sass_error", function() { return processSass("error"); });

/*
|--------------------------------------------------------------------------
| JavaScript Tasks
|--------------------------------------------------------------------------
*/

gulp.task("js_app", function() { return processVue("app"); });
gulp.task("js_app_libs", function() { return processJavaScript("app-libs", js_app_libs, false); });
gulp.task("js_dashboard", function() { return processJavaScript("dashboard", js_dashboard, true); });
gulp.task("js_dashboard_libs", function() { return processJavaScript("dashboard-libs", js_dashboard_libs, false); });

/*
|--------------------------------------------------------------------------
| Version Task
|--------------------------------------------------------------------------
*/

gulp.task("version", function() {
    return crypto.randomBytes(16, function(err, buf) {
        if (err) { throw err; }

        return fs.writeFile("storage/app/__version__", buf.toString("hex"), function(err) {
            if (err) { throw err; }
        });
    });
});

/*
|--------------------------------------------------------------------------
| Copy Task
|--------------------------------------------------------------------------
*/

gulp.task("copy", function() {
    return gulp.src([
        "bower_components/bootstrap-sass/assets/fonts/**/*",
        "bower_components/fontawesome/fonts/*",
        "resources/assets/fonts/*"
    ]).pipe(plumber(handleError)).pipe(gulp.dest("public/fonts/"));
});

/*
|--------------------------------------------------------------------------
| Watch Task
|--------------------------------------------------------------------------
*/

gulp.task("watch", function() {
    const livereload = require("gulp-livereload");

    const liveReloadUpdate = function(files, wait) {
        setTimeout(function() {
            livereload.changed(files);
        }, wait || 1);
    };

    livereload.listen();

    gulp.watch([ "app/**/*.php", "routes/**/*.php", "resources/views/**/*.blade.php" ]).on("change", liveReloadUpdate);

    gulp.watch("resources/assets/sass/**/*.scss", [ "sass_public", "sass_dashboard", "sass_auth", "sass_error" ]).on("change", function(files) {
        liveReloadUpdate(files, 2500);
    });

    gulp.watch([ "resources/assets/js/app.js", "resources/assets/js/mixins/**/*.js", "resources/assets/js/imports/**/*.js", "resources/components/**/*.vue" ], [ "js_app" ]).on("change", function(files) {
        liveReloadUpdate(files, 3500);
    });

    gulp.watch(js_app_libs, [ "js_app_libs" ]).on("change", function(files) {
        liveReloadUpdate(files, 1000);
    });

    gulp.watch(js_dashboard, [ "js_dashboard" ]).on("change", function(files) {
        liveReloadUpdate(files, 1500);
    });
});

/*
|--------------------------------------------------------------------------
| Default Task
|--------------------------------------------------------------------------
*/

gulp.task("default", [
    "sass_public",
    "sass_dashboard",
    "sass_auth",
    "sass_error",
    "js_app",
    "js_app_libs",
    "js_dashboard",
    "js_dashboard_libs",
    "version",
    "copy"
]);
