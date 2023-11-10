//<reference types="cypress" />;

context("front_end", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  // Cypress.on("uncaught:exception", (err, runnable) => {
  //   return false;
  // });
  describe("Login test", () => {
    it("Log-in Test", () => {
      cy.viewport(1200, 800);
      cy.contains("Sign in").click();
      cy.url().should("include", "/login");
    });
  });
});

// describe("front_end2", () => {
//   beforeEach(() => {
//     // Replace with the correct URL of your login page
//     cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/login/");
//   });

//   it("Log-in Test", () => {
//     // Type in the email address
//     cy.get("#logemail")
//       .type("user@example.com")
//       .should("have.value", "user@example.com");

//     // Type in the password
//     cy.get(".log_passw")
//       .type("password123")
//       .should("have.value", "password123");

//     // Click the log in link or button
//     // If Log in is a button inside a form, you might need to use cy.get('button').click() instead
//     cy.contains("Log in").click();

//     // Log success message to Cypress command log
//     cy.log("login success!");
//   });
// });
