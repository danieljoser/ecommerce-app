This is an Ecommerce app build using the [Next.js](https://nextjs.org) framework. In this app I implemented authentication using next-auth, to login with email and google. The style of the page was designed with tailwindcss, and all the data needed was saved in a mongodb database, using mongoose to handle the models.

## Idea of the project

At first, I build this project as practice, specifically the authentication part of an user with google and email. At first I had in mind, allowing the user to register using the email, then receiving an email to verify your account and then you can login normally with your email.
This email was send using Resend, however, since I do not have a domain yet, I used Resend as the sender but it can only be sent to the email used to create the Resend account (mine).

After the user is logged in and verified, the session is stored and you can navigate the page normally. All the products are fetched from the database, and you can sort by category, price, reviews, and rating. If you see anything you like you can add it to the cart, and then it's easy to proceed and do the checkout.

## Main advantages/strenghts of the project
* SSR & CSR using next.js
* Type handling using Typescript
* User authentication with next-auth
* Password encryption with bcrypt
* Simple and responsive design using tailwindcss
* Using mongoDB to storage and fetch the product and user data
* Backend integraded in next.js using the route API

## Main disadvantages of the project
* No loading skeleton/page during waiting times
* The register with email part is not functional right now 
* No cache implemented in the page
* The session is not stored in cookies

## Things I would do differently starting again
* Since I basically coded the authentication from scratch, and maybe not following the best resources I think it does not follow the best practices in authentication. If I had to start again I would follow the lucia instruction implementing the authentication in the page
* Not implementing a log in with email until I have a functional email domain/server usable with resend
* Maybe implementing existing components available (i.e. shadcn) to save coding time and adding more style to the page
* Improve the session management, maybe storing the session in a browser cookie

## Little upgrades
* COMMENTING! The code definitely needs more commments to make it easier to follow along
* Some improving in the style and adding lacking elements