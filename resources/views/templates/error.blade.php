@extends('templates.base')

@section('page-header')
    <link rel="stylesheet" href="/css/error.css?version={{ version() }}" media="screen" title="Site Styles" />
@endsection

@section('page-content')
    @yield('content')
@endsection
