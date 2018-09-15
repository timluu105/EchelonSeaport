<li class="active" id="home">Home</li>

@if(Auth::user()->hasPermission('access.logins'))
    <li id="logins">Recent Login Attempts</li>
@endif

@if(Auth::user()->hasPermission('access.users'))
    <li id="users">Users</li>
@endif
