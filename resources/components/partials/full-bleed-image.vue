<template>
    <div
        class="full-bleed-image-component"
        :style="{ backgroundImage: 'url(' + cContent.image + ')', backgroundPosition: cContent.halign + ' ' + cContent.valign }">
    </div>
</template>

<script>
    export default {
        props: {
            cContent: {
                type: Object
            }
        }
    };
</script>
