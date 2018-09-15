<h3>List of Pages:</h3>
<hr />

<ul>
    @foreach(Auth::user()->listPerms() as $perm)
        {{-- If it doesn't have a `.` then it's not a page --}}
        @if(strpos($perm->page, '.') !== false)
            <li>
                @set('page', ucfirst(explode('.', $perm->page)[1]))

                @if($page === 'View')
                    @set('page_name', 'View Inquiries')
                @elseif($page === 'Download')
                    @set('page_name', 'Download Inquiries')
                @elseif($page === 'Table')
                    @set('page_name', 'Availability Editor')
                @elseif($page === 'Pages')
                    @set('page_name', 'Page Content')
                @else
                    @set('page_name', $page)
                @endif

                <a href="/dashboard/{{ str_replace('.', '/', $perm->page) }}">{{ $page_name }}</a>
            </li>
        @endif
    @endforeach
</ul>
