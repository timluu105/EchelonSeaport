<!DOCTYPE html>
<html lang="en">
    @set('device_mobile', preg_match('/Mobi/', Request::header('User-Agent')) || preg_match('/iP(hone|ad|od);/', Request::header('User-Agent')))
    @set('meta_title', isset($meta) ? $meta->title : '')
    @set('meta_description', isset($meta) ? $meta->description : '')
    @set('meta_keywords', isset($meta) ? $meta->keywords : '')

    <head>
        @if(App::environment('production'))
            @include('tracking.gtm-head')
        @endif

        <title>{{ $meta_title }}</title>

        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="robots" content="index, follow">
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#f1f1f1" />
        <meta name="_token" value="{{ csrf_token() }}" />

        <meta name="title" content="{{ $meta_title }}" />
        <meta name="description" content="{{ $meta_description }}" />
        <meta name="keywords" content="{{ $meta_keywords }}" />
        <meta name="dc:title" content="{{ $meta_title }}" />
        <meta name="dc:description" content="{{ $meta_description }}" />

        <meta property="og:type" content="article" />
        <meta property="og:title" content="{{ $meta_title }}" />
        <meta property="og:description" content="{{ $meta_description }}" />
        <meta property="og:url" content="{{ Request::url() }}" />
        <meta property="og:image" content="{{ asset('/img/logo.png') }}" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="{{ $meta_title }}" />
        <meta name="twitter:description" content="{{ $meta_description }}" />
        <meta name="twitter:image" content="{{ asset('/img/logo.png') }}" />

        @if(env('TWITTER_USERNAME', false))
            <meta name="twitter:site" content="{{ env('TWITTER_USERNAME') }}" />
        @endif

        @if(App::environment('production'))
            <meta name="google-site-verification" content="nrnqYZuErhCeLwkIe2cNsimBFDTKFFwhEvtE564lrcc" />
        @endif

        <link rel="shortcut icon" href="{{ URL::to('/') }}/favicon.ico" />
        <link rel="icon" href="{{ URL::to('/') }}/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="{{ URL::to('/') }}/favicon.png" type="image/png" />
        <link rel="canonical" href="{{ Request::url() }}" />

        @yield('page-header')

        @if(Config::get('app.debug'))
            <script type="text/javascript">
                document.write('<script src="//{{ env('LR_HOST', 'localhost') }}:35729/livereload.js?snipver=1" type="text/javascript"><\/script>');
            </script>
        @endif

        <script>
            window.lang
        </script>
    </head>

    <body class="{{ $device_mobile ? 'device-mobile' : 'device-desktop' }}">
        @if(App::environment('production'))
            @include('tracking.gtm-body')
            @include('tracking.general')
        @endif

        @yield('page-top')
        @yield('page-content')
        @yield('page-bottom')
    </body>
</html>
