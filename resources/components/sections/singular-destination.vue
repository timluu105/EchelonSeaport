<template>
    <div class="singular-destination-component">
        <div class="singular-destination-component-title-row">
            <h1 class="singular-destination-component-title-row-title">
                {{$t("singular-destination.two-addresses")}}<br />
                {{$t("singular-destination.singular-destination")}}
            </h1>

            <p class="singular-destination-component-title-row-body">
                {{$t("singular-destination.text-1")}}
            </p>
        </div>

        <div class="singular-destination-component-image-row">
            <div class="column left">
                <div class="image"></div>

                <div class="text">
                    <h2>{{$t("singular-destination.133-Seaport")}}</h2>
                    <p>{{$t("singular-destination.text-2")}}</p>
                </div>
            </div>

            <div class="column right">
                <div class="image"></div>

                <div class="text">
                    <h2>{{$t("singular-destination.135-Seaport")}}</h2>
                    <p>{{$t("singular-destination.text-3")}}</p>
                </div>
            </div>
        </div>
    </div>
</template>
