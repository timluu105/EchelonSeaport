<template>
    <div class="availability-table-component">
        <div class="container">
            <div class="row">
                <div class="col-xs-12">
                    <h1 class="availability-table-component-header">
                        {{ cBuilding }} Seaport Blvd
                    </h1>

                    <table>
                        <thead>
                            <tr>
                                <th class="sort asc" @click.stop="sortClass" data-sort="residence-sort">Residences</th>
                                <th class="sort" @click.stop="sortClass" data-sort="beds-sort">Beds</th>
                                <th class="sort" @click.stop="sortClass" data-sort="baths-sort">Baths</th>
                                <th class="sort" @click.stop="sortClass" data-sort="area-sort-f">Interior SF</th>
                                <th class="sort" @click.stop="sortClass" data-sort="exterior-sort-f">Exterior SF</th>
                                <th class="sort" @click.stop="sortClass" data-sort="price-sort">Price</th>
                                <!-- <th class="sort" @click.stop="sortClass" data&#45;sort="cc&#45;sort">Common Charges</th> -->
                                <!-- <th class="sort" @click.stop="sortClass" data&#45;sort="taxes&#45;sort">RE Taxes</th> -->
                                <th>Floor Plan</th>
                            </tr>
                        </thead>

                        <tbody class="list">
                            <tr class="availability-row" v-for="unit in cUnits" :data-unit="unit.residence">
                                <td class="mobile-header" @click.stop="toggleRow">
                                    <span class="mobile-label">Residence</span>
                                    <span class="mobile-details">{{ unit.beds }} Bed / {{ unit.baths }} Bath </span>
                                    <span class="residence-sort" :data-value="unit.residence.replace(/[^0-9]/, '')">{{ unit.residence }}</span>
                                </td>

                                <td class="mobile-data">
                                    <span class="mobile-label">Bedrooms</span>
                                    <span class="beds-sort" :data-value="unit.beds.replace(/[^0-9]/, '')">{{ unit.beds }}</span>
                                </td>

                                <td class="mobile-data">
                                    <span class="mobile-label">Bathrooms</span>
                                    <span class="baths-sort" :data-value="unit.baths.replace(/[^0-9]/, '')">{{ unit.baths }}</span>
                                </td>

                                <td class="mobile-data area-column" @mouseover.prevent.stop="showMeters" @mouseout.prevent.stop="showFeet">
                                    <span class="mobile-label">Interior SF</span>
                                    <span class="area-sort-f unit-convert" :data-value="unit.area.replace(/[^0-9]/, '')">{{ unit.area }} (ft)</span>
                                </td>

                                <td class="mobile-data exterior-column" @mouseover.prevent.stop="showMeters" @mouseout.prevent.stop="showFeet">
                                    <span class="mobile-label">Exterior SF</span>
                                    <span class="exterior-sort-f unit-convert" :data-value="unit.exterior.replace(/[^0-9]/, '')">{{ unit.exterior }} (ft)</span>
                                </td>

                                <td class="mobile-data">
                                    <span class="mobile-label">Price</span>
                                    <span class="price-sort" :data-value="unit.price.replace(/,/g, '')">${{ unit.price }}</span>
                                </td>

                                <!-- <td class="mobile&#45;data"> -->
                                <!--     <span class="mobile&#45;label">Common Charges</span> -->
                                <!--     <span class="cc&#45;sort" :data&#45;value="unit.cc.replace(/,/g, '')">${{ unit.cc }}</span> -->
                                <!-- </td> -->

                                <!-- <td class="mobile&#45;data"> -->
                                <!--     <span class="mobile&#45;label">RE Taxes</span> -->
                                <!--     <span class="taxes&#45;sort" :data&#45;value="unit.taxes.replace(/,/g, '')">${{ unit.taxes }}</span> -->
                                <!-- </td> -->

                                <td class="mobile-data">
                                    <span class="mobile-label">Floor Plan</span>

                                    <template v-if="unit.floor_plan !== ''">
                                        <a @click.stop.prevent="viewFloorplan" data-category="View" :data-floorplan-image="unit.floor_plan" :href="unit.floor_plan" target="_blank">View</a> /
                                        <a @click.stop="fpAnalytics" data-category="Download" :href="'/download' + unit.floor_plan">Download</a>
                                    </template>

                                    <template v-else>
                                        -
                                    </template>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Analytics from "imports/analytics.js";

    export default {
        props: {
            cBuilding: {
                type: String,
                default: ""
            },

            cUnits: {
                type: Array,
                default: () => { return []; }
            }
        },

        data() {
            return {
                mobileTableBreak: this.$store.getters.getScreenBreak.screenMd
            };
        },

        methods: {
            numberWithCommas(x) {
                return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
            },

            // Sort from low to high
            sortListAsc(a, b) {
                return $(b).data("value") < $(a).data("value") ? 1 : -1;
            },

            // Sort from high to low
            sortListDesc(a, b) {
                return $(b).data("value") > $(a).data("value") ? 1 : -1;
            },

            // Sort the rows and append to the table
            sortRows(columnClicked, direction) {
                let newList;

                // Sort all the selected spans by the ascending or descening functions
                if (direction === "asc") {
                    newList = $(this.$el).find(`.${columnClicked}`).sort(this.sortListAsc);
                } else {
                    newList = $(this.$el).find(`.${columnClicked}`).sort(this.sortListDesc);
                }

                for (let i = 0; i < newList.length; i++) {
                    // Add the parent row to the tbody in the order they were sorted into
                    $(this.$el).find(newList[i]).parent().parent().appendTo($(this.$el).find("tbody"));
                }
            },

            // Add/remove desc and asc class based on click and call the appropriate sorting function
            sortClass(e) {
                // Get all the spans that have the data sort of the th that was clicked.
                const rowToSort = $(e.target).data("sort");

                // Remove the asc and desc class from any headings that have either and aren't the one being sorted
                $(this.$el).find("th").not(e.target).removeClass("asc desc");

                if ($(e.target).hasClass("desc")) {
                    // Add the ascending class and remove the descending class for the arrow animation
                    $(e.target).addClass("asc").removeClass("desc");

                    // Call the ascending sort function
                    this.sortRows(rowToSort, "asc");
                } else {
                    // Add the descending class and remove the ascending class for the arrow animation
                    $(e.target).addClass("desc").removeClass("asc");

                    // Call the descending sort function
                    this.sortRows(rowToSort, "desc");
                }
            },

            showMeters(e) {
                // When area column is hovered over, show the meters
                const $unitConvert = $(e.target).find(".unit-convert").first(),
                    feet = $unitConvert.data("value"),
                    meters = Math.round(feet * 0.09290304),
                    meterText = meters !== undefined && feet > 0 ? this.numberWithCommas(meters) : -1;

                if (meterText !== -1) {
                    $unitConvert.text(`${meterText} (m)`);
                }
            },

            showFeet(e) {
                // On mouseout, show the feet
                const $unitConvert = $(e.target).find(".unit-convert").first(),
                    feet = $unitConvert.data("value"),
                    feetText = feet !== undefined && feet > 0 ? this.numberWithCommas(feet) : -1;

                if (feetText !== -1) {
                    $unitConvert.text(`${feetText} (ft)`);
                }
            },

            toggleRow(e) {
                const $parent = $(e.target).parent();

                if ($(window).width() < this.mobileTableBreak) {
                    if ($parent.hasClass("visible")) {
                        $parent.removeClass("visible");
                    } else {
                        $(this.$el).find(".availability-row").removeClass("visible");
                        $parent.addClass("visible");
                    }
                }
            },

            fpAnalytics(e) {
                const $this = $(e.target),
                    category = $this.data("category"),
                    unit = $this.closest(".availability-row").data("unit");

                Analytics.send("event", {
                    eventAction: "Floorplan",
                    eventCategory: category,
                    eventLabel: unit
                });
            },

            viewFloorplan(e) {
                this.fpAnalytics(e);
                this.$emit("view-floorplan", $(e.target).data("floorplan-image").split(";"));
            }
        }
    };
</script>
