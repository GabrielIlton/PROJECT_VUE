<template>
    <div>
        <div style="display: flex; width: 50%">
            <h1>{{text}}</h1>
            <div class="comeBack">
                <slot></slot>
                <button v-show="btnComeBack" class="btn btnReturn" @click="comeBack()">Voltar</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            text: String,
            btnComeBack: Boolean
        },
        methods: {
            comeBack() {
                this.$router.back()
            }
        }
    }       
</script>

<style scoped>
    .comeBack {
        width: 50%;
        position: absolute;
        margin-top: 15px;
    }
    .btnReturn {
        float: right;
        background-color: rgb(199, 199, 199);
    }
</style>