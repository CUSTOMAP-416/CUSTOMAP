describe('Homepage Test', () => {
  it('passes', () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
    cy.contains("Home").should("exist");
    cy.contains("Sign in").should("exist");
    cy.contains("Sign in").click();
    cy.url().should("include", "/login");
  });
})

describe("Sign up Test", () => {
  it("Sign up Test", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/login");
    cy.contains("Sign Up").should("exist");
    cy.contains("Sign Up").click();

    cy.url().should("include", "/SignUp");
    
  });
  it("Make New Account", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/SignUp");
    cy.url().should("include", "/SignUp");

    cy.get('[data-cy="signup_id"]').should("exist");
    cy.get('[data-cy="signup_id"]').type("testID");
    cy.get('[data-cy="signup_id"]').should("have.value", "testID");

    cy.get('[data-cy="signup_pw"]').should("exist");
    cy.get('[data-cy="signup_pw"]').type("testpassword");
    cy.get('[data-cy="signup_pw"]').should("have.value", "testpassword");

    cy.get('[data-cy="signup_pwv"]').should("exist");
    cy.get('[data-cy="signup_pwv"]').type("testpassword");
    cy.get('[data-cy="signup_pwv"]').should("have.value", "testpassword");

    cy.get('[data-cy="signup_name"]').should("exist");
    cy.get('[data-cy="signup_name"]').type("testName");
    cy.get('[data-cy="signup_name"]').should("have.value", "testName");

    cy.get('[data-cy="signup_email"]').should("exist");
    cy.get('[data-cy="signup_email"]').type("test@gmail.com");
    cy.get('[data-cy="signup_email"]').should("have.value", "test@gmail.com");

    cy.get('[data-cy="signup_phone"]').should("exist");
    cy.get('[data-cy="signup_phone"]').type("12345678");
    cy.get('[data-cy="signup_phone"]').should("have.value", "12345678");
  });
});

describe("Login test", () => {
  it("Log-in Test", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/login");
    cy.url().should("include", "/login");
    cy.wait(1000);
    cy.get('[data-cy="log_email"]').should("exist");
    cy.get('[data-cy="log_email"]').type("test@gmail.com");
    cy.get('[data-cy="log_email"]').should("have.value", "test@gmail.com");

    cy.get('input.log_input[type="password"]').should("exist");
    cy.get('input.log_input[type="password"]').type("testpassword");
    cy.get('input.log_input[type="password"]').should("have.value", "testpassword");
    cy.contains("Log in").should("exist");
    // cy.contains("Log in").click();
    // cy.wait(1000);
    // cy.url().should("include", "/Dashboard");
  });
});
