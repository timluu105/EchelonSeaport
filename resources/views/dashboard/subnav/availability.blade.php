<li class="active" id="home">Home</li>

@if(Auth::user()->hasPermission('availability.table'))
    <li id="table">Table</li>
@endif
