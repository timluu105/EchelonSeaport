@if(Auth::user()->hasPermission('inquiries.view'))
    {{-- Page Options --}}
    <div class="page-options" data-container="full"></div>

    {{-- Header --}}
    <div class="row with-padding">
        <div class="col-xs-12">
            <h3 class="page-title">Inquiries</h3>

            <p class="protip">
                <i class="fa fa-info"></i>
                There are {{ count(App\Models\Inquiry::all()) }} inquiries in total!
            </p>
        </div>
    </div>

    {{-- Table --}}
    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    @foreach(App\Models\Inquiry::getInquiryColumnTitles() as $column)
                        <th>{{ $column }}</th>
                    @endforeach
                </tr>
            </thead>

            <tbody>
                @foreach(App\Models\Inquiry::getInquiryData() as $i)
                    <tr>
                        @foreach($i as $inquiry_column)
                            <td>{{ $inquiry_column }}</td>
                        @endforeach
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endif
