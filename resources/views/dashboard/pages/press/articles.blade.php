@if(Auth::user()->hasPermission('press.articles'))
    <div class="row">
        <div class="col-xs-12">
            <div class="pull-right">
                @if(Auth::user()->hasPermission('press.articles', 'CREATE'))
                    <div class="new-article">New Article +</div>
                @endif
            </div>

            <h3 class="page-title">Articles</h3>

            <p class="protip">
                <i class="fa fa-info"></i>
                {{ new App\Tips\Press }}
            </p>
        </div>
    </div>

    <input id="token" type="hidden" name="_token" value="{{ csrf_token() }}" />

    <ul class="items">
        @foreach(\App\Models\Press::orderBy(\App\Models\Press::$sort_column, 'desc')->get() as $press)
            <li class="item press-item interactive {{ $press->enabled ? 'active' : '' }}" data-id="{{ $press->id }}">
                <div class="item-head">
                    @if(Auth::user()->hasPermission('press.articles', 'UPDATE') && \App\Models\Press::$sort_column == 'order')
                        <div class="item-sort">
                            <i class="fa fa-bars sort-icon" title="Click and drag to reorder"></i>
                        </div>
                    @endif

                    <div class="item-info">{{ $press->title }}</div>

                    <div class="item-buttons">
                        @if(Auth::user()->hasPermission('press.articles', 'DELETE'))
                            <div class="item item-delete" data-id="{{ $press->id }}">
                                <div class="hidden-xs">DELETE</div>
                                <div class="visible-xs">DEL</div>
                            </div>
                        @endif

                        @if(Auth::user()->hasPermission('press.articles', 'UPDATE'))
                            <div class="item toggle-item {{ $press->enabled ? 'item-enabled' : 'item-disabled' }}" data-id="{{ $press->id }}">
                                @if($press->enabled)
                                    ENABLED
                                @else
                                    DISABLED
                                @endif
                            </div>
                        @endif
                    </div>
                </div>

                <div class="item-body">
                    {!! Form::open() !!}
                        @foreach([ 'title', 'publisher', 'date', 'image', 'pdf', 'description' ] as $item)
                            <div class="form-row {{ $item === 'pdf' ? 'file-upload-row' : '' }}">
                                {!! Form::label($item) !!}

                                <span {!! $item === 'description' ? 'class="article-description"' : '' !!}>
                                    @if(Auth::user()->hasPermission('press.articles', 'UPDATE'))
                                        @if($item === 'description')
                                            {!! Form::textarea(null, $press->$item, [ 'data-title' => $press->title, 'data-name' => $item, 'data-id' => $press->id, 'autocomplete' => 'off', 'class' => 'no-border' ]) !!}
                                        @elseif($item === 'date')
                                            {!! Form::text(null, $press->$item, [ 'data-title' => $press->title, 'data-name' => $item, 'data-id' => $press->id, 'autocomplete' => 'off', 'class' => 'date-picker' ]) !!}
                                        @elseif($item === 'image')
                                            @set('image_path', base_path() . '/public/' . App\Models\Press::$uploads_dir . $press->id . '.jpg')

                                            <div class="file-upload {{ file_exists($image_path) ? 'has-file' : '' }}">
                                                <input name="image" class="file-upload-input image" type="file" data-title="{{ $press->title }}" data-name="{{ $item }}" data-id="{{ $press->id }}" />

                                                <div class="file-upload-label">
                                                    <div class="file-yes"><a href="{{ App\Models\Press::$uploads_dir }}{{ $press->id }}.jpg" title="View image in a new window" target="_blank"><img class="thumb" src="{{ App\Models\Press::$uploads_dir }}{{ $press->id }}.jpg?{{ time() }}" /></a></div>
                                                    <div class="file-no">NONE</div>
                                                </div>

                                                <div class="file-upload-delete image" data-id="{{ $press->id }}">
                                                    <span class="hidden-xs">DELETE</span>
                                                    <span class="visible-xs">DEL</span>
                                                </div>
                                            </div>
                                        @elseif($item === 'pdf')
                                            @set('pdf_path', base_path() . '/public' . App\Models\Press::$uploads_dir . $press->id . '.pdf')

                                            <div class="file-upload {{ file_exists($pdf_path) ? 'has-file' : '' }}">
                                                <input name="pdf" class="file-upload-input pdf" type="file" data-title="{{ $press->title }}" data-name="{{ $item }}" data-id="{{ $press->id }}" />

                                                <div class="file-upload-label">
                                                    <div class="file-yes"><a href="{{ App\Models\Press::$uploads_dir }}{{ $press->id }}.pdf" title="Preview PDF in a new window" target="_blank">PDF</a></div>
                                                    <div class="file-no">NONE</div>
                                                </div>

                                                <div class="file-upload-delete pdf" data-id="{{ $press->id }}">
                                                    <span class="hidden-xs">DELETE</span>
                                                    <span class="visible-xs">DEL</span>
                                                </div>
                                            </div>
                                        @else
                                            {!! Form::text(null, $press->$item, [ 'data-title' => $press->title, 'data-name' => $item, 'data-id' => $press->id, 'autocomplete' => 'off' ]) !!}
                                        @endif

                                        <div class="status">
                                            <div class="waiting"><i class="fa fa-spin fa-clock-o"></i></div>
                                            <div class="sending"><i class="fa fa-spin fa-circle-o-notch"></i></div>
                                            <div class="success"><i class="fa fa-check"></i></div>
                                            <div class="failure"><i class="fa fa-times"></i></div>
                                        </div>
                                    @else
                                        {!! Form::text($item, $press->$item, [ 'disabled' => 'disabled' ]) !!}
                                    @endif
                                </span>
                            </div>
                        @endforeach
                    {!! Form::close() !!}
                </div>
            </li>
        @endforeach
    </ul>

    <div class="new-articles">
        <div class="overlay-article">
            <div class="add-article">
                <div class="box">
                    {!! Form::open([ 'id' => 'new-article-form', 'url' => '/dashboard/press/articles/new' ]) !!}
                        {!! Form::label('title') !!}
                        {!! Form::text('title') !!}

                        {!! Form::label('publisher') !!}
                        {!! Form::text('publisher') !!}

                        {!! Form::label('date') !!}
                        {!! Form::text('date', null, [ 'autocomplete' => 'off', 'class' => 'date-picker' ]) !!}

                        <div class="file-box">
                            <label for="image" class="file-label">Image: <span></span></label>
                            <input id="image" name="image" class="file-input" type="file" />
                            <button id="image-clear" class="file-clear">Clear</button>
                        </div>

                        <div class="file-box">
                            <label for="pdf" class="file-label">PDF File: <span></span></label>
                            <input id="pdf" name="pdf" class="file-input" type="file" />
                            <button id="pdf-clear" class="file-clear">Clear</button>
                        </div>

                        {!! Form::label('description') !!}
                        {!! Form::textarea('description') !!}

                        <button id="submit">
                            <span class="submit-text">Add Article</span>
                            <i class="submit-spinner fa fa-refresh fa-spin fa-3x fa-fw margin-bottom"></i>
                        </button>
                    {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>
@endif
