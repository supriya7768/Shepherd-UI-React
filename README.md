After cloning---> npm install---->npm start


Sheferd-material-react
..
├── package.json           -> Package json file.
├── public
├── README.md
├── src
│   ├── _mockApis          -> Mock Json data to be used for working apps
│   ├── assets
│   │   ├── images
│   │   ├── scss           -> Template SCSS files
│   │       ├── style.scss -> Application main file
│   │       ├── _themes-vars.module.scss
│   ├── contexts           -> State context for Login management
│   ├── hooks              -> Custom hooks
│   ├── layout
│   │   ├── Customization 
│   │   ├── MainLayout     -> Layout for main components & routers
│   │   ├── MinimalLayout  -> Layout for mimimal components & routers
│   │   ├── NavigationScroll.js
│   │   ├── NavMotion.js
│   ├── menu-items         -> menu items
        ├──dashboard
        ├──invoice
        ├──lead
        ├──pages
        ├──other
        ├──style
        ├──utilities
│   ├── routes             -> different route based on layouts
│   ├── store              -> Redux actions, reducers
│   │   ├── slices         -> different slices of toolkit
│   ├── themes             -> Contains application style and theme
│   ├── types              -> common types for Typescript. Exist only in Typescript
│   ├── ui-component       -> Template custom & reusable components
│   ├── utils
│   │   ├── locales        -> different locale json files
│   │   ├── route-guard    -> Auth guard to prevent unexpected navigations
│   ├── views
        ├──dashboard
        ├──invoice
        ├──lead
        ├──pages
        ├──sample-page
        ├──style
        ├──utilities
│   ├── App.js             -> starting point of application
│   ├── config.js          -> Template constant value and live customization
│   └── index.js           -> Application root js file
├── .env                   -> Store configuration settings and environment variables
├── eslint.rc              -> To configure ESLint rules 
├── .prettiertc            -> To Code formatting style rules
├── vite-env.d.ts
├── yarn.lock              -> File generated by yarn
