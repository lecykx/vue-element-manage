<template>
    <div class="pan-item" :style="{zIndex:zIndex,height:height,width:width}">
        <div class="pan-info">
            <slot></slot>
        </div>
        <img class="pan-thumb" :src="image">
    </div>
</template>

<script>
    export default {
        name: 'PanThumb',
        props: {
            image: {
                type: String,
                required: true
            },
            zIndex: {
                type: Number,
                default: 100
            },
            width: {
                type: String,
                default: '55px'
            },
            height: {
                type: String,
                default: '55px'
            }
        }
    }
</script>

<style scoped>
    .pan-item {
        border-radius: 50%;
        display: inline-block;
        position: relative;
    }

    .pan-thumb {
        width: 100%;
        height: 100%;
        background-size: 100%;
        border-radius: 50%;
        overflow: hidden;
        position: absolute;
        transform-origin: 0 80%;
        transition: all 0.3s ease-in-out;
        background: #606e87;
    }

    .pan-thumb:after {
        content: '';
        width: 8px;
        height: 8px;
        position: absolute;
        border-radius: 50%;
        top: 40%;
        left: 95%;
        margin: -4px 0 0 -4px;
        background: radial-gradient(ellipse at center, rgba(14, 14, 14, 1) 0%, rgba(125, 126, 125, 1) 100%);
        box-shadow: 0 0 1px rgba(255, 255, 255, 0.9);
    }

    .pan-info {
        position: absolute;
        width: inherit;
        height: inherit;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: inset 0 0 0 5px #606e87;
    }

    .pan-item:hover .pan-thumb {
        transform: rotate(85deg);
    }
</style>
