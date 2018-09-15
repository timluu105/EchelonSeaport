<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <title>{{ $meta->title }}</title>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <meta name="description" content="{{ $meta->description }}">
        <meta name="keywords" content="{{ $meta->keywords }}">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=0.78, width=device-width">
        <meta property="og:title" content="{{ $meta->title }}">
        <meta property="og:description" content="{{ $meta->description }}">
        <meta property="og:url" content="{{ url(Request::path()) }}">

        @if(App::environment('production'))
            <meta name="robots" content="index, follow">
        @else
            <meta name="robots" content="noindex, nofollow">
        @endif

        <link rel="stylesheet" href="/css/dashboard.css?version={{ version() }}">

        @if(Config::get('app.debug'))
            <script type="text/javascript">
                document.write('<script src="//{{ env('LR_HOST', 'localhost') }}:35729/livereload.js?snipver=1" type="text/javascript"><\/script>')
            </script>
        @endif
    </head>

    <body class="page-{{ preg_replace('/\//', '-', Request::path()) }} @yield('body-classes')">
        @if(App::environment('production'))
            @include('tracking.general')
        @endif

        @if(Auth::user() != null)
            <div class="sidebar">
                <div class="sidebar-logo" data-category="" data-page="" data-subpage="">
                    <img src="/img/logo.png" alt="{{ env('APP_NAME') }}" />
                </div>

                <div class="sidebar-links">
                    @if(Auth::user()->hasPermission('content'))
                        <ul>
                            <li class="category link-content" data-category="content" data-page="" data-subpage=""><span>Content</span> <i class="fa fa-file-text"></i></li>

                            @if(Auth::user()->hasPermission('content.meta'))
                                <li class="page link-content-meta" data-category="content" data-page="meta" data-subpage=""><span>Meta</span></li>
                            @endif

                            @if(Auth::user()->hasPermission('content.pages'))
                                <li class="page link-content-pages" data-category="content" data-page="pages" data-subpage=""><span>Pages</span></li>

                                @foreach(App\Models\Pages::all() as $page)
                                    <li class="subpage link-content-pages-{{ $page->name }}" data-category="content" data-page="pages" data-subpage="{{ $page->name }}"><span>{{ $page->title }}</span></li>
                                @endforeach
                            @endif
                        </ul>
                    @endif

                    @if(Auth::user()->hasPermission('press'))
                        <ul>
                            <li class="category link-press" data-category="press" data-page="" data-subpage=""><span>Press</span> <i class="fa fa-list"></i></li>

                            @if(Auth::user()->hasPermission('press.articles'))
                                <li class="page link-press-articles" data-category="press" data-page="articles" data-subpage=""><span>Articles</span></li>
                            @endif
                        </ul>
                    @endif

                    @if(Auth::user()->hasPermission('inquiries'))
                        <ul>
                            <li class="category link-inquiries" data-category="inquiries" data-page="" data-subpage=""><span>Inquiries</span> <i class="fa fa-paper-plane-o"></i></li>

                            @if(Auth::user()->hasPermission('inquiries.view'))
                                <li class="page link-inquiries-view" data-category="inquiries" data-page="view" data-subpage=""><span>View</span></li>
                            @endif

                            @if(Auth::user()->hasPermission('inquiries.download'))
                                <li class="page link-inquiries-download" data-category="inquiries" data-page="download" data-subpage=""><span>Download</span></li>
                            @endif
                        </ul>
                    @endif

                    @if(Auth::user()->hasPermission('availability'))
                        <ul>
                            <li class="category link-availability" data-category="availability" data-page="" data-subpage=""><span>Availability</span> <i class="fa fa-table"></i></li>

                            @if(Auth::user()->hasPermission('availability.table'))
                                <li class="page link-availability-table" data-category="availability" data-page="table" data-subpage=""><span>Table Editor</span></li>
                            @endif
                        </ul>
                    @endif

                    @if(Auth::user()->hasPermission('access'))
                        <ul>
                            <li class="category link-access" data-category="access" data-page="" data-subpage=""><span>Access</span> <i class="fa fa-wrench"></i></li>

                            @if(Auth::user()->hasPermission('access.logins'))
                                <li class="page link-access-logins" data-category="access" data-page="logins" data-subpage=""><span>Logins</span></li>
                            @endif

                            @if(Auth::user()->hasPermission('access.users'))
                                <li class="page link-access-users" data-category="access" data-page="users" data-subpage=""><span>Users</span></li>
                            @endif
                        </ul>
                    @endif
                </div>
            </div>

            <div class="topbar">
                <div class="page-title"></div>
                <ul id="topbar-content"></ul>
                <div class="logout"><a href="/logout" title="Logout"><i class="fa fa-power-off"></i></a></div>
            </div>

            <div id="dashboard-container"></div>

            <div class="loading">
                <div class="loading-wait">
                    <div class="loading-screen">
                        <i class="fa fa-spin fa-circle-o-notch"></i>
                    </div>
                </div>
            </div>

            <div id="poof"></div>
            <script src="/js/dashboard-libs.js?version={{ version() }}"></script>
            <script src="/js/dashboard.js?version={{ version() }}"></script>
        @else
            {{ header('Location: /login') }}
        @endif
    </body>
</html>
