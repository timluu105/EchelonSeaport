<li class="active" id="home">Home</li>

@if(Auth::user()->hasPermission('press.articles'))
    <li id="articles">Articles</li>
@endif
