![Banner](https://assets.solidjs.com/banner?type=Linkr&project=Built%20with%20Create%20JD%20App)

<div style="text-align:center">
<a href="#">🚀 Short Link</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="#-getting-started">🤝 Contribute</a>
<span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
<a href="https://github.com/Jcanotorr06">🤖 Github</a>
</div>

![GitHub stars](https://img.shields.io/github/stars/Jcanotorr06/linkr?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/Jcanotorr06/linkr?style=for-the-badge)
![GitHub license](https://img.shields.io/github/license/Jcanotorr06/linkr?style=for-the-badge)

</div>

## 🤔 What is Create JD App?

[**Create JD App**](https://github.com/OrJDev/create-jd-app) is the quickest and most efficient way to start a new fullstack Solid web app, inspired by the [**T3 Stack**](https://create.t3.gg/), which is a web development stack made by [Theo](https://twitter.com/t3dotgg) focused on simplicity, modularity, and full-stack **typesafety**. This project is using:

- ✅ **Bootstrapping**: [create-jd-app](https://github.com/OrJDev/create-jd-app).
- ✅ **Framework**: [Solid Start + Typescript](https://start.solid.com/).
- ✅ **Auth**: [Auth.js](https://authjs.dev/)
- ✅ **ORM**: [Prisma](https://prisma.io).
- ✅ **Database**: [Planetscale](https://planetscale.com/).
- ✅ **Styling**: [TailwindCSS](https://tailwindcss.com) + [DaisyUI](https://daisyui.com) + [KobalteUI](https://kobalte.dev).
- ✅ **Typescript Schema Validation**: [Zod](https://github.com/colinhacks/zod).
- ✅ **End-to-end typesafe API**: [tRPC](https://trpc.io/).
- ✅ **Safely serialize JavaScript expressions**: [Superjson](https://github.com/blitz-js/superjson).

## 📦 Project structure

```
- prisma
- public
- src
  |- components
  |- env
  |- layout
  |- routes
  |- schema
  |- server
  |- styles
  |- utils
```

## 👨‍🚀 Getting Started

> 🚧 You will need [Nodejs +16 (LTS recommended)](https://nodejs.org/en/) installed.

1. Fork this project:

- [Click here](https://github.com/Jcanotorr06/linkr/fork).

2. Clone the repository:

```bash
git clone git@github.com:YOU_USER/slug.git
```

3. Install dependencies:

```bash
npm install
# or
pnpm install
# or
yarn install
# or
ultra install
```

4. Create a **.env** file with the following content:

> 🚧 The environment variables must match the following [schema](https://github.com/Jcanotorr06/linkr/blob/main/src/env/schema.mjs#L8).

```bash
# Planetscale DB URL:
DATABASE_URL:

# Github OAuth secrets:
GITHUB_ID:
GITHUB_CLIENT_SECRET:

# Auth.js config:
AUTH_SECRET
AUTH_URL
AUTH_TRUST_HOST=true
```

### 🔑 How to get environment variables:

**Planetscale database:**
- [Create a new database](https://planetscale.com/docs/tutorials/planetscale-quick-start-guide#getting-started-planet-scale-dashboard).
- [Create a dev branch](https://planetscale.com/docs/onboarding/branching-and-deploy-requests#create-a-dev-branch).
- [In the dev branch, click on "Connect" and select "Prisma". Now you have the DATABASE_URL](https://planetscale.com/docs/concepts/connection-strings#creating-a-password).

> 🚧 The environment variable in the dev branch is not the same as main. When you deploy your app to production, in the environment variables change DATABASE_URL to the main variable.

**Github OAuth:**
- [Click here to create new Github OAuth app](https://github.com/settings/applications/new).
- Go to "Client secrets" and generate new client secret and and paste it into GITHUB_CLIENT_SECRET env.
- Copy the Client ID and paste it into GITHUB_ID env.

**Next Auth:**
- AUTH_SECRET: ``mykey123`` for example.
- AUTH_URL: ``http://localhost:3000/``.

5. Ready 🥳, now run:

```bash
# Push your DB to Planetscale:
npx prisma db push

# Run the project:
npm run dev

# (Optional) Run Prisma Studio to see your DB data:
npx prisma studio
```

😊 Contributing:

<a href="https://github.com/Jcanotorr06/linkr/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Jcanotorr06/linkr" />
</a>

<p></p>

## 🎉 Deploy on Vercel

- ✅ [https://linkr.josephcano.com/](https://linkr.josephcano.com/).

## 🔑 License

- [MIT](https://github.com/Jcanotorr06/linkr/blob/main/LICENSE).
