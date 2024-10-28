<template>
    <div>
        <div class="navbar">
            header<div class="logo"></div>
        </div>
        <slot></slot>
        <div>footer</div>
    </div>
</template>
<style lang="scss">
.navbar{
    // height: 100px;
    width: 100vw;
    background-color: #fff;
    .logo{
        // height: 50px;
        width: auto;
    }
}
</style>