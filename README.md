This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Gotchas:

- App only loads using http://0.0.0.0:3000, using "localhost" does not work right now

## Deploy URLS:

POL Admin Interface & API
http://pol-admin-dev.instinct.is/
http://pol-admin-staging.instinct.is/

POL Frontend Interface
https://pol-frontend-dev.instinct.is/
https://pol-frontend-staging.instinct.is/


## Keeping Your Code Updated:

When there are lots of active changes occuring on this repo, make sure to regularly:

1. Commit (or stash) your local changes on your branch
1. `git fetch origin`
1. `git checkout main`
1. `git pull origin main`
1. `git checkout <your_branch>`
1. `git merge main`
1. Fix merge conflicts (if any)
1. `git add .`
1. `git commit -m 'merge in latest main'`

Done!
…now you will be up-to-date with latest code. Do this before you submit your PR, and you can be sure it will be a clean merge.
## Updating a fork:

- `git remote add upstream git@github.com:1instinct/dna-frontend.git`
- `git fetch upstream`
- `git checkout main`
- `git pull upstream main`

TODO:

- Flow / Type Checking
- ~~React~~
- ~~SSR~~ (NextJS)
- State Mgmt (Redux? useContext?)
- Request Mgmt
- Pusher / API Integration
- Styled Components
- Moving Letters
- UI Sounds (proprietary: "npm install beeper")
- Maps
- File upload (ReactDropzone)
- Form validation (Formik / React Final Form / YUP / Blitz inspo)
- Animations / Transitions (ReactSpring, GSAP)
- Gestures
- UI Alerts
- Uptime Monitoring
- Twilio
- Unit Testing
- Chat widget
- Chatbot
- Feature Detection
- Benchmarking
- Header tag injection (Helmet)
- Secrets management
