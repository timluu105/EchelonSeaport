<template>
    <div class="inset-image-component">
        <div
            class="inset-image-component-inner"
            :style="{ backgroundImage: 'url(' + cContent.image + ')', backgroundPosition: cContent.halign + ' ' + cContent.valign }">
        </div>
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
