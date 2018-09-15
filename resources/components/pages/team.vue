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
                        body: "Echelon Life represents the evolution of a new development philosophy that pairs extraordinary design with incomparable lifestyle amenities. Cottonwood Management, headquartered in Los Angeles, with over $2 Billion in assets under management, chose Boston as its East Coast headquarters and inaugural Echelon Life city, in recognition and reflection of the energy, academic spirit and innovative drive that permeate the city and make Boston’s urban life so appealing."
                    },

                    {
                        role: "Architect",
                        name: "Kohn Pedersen Fox",
                        body: "Kohn Pedersen Fox brings unsurpassed architectural excellence to the Seaport. Based in New York City, London, Hong Kong & Shanghai, KPF is architect to some of the most influential projects in cities around the world. The firm is known for its elegant designs and expertly crafted buildings. KPF’s signature multi-use developments are gateways to centers of commerce and innovation and include Covent Garden in London, Hudson Yards New York, Tokyo’s Rappongi Hills, Shanghai World Financial Center, Hong Kong’s International Commerce Center, and now EchelonSeaport in Boston."
                    },

                    {
                        role: "Amenities Interiors",
                        name: "Jeffrey Beers International",
                        body: "Widely known for its hospitality expertise and acclaimed for its expertly tailored designs, Jeffery Beers International (JBI) of New York City has chosen EchelonSeaport as its inaugural residential project in Boston. EchelonSeaport amenities areas both inside and out speak as a beautifully cohesive whole under JBI’s masterful eye. JBI is currently designing residential amenities for Rafael Vinoly’s 277 Fifth Avenue project in New York. Iconic JBI hospitality projects include Fontainebleau in Miami and Dune by chef Jean George at the One & Only Club in the Bahamas."
                    },

                    {
                        role: "Service Standards",
                        name: "Regent Hotels &amp; Resorts",
                        body: "Regent Hotels & Resorts, known the world over for award-winning, white gloved five-star service, has teamed with Cottonwood to bring its expertise to Boston for EchelonSeaport, its first Regent Collection property in the United States. Regent will bring a sense of style and attention to service detail second to none to EchelonSeaport."
                    },

                    {
                        role: "Residence Architect",
                        name: "CBT Architects",
                        body: "CBT Architects know Boston intimately and has teamed with KPF to bring EchelonSeaport to life in Boston. The award-winning architect has designed many of the finest residential projects in the City, including the Mandarin Oriental Condominiums, Twenty-Two Liberty and Millennium Ritz Carlton Boston."
                    },

                    {
                        role: "Builder",
                        name: "John Moriarty &amp; Associates",
                        body: "Boston's leading builder in the Seaport District, John Moriarty & Associates is at the helm for EchelonSeaport. Renowned for their quality of delivered product, JMA has built over 20,000 luxury condominiums on the East Coast. Boston-based and privately owned, JMA thrives and succeeds building urban projects for trusted repeat clients and partners."
                    },

                    {
                        role: "Sales &amp; Marketing",
                        name: "TCC - The Collaborative Companies",
                        body: "Boston-based TCC has been the market leader in dedicated project condominium sales in and around the city, successfully closing over $6 billion in urban and suburban real estate sales over the past three decades. TCC's well-renowned sales team at EchelonSeaport has helped shape an unprecedented Sales & Experience Center for residents to explore all facets of Echelon Life."
                    }
                ]
            };
        }
    };
</script>
