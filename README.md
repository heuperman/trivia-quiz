# Quiz Master

Are you the king of the quiz? Prove your deep knowledge of useless facts at: https://quiz-master-beta.vercel.app/

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Notes

_These notes serve to explain my process and considerations during development._

### Plan

After reading the instructions, this is my plan for approaching this challenge:

1. Rewrite the instructions in my own words to make sure I fully understand the requirements.
2. Explore the OpenTrivia API and find out how I can get the data I need.
3. Create designs for the views. Two views are mentioned, but we might want a third view for the outcome of the quiz.
4. Write the basic app logic using the Test Driven Development approach to ensure the logic is tested and avoid redundancy.
5. Implement the designs from step 3.
6. Consider adding a twist, perhaps a leader board or a timer.
7. Submit my work.

### OpenTrivia API

We will need to request a session token for each new quiz. We can then use that token to fetch a specified amount of questions and answers in JSON format. We can get questions of a specific difficulty using a query parameter.

By default it will return a mix of categories and types of questions which is what we want for now, but this can also be controlled with a query parameter. The default encoding uses HTML Codes which is what we need.

There is also a response code included in the request, which we can use for error handling if needed.

### Designs

| View 1 and 2                                                   | View 3                                                   |
| -------------------------------------------------------------- | -------------------------------------------------------- |
| ![Sketches for view 1 and 2](/images/sketches-1.jpeg?raw=true) | ![Sketches for view 3](/images/sketches-2.jpeg?raw=true) |

To work out the layout for the app, I made some sketches on paper. The designs cover mobile layout as that is often the most common way users will see your site these days. With the limited amount of data we need to display in each view, the desktop layout can be very similar, just a little wider.

Desktop and tablet layouts could be made and the sketches could be turned into more detailed designs using something like Figma, but I think this will be sufficient for this simple app.

We can already determine from these sketches that we can create a reusable button component with a primary and secondary colour scheme, as well as a button group that can hold two or three buttons.

For the palette I'll be using some nice colours I found online 😉 The fonts will come from Google Fonts. For the title we've got Acme, a cartoony font, and for the main text we'll have Lato, a simple rounded font. These fonts match the fun & playful nature of the app.

### Logic

The logic of the app is relatively simple. I tried to keep it as clear as possible and avoid unnecessary complexity, for example by keeping all the shared state in a single store, and using a function to get the question answers instead of trying to keep component values up to date by destructuring the store into refs (which had unexpected effects on getters). You can find more notes on the decisions I made in the commit messages.

The most complicated and time-consuming task for someone relatively unfamiliar with the Vue ecosystem such as myself was handling state, routing and mocking in the tests. Fortunately, all the tools are well-documented, especially Pinia which has some very useful testing examples.

### Further development

We have a functional quiz now, with basic mobile and desktop styling. You can play it at https://quiz-master-beta.vercel.app/.

There is, of course, a lot left undone. We could use some error handling, both for when requests to the API fail completely, or when the API returns an error code. For example, the user could run out of questions for their session, which we could handle by requesting a new session token and retrying the original request with the new token.

We could use some tests on the button component and on the questions store. I didn't write any tests for the store as the logic of the functions is very simple, but having a test suite could give confidence for others to work on it.

There are all sorts of features to add such as a timer, leader board, question amount and/or category selectors. If we really want to go all out we could make it two player, where whoever clicks the right answer the fastest gets the points. If we do make it competitive we will need to deal with the fact the user can see all the questions and correct answers being returned by the API. We could create a small server that functions as an in-between and only reveals the questions to the user, not the correct answer.

Styling wise we could use some more flavour text and general decoration to make it feel more like a game show. We could show the user how many or which answers they have answered correctly and show them the correct answer when they get it wrong. We could also use some loading states, which could simply be a spinner on the start button or and entire loading screen with some text and images to get the user excited for the quiz.

## Original Instructions

### Introduction

The purpose of this assignment is for the developer to exhibit their familiarity with front-end technologies, programming patterns and to provide a sample of what clean and reusable code means.

You should spend between 4 and 6 hours on this, depending on your familiarity with Vue.

### How to succeed

- Fellow engineers will be reading and reviewing your code - try to imagine how you would want to review someone else's code. What would you like to see?
- Perfect is the enemy of done! We're looking to assess your technical capabilities, not what type of app you would build if you would have unlimited time available. As a business we're always balancing time and quality. When making trade-offs to optimize for time - be explicit!
- Write code in your own way - you should be able to explain your reasoning later on. It's good to look at best practices, but make sure you understand _why_ they're best practices to begin with.

### Technical requirements

The only technical requirement we have is that you use Vue and CSS-Modules.

### Assignment

Your goal is to create an application that uses the [OpenTrivia API](https://opentdb.com/api_config.php). Feel free to configure the parameters however you want.

The app should adhere to the following requirements:

- I should be able to select a difficulty when starting a new quiz. The app should have at least three difficulty levels.
- The app should have two views: one to select the difficulty, and another one the questions that I need to answer, one question at a time.
- While participating in a quiz, I should be able to see how many questions are left and which question I’m currently answering.
- Every time I start a new quiz, I should get new random questions.
- Questions should be a mix of true/false and multiple choice.

### Others

- Prioritise quality over quantity.
- Unit testing the application is mandatory, for real.
- At Homerun, we value good design. Of course we’re looking for a developer and not a designer - but be mindful of what type of UX you're creating.
- Feel free to add your own twist to the game - but make sure that you satisfy the requirements written above!

Feel free to arrange the scaffolding of the application the way you want: the current one is the default template from `create-vue`
