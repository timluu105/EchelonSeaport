@extends('templates.base')

@section('page-header')
    <link rel="stylesheet" href="/css/app.css?version={{ version() }}" media="screen" title="Site Styles" />
    @include('includes.variables')
@endsection

@section('page-top')
    <script src="/js/app-libs.js?version={{ version() }}"></script>
    <!--[if lte IE 8]>
    <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2-legacy.js"></script>
    <![endif]-->
    <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2.js"></script>
@endsection

@section('page-content')
    <div class="flex-wrapper">
        <div id="app">
            <nav-component></nav-component>

            <div id="main-content">
                <router-view></router-view>
            </div>

            <footer-component></footer-component>
            <call-to-action></call-to-action>
            <intro-component></intro-component>
        </div>
    </div>
@endsection

@section('page-bottom')
    <script src="/private/js/app.js?version={{ version() }}"></script>

    <div class="preload-container">
        <img src="/img/cityscape-color.jpg?version=2" />
        <img src="/img/cityscape-mixed.jpg?version=2" />
        <img src="/img/cityscape-grayscale.jpg?version=2" />
    </div>
@endsection
