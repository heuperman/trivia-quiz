<script setup>
import { useRouter } from 'vue-router'
import { useQuestionsStore } from '@/stores/questions'
import ButtonDefault from '@/components/ButtonDefault.vue';

const router = useRouter()
const questionsStore = useQuestionsStore()
</script>

<template>
    <main>
        <h1>Result</h1>
        <p>Your score: <span :class="{
            [$style.good]: questionsStore.score >= 8,
            [$style.average]: questionsStore.score >= 5,
            [$style.bad]: questionsStore.score < 5
        }">{{
            questionsStore.score * 10 }}</span> / 100</p>
        <ButtonDefault text="Play again" @click="router.push('/')" />
    </main>
</template>

<style lang="css" module>
main {
    min-height: calc(100vh - 4rem);
    display: flex;
    gap: 4rem;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

h1 {
    font-size: 1.4rem;
    color: var(--color-text-grey);
}

p {
    font-size: 2rem;
    text-align: center;
    color: var(--color-black);
    max-width: 560px;
}

.bad {
    color: var(--color-red);
}

.average {
    color: var(--color-orange);
}

.good {
    color: var(--color-green);
}
</style>