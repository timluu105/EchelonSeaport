@if(Auth::user()->hasPermission('access.logins'))
    <h2 class="dashboard-page-link"><a href="/dashboard/access/logins"><i class="fa fa-long-arrow-right"></i> Recent Login Attempts</a></h2>
@endif

@if(Auth::user()->hasPermission('access.users'))
    <h2 class="dashboard-page-link"><a href="/dashboard/access/users"><i class="fa fa-long-arrow-right"></i> Users</a></h2>
@endif
