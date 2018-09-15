@if(Auth::user()->hasPermission('availability.table', 'READ'))
    <h2 class="dashboard-page-link"><a href="/dashboard/availability/table"><i class="fa fa-long-arrow-right"></i> Edit Units Table</a></h2>
@endif
