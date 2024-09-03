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
        <h1 :class="$style.question_progress">Question {{ questionsStore.currentQuestionIndex + 1 }} of 10</h1>
        <p :class="$style.question">{{ htmlDecode(questionsStore.getCurrentQuestion.question) }}</p>
        <ul :class="$style.answer_list">
            <li :key="answer" v-for="answer in getAnswers(questionsStore.getCurrentQuestion)">
                <ButtonDefault :text="htmlDecode(answer)" @click="handleAnswerClick(answer)" wide="true" />
            </li>
        </ul>
    </main>
</template>

<style lang="css" module>
.question_progress {
    font-size: 1.4rem;
    color: var(--color-text-grey);
}

.question {
    font-size: 2rem;
    text-align: center;
    color: var(--color-black);
    text-wrap: pretty;
    max-width: 560px;
}

.answer_list {
    list-style-type: none;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    width: 100%;
    max-width: 960px;
}

@media (min-width: 1024px) {
    .answer_list {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
