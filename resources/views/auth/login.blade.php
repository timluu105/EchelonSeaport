@extends('templates.auth')

@section('page-content')
    <div id="auth" class="container block">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Login</div>

                    <div class="panel-body">
                        @if(count($errors) > 0)
                            <div class="alert alert-danger">
                                <p><strong>Whoops!</strong> There were some problems with your input.</p>

                                <ul>
                                    @foreach($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif

                        <form class="form-horizontal" role="form" method="POST" action="{{ url('/login') }}">
                            <input type="hidden" name="_token" value="{{ csrf_token() }}" />

                            <div class="form-group">
                                <div class="col-xs-12">
                                    <label class="control-label">E-Mail Address</label>
                                    <input type="email" class="form-control" name="email" value="{{ old('email') }}" />
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-xs-12">
                                    <label class="control-label">Password</label>
                                    <input type="password" class="form-control" name="password" />
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-md-6 col-md-offset-4">
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-xs-12">
                                    <button type="submit" class="btn btn-primary">Login</button>

                                    <div class="checkbox">
                                        <input type="checkbox" class="styled" id="remember" name="remember" />
                                        <label for="remember">Remember Me</label>
                                    </div>

                                    @if(env('CAN_RECOVER', false))
                                        <a class="btn btn-link btn-forgot" href="{{ url('/password/email') }}">Forgot Your Password?</a>
                                    @endif
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
