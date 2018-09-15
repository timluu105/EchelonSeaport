<template>
    <div class="neighborhood-map-component">
        <div class="neighborhood-map-component-inner">
            <div class="neighborhood-map-component-column neighborhood-map">
                <div
                    v-for="map in maps"
                    class="neighborhood-map-image"
                    :class="{ active: currentMap === map.id }"
                    :style="{ backgroundImage: 'url(/img/neighborhood/map/' + map.image + ')' }">
                </div>
            </div>

            <div class="neighborhood-map-component-column categories">
                <div
                    v-for="map in maps"
                    class="categories-block"
                    :class="{ active: currentMap === map.id }">

                    <div
                        class="categories-block-title"
                        :class="{ active: currentMap === map.id }"
                        @click="setActiveMap(map.id)">

                        <span>{{ map.title }}</span>
                    </div>

                    <div
                        class="categories-block-location-list"
                        :class="{ 'visible-mobile': currentMap === map.id }">

                        <div
                            v-for="location in map.locations"
                            class="categories-block-location-list-item">

                            {{ location }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                currentMap: "all",

                maps: [
                    {
                        id: "all",
                        image: "all.jpg",
                        title: "All",
                        locations: []
                    },

                    {
                        id: "dining",
                        image: "dining.jpg",
                        title: "Dining",

                        locations: [
                            "75 on Liberty Wharf",
                            "Aura",
                            "Babbo",
                            "Bastille Kitchen",
                            "Blue Dragon",
                            "by Chloe",
                            "Caffe Nero",
                            "Committee",
                            "Del Frisco's Double Eagle Steakhhouse",
                            "Empire",
                            "Flour Bakery",
                            "Drink",
                            "James Hook & Co",
                            "Legal Harborside",
                            "Legal Test Kitchen",
                            "Lola 42",
                            "Lolita",
                            "Lookout Rooftop",
                            "Mastro's Ocean Club",
                            "Menton",
                            "Meritage",
                            "Morton's",
                            "Nebo",
                            "Oak + Rowan",
                            "Ocean Prime",
                            "Rosa Mexicano",
                            "Row 34",
                            "Rowe's Wharf Sea Grille",
                            "Salvatore's",
                            "Sapore Restaurant & Bar",
                            "Smith & Wollensky",
                            "Sportello",
                            "Strega Waterfront",
                            "The Barking Crab",
                            "Trade",
                            "Trillium Brewing Co."
                        ]
                    },

                    {
                        id: "shopping",
                        image: "shopping.jpg",
                        title: "Shopping",

                        locations: [
                            "BlueMercury",
                            "Bonobo's",
                            "CVS",
                            "Equinox",
                            "Everbody Fights",
                            "Filson",
                            "Lululemon",
                            "MiniLuxe",
                            "Warby Parker"
                        ]
                    },

                    {
                        id: "culture",
                        image: "culture.jpg",
                        title: "Culture",

                        locations: [
                            "Blue Hills Bank Concert Pavilion",
                            "Boston Children's Museum",
                            "Boston Convention & Exhibition Center",
                            "Boston Fish Pier",
                            "Boston Tea Party Museum",
                            "Children's Wharf Park",
                            "District Hall",
                            "Fan Pier Park",
                            "Fort Point Arts Community Gallery",
                            "Institute of Contemporary Art (ICA)",
                            "Kings",
                            "Lawn on D",
                            "Post Office Square",
                            "Rose Fitzgerald Kennedy Greenway",
                            "Seagreen Park",
                            "Seaport Common",
                            "Seaport World Trade Center",
                            "Showcase ICON Theater",
                            "Society of Arts & Crafts",
                            "South Boston Maritime Park",
                            "Spirit of Boston",
                            "The Grand"
                        ]
                    },

                    {
                        id: "hotels",
                        image: "hotels.jpg",
                        title: "hotels",

                        locations: [
                            "Boston Harbor Hotel",
                            "Hilton Downtown",
                            "Intercontinental Boston",
                            "Renaissance Hotel",
                            "Seaport Hotel",
                            "The Envoy Hotel",
                            "The Langham",
                            "The Westin",
                            "Yotel"
                        ]
                    }
                ]
            };
        },

        methods: {
            setActiveMap(id) {
                if (this.currentMap === id) {
                    this.currentMap = "all";
                } else {
                    this.currentMap = id;
                }
            }
        },

        created() {
            // Add all the locations from each category to the "all" category
            this.maps.forEach((map, index) => {
                if (index > 0) {
                    map.locations.forEach((location) => {
                        this.maps[0].locations.push(location);
                    });
                }
            });
        }
    };
</script>
