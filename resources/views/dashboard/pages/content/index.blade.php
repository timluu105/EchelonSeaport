@if(Auth::user()->hasPermission('content.meta'))
    <h2 class="dashboard-page-link"><a href="/dashboard/content/meta"><i class="fa fa-long-arrow-right"></i> Edit Meta Data</a></h2>
@endif
