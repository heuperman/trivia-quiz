<script setup>
defineProps(['text', 'wide'])
</script>

<template>
    <button @click="onClick" :class="{ [$style.button]: true, [$style.wide]: wide }">
        {{ text }}
    </button>
</template>

<style lang="css" module>
button {
    padding: 1rem 2rem;
    min-width: 240px;
    width: 100%;
    font-size: 1.2rem;
    border: none;
    color: var(--color-white);
    background-color: var(--color-blue);
    border-radius: 30px;
    font-weight: 400;
    cursor: pointer;
}

button:hover {
    background-color: var(--color-dark-blue);
}

@media (min-width: 768px) {
    button {
        width: fit-content;
    }
}

@media (min-width: 768px) {
    .wide {
        width: 100%;
    }
}
</style>