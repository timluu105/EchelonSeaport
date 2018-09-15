@if(Auth::user()->hasPermission('availability.table', 'READ'))
    {{-- Page Options --}}
    <div class="page-options" data-container="full"></div>
    <input id="token" type="hidden" name="_token" value="{{ csrf_token() }}" />

    {{-- Header --}}
    <div class="row with-padding">
        <div class="col-xs-12">
            <div class="pull-right">
                @if(Auth::user()->hasPermission('availability.table', 'CREATE'))
                    <div id="new-unit" class="new-unit">New Unit +</div>
                @endif
            </div>

            <h3 class="page-title">Availability</h3>

            <p class="protip">
                <i class="fa fa-info"></i>
                {{ new App\Tips\Availability }}
            </p>
        </div>
    </div>

    {{-- Table --}}
    @set('floorplan_base', '/img/floorplans/')
    @set('floorplan_images', preg_replace([ '/.*\//', '/\..*/' ], [ '', '' ], glob(base_path() . '/public' . $floorplan_base . '*')))

    <div class="table-responsive">
        <table class="table">
            <thead>
                <tr>
                    <th>Building</th>
                    <th>Residence</th>
                    <th>Beds</th>
                    <th>Baths</th>
                    <th>Area Sq. Ft.</th>
                    <th>Exterior Sq. Ft.</th>
                    <th>Price</th>
                    <th>CC</th>
                    <th>Taxes</th>
                    <th>Floor Plan</th>
                    <th>Available</th>

                    @if(Auth::user()->hasPermission('availability.table', 'DELETE'))
                        <th></th>
                    @endif
                </tr>
            </thead>
            <tbody>
                @if(Auth::user()->hasPermission('availability.table', 'CREATE'))
                    <tr id="new-units" class="new-units">
                        {!! Form::open(['url' => '/dashboard/units/table/new']) !!}
                            <td>
                                <select id="building" name="building" class="building">
                                    @foreach(App\Models\Unit::$buildings as $index => $building)
                                        @if($index === 0)
                                            <option value="{{ $building }}" selected="selected">{{ $building }}</option>
                                        @else
                                            <option value="{{ $building }}">{{ $building }}</option>
                                        @endif
                                    @endforeach
                                </select>
                            </td>

                            <td>{!! Form::text('residence', null, [ 'id' => 'residence', 'class' => 'new' ]) !!}</td>
                            <td>{!! Form::text('beds', null, [ 'id' => 'beds', 'class' => 'new' ]) !!}</td>
                            <td>{!! Form::text('baths', null, [ 'id' => 'baths', 'class' => 'new' ]) !!}</td>
                            <td>{!! Form::text('area', null, [ 'id' => 'area', 'class' => 'new' ]) !!}</td>
                            <td>{!! Form::text('exterior', null, [ 'id' => 'exterior', 'class' => 'new' ]) !!}</td>
                            <td>{!! Form::text('price', null, [ 'id' => 'price', 'class' => 'new' ]) !!}</td>
                            <td>{!! Form::text('cc', null, [ 'id' => 'cc', 'class' => 'new' ]) !!}</td>
                            <td>{!! Form::text('taxes', null, [ 'id' => 'taxes', 'class' => 'new' ]) !!}</td>

                            <td>
                                <select id="floor_plan" name="floor_plan" class="floor_plan">
                                    <option value="" selected="selected"></option>

                                    @foreach($floorplan_images as $index => $fp_image)
                                        <option value="{{ $fp_image }}">{{ $fp_image }}</option>
                                    @endforeach
                                </select>
                            </td>

                            <td>{!! Form::checkbox('available', 1, true, [ 'id' => 'available' ]) !!}</td>
                            <td><button id="add-unit">Add</button></td>
                        {!! Form::close() !!}
                    </tr>
                @endif

                @foreach(App\Models\Unit::orderBy('building')->get() as $index => $unit)
                    <tr class="unit" data-unit="{{ $unit->id }}">
                        @if(Auth::user()->hasPermission('availability.table', 'UPDATE'))
                            <td data-row="{{ $index }}" data-col="1">
                                <select name="building" class="building" data-id="{{ $unit->id }}">
                                    @set('building_set', false)

                                    @foreach(App\Models\Unit::$buildings as $index => $building)
                                        @if($unit->building === $building)
                                            @set('building_set', true)
                                            <option value="{{ $building }}" selected="selected">{{ $building }}</option>
                                        @else
                                            <option value="{{ $building }}">{{ $building }}</option>
                                        @endif
                                    @endforeach

                                    @if($building_set === false)
                                        <option value="{{ $unit->building }}" selected="selected">...</option>
                                    @endif
                                </select>
                            </td>

                            <td data-row="{{ $index }}" data-col="1"><input autocomplete="off" name="residence" type="text" data-id="{{ $unit->id }}" placeholder="..." value="{{ $unit->residence }}" /></td>
                            <td data-row="{{ $index }}" data-col="2"><input autocomplete="off" name="beds" type="text" data-id="{{ $unit->id }}" placeholder="..." value="{{ $unit->beds }}" /></td>
                            <td data-row="{{ $index }}" data-col="3"><input autocomplete="off" name="baths" type="text" data-id="{{ $unit->id }}" placeholder="..." value="{{ $unit->baths }}" /></td>
                            <td data-row="{{ $index }}" data-col="4"><input autocomplete="off" name="area" type="text" data-id="{{ $unit->id }}" placeholder="..." value="{{ $unit->area }}" /></td>
                            <td data-row="{{ $index }}" data-col="4"><input autocomplete="off" name="exterior" type="text" data-id="{{ $unit->id }}" placeholder="..." value="{{ $unit->exterior }}" /></td>
                            <td data-row="{{ $index }}" data-col="5"><input autocomplete="off" name="price" type="text" data-id="{{ $unit->id }}" placeholder="..." value="{{ $unit->price }}" /></td>
                            <td data-row="{{ $index }}" data-col="5"><input autocomplete="off" name="cc" type="text" data-id="{{ $unit->id }}" placeholder="..." value="{{ $unit->cc }}" /></td>
                            <td data-row="{{ $index }}" data-col="5"><input autocomplete="off" name="taxes" type="text" data-id="{{ $unit->id }}" placeholder="..." value="{{ $unit->taxes }}" /></td>

                            <td data-row="{{ $index }}" data-col="6">
                                <select name="floor_plan" class="floor_plan" data-id="{{ $unit->id }}">
                                    @set('floorplan_set', false)

                                    @foreach($floorplan_images as $fp_image)
                                        @if($unit->floor_plan == $fp_image)
                                            @set('floorplan_set', true)
                                            <option value="{{ $fp_image }}" selected="selected">{{ $fp_image }}</option>
                                        @else
                                            <option value="{{ $fp_image }}">{{ $fp_image }}</option>
                                        @endif
                                    @endforeach

                                    @if(!$floorplan_set)
                                        @if($unit->floor_plan != '')
                                            <option value="{{ $unit->floor_plan }}" selected="selected">...</option>
                                        @else
                                            <option value="" selected="selected"></option>
                                        @endif
                                    @else
                                        <option value=""></option>
                                    @endif
                                </select>
                            </td>

                            <td data-row="{{ $index }}" data-col="7"><input name="available" type="checkbox" data-id="{{ $unit->id }}" {{ $unit->available === 1 ? 'checked' : '' }} /></td>
                        @else
                            <td>{{ $unit->residence }}</td>
                            <td>{{ $unit->beds }}</td>
                            <td>{{ $unit->baths }}</td>
                            <td>{{ $unit->area }}</td>
                            <td>{{ $unit->price }}</td>
                            <td>{{ $unit->floor_plan }}</td>
                            <td>{{ $unit->available }}</td>
                        @endif

                        @if(Auth::user()->hasPermission('availability.table', 'DELETE'))
                            <td><div class="btn btn-delete delete-unit" data-id="{{ $unit->id }}">Delete</div></td>
                        @endif
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endif
