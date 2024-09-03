<script setup>
import { useRouter } from 'vue-router'
import { useQuestionsStore } from '@/stores/questions'
import { htmlDecode, shuffleArray } from '@/lib/helpers'

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
                <button @click="handleAnswerClick(answer)">{{ htmlDecode(answer) }}</button>
            </li>
        </ul>
    </main>
</template>

<style lang="css" module scoped>
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
    color: #8a7878;
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

@media (min-width: 1024px) {
    ul {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
