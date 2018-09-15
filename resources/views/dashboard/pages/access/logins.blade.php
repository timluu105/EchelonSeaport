@if(Auth::user()->hasPermission('access.logins'))
    {{-- Page Options --}}
    <div class="page-options" data-container="full"></div>

    {{-- Header --}}
    <div class="row with-padding">
        <div class="col-xs-12">
            <h3>Recent Login Attempts</h3>
        </div>
    </div>

    {{-- Table --}}
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th class="no-sort">Success</th>
                    <th>User</th>
                    <th>IP</th>
                    <th>Browser</th>
                    <th>OS</th>
                    <th>Date</th>
                    <th>Time</th>
                </tr>
            </thead>

            <tbody>
                @foreach(App\Models\LoginHistory::all()->reverse() as $login)
                    <tr>
                        @if($login->successful)
                            <td><i class="fa fa-check"></i></td>
                        @else
                            <td><i class="fa fa-times"></i></td>
                        @endif

                        <td>{{ $login->email }}</td>
                        <td>{{ $login->ip }}</td>
                        <td>{{ $parser->parse($login->user_agent)->ua->toString() }}</td>
                        <td>{{ $parser->parse($login->user_agent)->os->toString() }}</td>
                        <td>{{ date('M j, Y', strtotime($login->created_at)) }}</td>
                        <td>{{ date('g:i A', strtotime($login->created_at)) }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endif
