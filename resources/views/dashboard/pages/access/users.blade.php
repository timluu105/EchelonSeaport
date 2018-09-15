@if(Auth::user()->hasPermission('access.users'))
    {{-- Page Options --}}
    <div class="page-options" data-container="full"></div>
    <input id="token" type="hidden" name="_token" value="{{ csrf_token() }}" />

    {{-- Header --}}
    <div class="row with-padding">
        <div class="col-xs-12">
            <div class="pull-right">
                @if(Auth::user()->hasPermission('access.users', 'CREATE'))
                    <div class="new-user">New User +</div>
                @endif
            </div>

            <h3 class="page-title">Users</h3>

            <p class="protip">
                <i class="fa fa-info"></i>
                {{ new App\Tips\Users }}
            </p>
        </div>
    </div>

    {{-- Table --}}
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Dashboard Access</th>
                    <th>Role</th>
                    <th>Created At</th>
                    <th>Last Logged In</th>

                    @if(Auth::user()->hasPermission('access.users', 'DELETE'))
                        <th class="no-sort"></th>
                    @endif
                </tr>
            </thead>

            <tbody>
                @foreach(App\User::all() as $user)
                    <tr class="user" data-user="{{ $user->id }}">
                        <td>{{ $user->name }}</td>
                        <td>{{ $user->email }}</td>
                        <td>{{ $user->dashboard_access ? 'Yes' : 'No' }}</td>
                        <td>{{ $user->role }}</td>
                        <td>{{ date('M j, Y - g:i A', strtotime($user->created_at)) }}</td>
                        <td>{{ $user->lastLoginAttempt() }}</td>

                        @if(Auth::user()->hasPermission('access.users', 'DELETE'))
                            <td>
                                @if($user->role != 'Admin')
                                    <div class="btn btn-delete delete-user" data-id="{{ $user->id }}">Delete</div>
                                @endif
                            </td>
                        @endif
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    {{-- New User --}}
    <div class="new-users">
        <div class="overlay-user">
            <div class="add-user">
                <div class="box">
                    {!! Form::open(['url' => '/dashboard/access/users/new']) !!}
                        {!! Form::label('name') !!}
                        {!! Form::text('name') !!}

                        {!! Form::label('email') !!}
                        {!! Form::email('email') !!}

                        {!! Form::label('password') !!}
                        {!! Form::password('password') !!}

                        <label for="dashboard_access"> Dashboard Access
                            {!! Form::checkbox('dashboard_access') !!}
                        </label>

                        {!! Form::select('role', App\Roles\Role::getAllRoles()) !!}
                        <button>Submit</button>
                    {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>
@endif
