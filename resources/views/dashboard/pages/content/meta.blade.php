@if(Auth::user()->hasPermission('content.meta'))
    <div class="row">
        <div class="col-xs-12">
            <div class="pull-right">

                @if(Auth::user()->hasPermission('content.meta', 'CREATE'))
                    <div class="new-item">New Item +</div>
                @endif

            </div>

            <h3 class="page-title">Meta</h3>

            <p class="protip">
                <i class="fa fa-info"></i>
                {{ new App\Tips\Meta }}
            </p>
        </div>
    </div>

    <ul class="items" id="order-items">
        @foreach(App\Models\Meta::all() as $m)
            <li class="item interactive {{ ($m->enabled || ($m->page === 'default')) ? 'active' : '' }} {{ $m->page === 'default' ? 'default' : '' }}" data-id="{{ $m->id }}">
                <div class="item-head">
                    <div class="item-info">{{ $m->page }}</div>

                    <div class="item-buttons">
                        @if($m->page !== 'default')
                            @if(Auth::user()->hasPermission('content.meta', 'DELETE') && ($m->page !== 'dashboard'))
                                <div class="item item-delete" data-id="{{ $m->id }}">
                                    <div class="hidden-xs">DELETE</div>
                                    <div class="visible-xs">DEL</div>
                                </div>
                            @endif

                            @if(Auth::user()->hasPermission('content.meta', 'UPDATE'))
                                <div class="item toggle-item {{ $m->enabled ? 'item-enabled' : 'item-disabled' }}" data-id="{{ $m->id }}">
                                    @if($m->enabled)
                                        ENABLED
                                    @else
                                        DISABLED
                                    @endif
                                </div>
                            @endif
                        @endif
                    </div>
                </div>

                <div class="item-body">
                    {!! Form::open() !!}
                        @foreach(['title', 'description', 'keywords'] as $item)
                            <div class="form-row">
                                {!! Form::label($item) !!}

                                <span>
                                    @if(Auth::user()->hasPermission('content.meta', 'UPDATE'))
                                        {!! Form::text($item, $m->$item, ['data-page' => $m->page, 'data-name' => $item, 'data-id' => $m->id, 'autocomplete' => 'off']) !!}

                                        <div class="status">
                                            <div class="waiting"><i class="fa fa-spin fa-clock-o"></i></div>
                                            <div class="sending"><i class="fa fa-spin fa-circle-o-notch"></i></div>
                                            <div class="success"><i class="fa fa-check"></i></div>
                                            <div class="failure"><i class="fa fa-times"></i></div>
                                        </div>
                                    @else
                                        {!! Form::text($item, $m->$item, ['disabled' => 'disabled']) !!}
                                    @endif
                                </span>
                            </div>
                        @endforeach
                    {!! Form::close() !!}
                </div>
            </li>
        @endforeach
    </ul>
@endif
