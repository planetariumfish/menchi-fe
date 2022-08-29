# "Menchi" - Pet Adoption App Front-End

Front-end part of the Full-Stack project for [ITC](https://github.com/israeltechchallenge).  
[Back-End](https://github.com/planetariumfish/menchi-be) also available.

## Technologies

Set up using:

- [Typescript](https://www.typescriptlang.org): v4.7.4
- [React](https://reactjs.org): v18.2.0
- [Axios](https://axios-http.com): v0.27.2
- [Chakra-UI](http://chakra-ui.com): v2.2.6
- [Zod](https://github.com/colinhacks/zod): v3.18.0
- [Tanstack React-Query](https://tanstack.com/query/v4): v4.2.1
- [Tanstack React Table](https://tanstack.com/table/v8): v8.5.11
- [Vite](https://vitejs.dev): v3.0.0
- [Zustand](https://zustand-demo.pmnd.rs): v4.1.1

## Status

Very much _in progress_.

Done:

- Homepage (logged out, and logged in)
- Sign up and Log in modals (fully functional)
- Logout
- User menu
- Search page advanced search form
- User profile page (+ edit functionality, now with extra toast)
- Users can now upload profile photo
- Adopt/Foster/Return pet function

To do:

- Toggle basic and advanced search
- Change height/weight search input to ranges
- Admin dashboard users functionality
- Confirmation dialogues for adopt/foster
- Refetching info for pet status on adopt/foster/return

## Known Issues

Safari blocks 3rd party cookies by default, so now login doesn't work on it if back-end runs on a different port.
