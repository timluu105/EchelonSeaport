@if(Auth::user()->hasPermission('inquiries.view'))
    <h2 class="dashboard-page-link"><a href="/dashboard/inquiries/view"><i class="fa fa-long-arrow-right"></i> View Inquiries</a></h2>
@endif

@if(Auth::user()->hasPermission('inquiries.download'))
    <h2 class="dashboard-page-link"><a href="/dashboard/inquiries/download"><i class="fa fa-long-arrow-right"></i> Download Inquiries</a></h2>
@endif
