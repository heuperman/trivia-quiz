<script setup>
import { useRouter } from 'vue-router'
import { useQuestionsStore } from '@/stores/questions'
import { htmlDecode, shuffleArray } from '@/lib/helpers'
import ButtonDefault from '@/components/ButtonDefault.vue';

const router = useRouter()
const questionsStore = useQuestionsStore()

if (!questionsStore.getCurrentQuestion?.question) {
    router.push('/')
}

function getAnswers(question) {
    return question.type === 'boolean'
        ? ['True', 'False']
        : shuffleArray([question.correct_answer, ...question.incorrect_answers])
}

function handleAnswerClick(answer) {
    if (answer === questionsStore.getCurrentQuestion.correct_answer) {
        questionsStore.incrementScore()
    }

    if (questionsStore.currentQuestionIndex >= 9) {
        router.push('/result')
    } else {
        questionsStore.incrementQuestionIndex()
    }
}
</script>

<template>
    <main v-if="questionsStore.getCurrentQuestion?.question">
        <h1>Question {{ questionsStore.currentQuestionIndex + 1 }} of 10</h1>
        <p>{{ htmlDecode(questionsStore.getCurrentQuestion.question) }}</p>
        <ul>
            <li :key="answer" v-for="answer in getAnswers(questionsStore.getCurrentQuestion)">
                <ButtonDefault :text="htmlDecode(answer)" @click="handleAnswerClick(answer)" wide="true" />
            </li>
        </ul>
    </main>
</template>

<style lang="css" module>
main {
    min-height: calc(100vh - 4rem);
    width: 100%;
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
    text-wrap: pretty;
    max-width: 560px;
}

ul {
    list-style-type: none;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    width: 100%;
    max-width: 960px;
}

@media (min-width: 1024px) {
    ul {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
