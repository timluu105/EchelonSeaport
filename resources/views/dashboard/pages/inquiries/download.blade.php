@if(Auth::user()->hasPermission('inquiries.download'))
    {{-- Header --}}
    <div class="row">
        <div class="col-xs-12">
            <h3 class="page-title">Download Inquiries</h3>

            <p class="protip">
                <i class="fa fa-info"></i>
                There are {{ count(App\Models\Inquiry::all()) }} inquiries in total!
            </p>
        </div>
    </div>

    {{-- Divider --}}
    <div class="row">
        <div class="col-xs-12">
            <br />
        </div>
    </div>

    {{-- Buttons --}}
    <div class="row">
        <div class="col-xs-12">
            @set('filename', preg_replace([ '/\ /', '/[^a-z0-9\-]/' ], [ '-', '' ], strtolower(env('APP_NAME'))) . '-inquiries-' . date('m-d-Y'))
            <a class="download-btn" href="/dashboard/inquiries/download/{{ $filename }}.csv">Download As CSV</a>
            <a class="download-btn" href="/dashboard/inquiries/download/{{ $filename }}.xlsx">Download As Excel</a>
        </div>
    </div>
@endif
