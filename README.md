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

- The app has a "Maintenance Mode" (branded fullscreen takeover), simply set `IS_MAINT_MODE=true`, and the `<Header/>` will disappear and `<Home/>` gets taken over by `<ComingSoon/>`. It's fun, try it!

## Deploy URLS:

POL Admin Interface & API
http://pol-admin-dev.instinct.is/
http://pol-admin-staging.instinct.is/

POL Frontend Interface
https://pol-frontend-dev.instinct.is/
https://pol-frontend-staging.instinct.is/

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
