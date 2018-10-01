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
                        role: window.trans["team"]["team-1-role"],
                        name: "Cottonwood Management",
                        body: window.trans["team"]["team-1"]
                    },

                    {
                        role: window.trans["team"]["team-2-role"],
                        name: "Kohn Pedersen Fox",
                        body: window.trans["team"]["team-2"]
                    },

                    {
                        role: window.trans["team"]["team-3-role"],
                        name: "Jeffrey Beers International",
                        body: window.trans["team"]["team-3"]
                    },

                    {
                        role: window.trans["team"]["team-4-role"],
                        name: window.trans["team"]["team-4-name"],
                        body: window.trans["team"]["team-4"]
                    },

                    {
                        role: window.trans["team"]["team-5-role"],
                        name: "CBT Architects",
                        body: window.trans["team"]["team-5"]
                    },

                    {
                        role: window.trans["team"]["team-6-role"],
                        name: "John Moriarty &amp; Associates",
                        body: window.trans["team"]["team-6"]
                    },

                    {
                        role: window.trans["team"]["team-7-role"],
                        name: "TCC - The Collaborative Companies",
                        body: window.trans["team"]["team-7"]
                    }
                ]
            };
        }
    };
</script>
