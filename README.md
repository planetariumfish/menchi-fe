# "Menchi" - Pet Adoption App Front-End

Front-end part of the Full-Stack project for [ITC](https://github.com/israeltechchallenge).  
[Back-End](https://github.com/planetariumfish/menchi-be) also available.

## Technologies

Set up using:

- Typescript: v4.7.4
- React: v18.2.0
- Axios: v0.27.2
- [Chakra-UI](http://chakra-ui.com): v2.2.6
- [Zod](https://github.com/colinhacks/zod): v3.18.0
- [Tanstack React-Query](https://tanstack.com/query/v4): v4.2.1
- [Vite](https://vitejs.dev): v3.0.0

## Status

Very much _in progress_.

Done:

- Homepage (logged out, and logged in)
- Sign up and Log in modals (fully functional)
- Logout
- User menu
- Search page advanced search form

To do:

- Toggle basic and advanced search
- Pet list and pet card components
- User profile page (+ edit functionality)
- Admin dashboard

## Known Issues

Non-show-stopping bugs:

- Context does not immediately load user info on login/signup. (React-query kicks in late?)
