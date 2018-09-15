<li class="active" id="home">Home</li>

@if(Auth::user()->hasPermission('inquiries.view'))
    <li id="view">View</li>
@endif

@if(Auth::user()->hasPermission('inquiries.download'))
    <li id="download">Download</li>
@endif
