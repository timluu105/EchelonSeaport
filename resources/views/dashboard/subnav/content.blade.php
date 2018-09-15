<li class="active" id="home">Home</li>

@if(Auth::user()->hasPermission('content.meta'))
    <li id="meta">Meta</li>
@endif
