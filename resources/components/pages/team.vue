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
                        role: this.$t("team.team-1-role"),
                        name: "Cottonwood Management",
                        body: this.$t("team.team-1")
                    },

                    {
                        role: this.$t("team.team-2-role"),
                        name: "Kohn Pedersen Fox",
                        body: this.$t("team.team-2")
                    },

                    {
                        role: this.$t("team.team-3-role"),
                        name: "Jeffrey Beers International",
                        body: this.$t("team.team-3")
                    },

                    {
                        role: this.$t("team.team-4-role"),
                        name: this.$t("team.team-4-name"),
                        body: this.$t("team.team-4")
                    },

                    {
                        role: this.$t("team.team-5-role"),
                        name: "CBT Architects",
                        body: this.$t("team.team-5")
                    },

                    {
                        role: this.$t("team.team-6-role"),
                        name: "John Moriarty &amp; Associates",
                        body: this.$t("team.team-6")
                    },

                    {
                        role: this.$t("team.team-7-role"),
                        name: "TCC - The Collaborative Companies",
                        body: this.$t("team.team-7")
                    }
                ]
            };
        }
    };
</script>
