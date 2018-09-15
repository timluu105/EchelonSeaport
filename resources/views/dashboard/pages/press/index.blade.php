@if(Auth::user()->hasPermission('press.articles'))
    <h2 class="dashboard-page-link"><a href="/dashboard/press/articles"><i class="fa fa-long-arrow-right"></i> Edit Press Articles</a></h2>
@endif
