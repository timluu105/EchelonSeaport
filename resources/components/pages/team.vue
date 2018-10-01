<template>
    <div class="team-component">
        <div
            v-for="member in team"
            class="team-member">

            <h2 v-html="member.role"></h2>
            <h1 v-html="member.name"></h1>
            <p v-html="member.body"></p>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                team: [
                    {
                        role: "Developer",
                        name: "Cottonwood Management",
                        body: window.trans["team"]["team-1"]
                    },

                    {
                        role: "Architect",
                        name: "Kohn Pedersen Fox",
                        body: window.trans["team"]["team-2"]
                    },

                    {
                        role: "Amenities Interiors",
                        name: "Jeffrey Beers International",
                        body: window.trans["team"]["team-3"]
                    },

                    {
                        role: "Service Standards",
                        name: "Regent Hotels &amp; Resorts",
                        body: window.trans["team"]["team-4"]
                    },

                    {
                        role: "Residence Architect",
                        name: "CBT Architects",
                        body: window.trans["team"]["team-5"]
                    },

                    {
                        role: "Builder",
                        name: "John Moriarty &amp; Associates",
                        body: window.trans["team"]["team-6"]
                    },

                    {
                        role: "Sales &amp; Marketing",
                        name: "TCC - The Collaborative Companies",
                        body: window.trans["team"]["team-7"]
                    }
                ]
            };
        }
    };
</script>
