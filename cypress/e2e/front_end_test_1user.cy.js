Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

//User Account Test
//----------------------------------------------------
// Homepage, Sign up, Sign out, Login, Profile Test
//----------------------------------------------------

describe('1. Homepage Test', () => {
  beforeEach(() => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
  });

  it("contain elemensts", () => {
    cy.contains("CUSTOMAP").should("exist");
    cy.contains("Home").should("exist");
    cy.contains("SignIn").should("exist");

    cy.contains("Welcome to CUSTOMAP").scrollIntoView();
    cy.contains("Welcome to CUSTOMAP").should("exist");
  });

  it("login page test", () => {
    cy.contains("Home").should("exist");
    cy.contains("SignIn").should("exist");
    cy.contains("SignIn").click();
    cy.url().should("include", "/login");
  });
})

describe("2. Sign-up page Test", () => {
  beforeEach(() => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
    cy.contains("SignIn").click();
    cy.url().should("include", "/login");
    cy.wait(1000);
  });
  
  it("Sign up Test", () => {
    cy.contains("Sign Up").should("exist");
    cy.contains("Sign Up").click();

    cy.url().should("include", "/SignUp");
    cy.contains("Make New Account").should("exist");

  });

  it("before signup, checking user", () => {
    
    cy.get('[data-cy="log_email"]').should("exist");
    cy.get('[data-cy="log_email"]').type("test@gmail.com");
    cy.get('[data-cy="log_email"]').should("have.value", "test@gmail.com");

    cy.get('input.log_input[type="password"]').should("exist");
    cy.get('input.log_input[type="password"]').type("testpassword");
    cy.get('input.log_input[type="password"]').should(
      "have.value",
      "testpassword"
    );
    cy.contains("Log in").should("exist");
    cy.contains("Log in").click();
    cy.wait(1000);
    cy.url().then((url) => {
      if (url.includes("/Dashboard")) {

        cy.contains("Hello testName").should("exist");
        cy.contains("SignOut").should("exist");
        cy.contains("SignOut").click();
        //user already exist.
      } else {
        cy.url().should("include", "/login");
        cy.wait(500);
        cy.contains("SignIn").click();
        
        cy.get('[data-cy="log_email"]').clear().type("test@gmail.com");
        cy.get('input.log_input[type="password"]').clear().type("changepassword");

        cy.contains("Log in").click();
        cy.wait(1000);
        //another password check
        cy.url().then((url) => {
          if (url.includes("/Dashboard")) {
            cy.contains("Hello testName").should("exist");
            cy.contains("SignOut").should("exist");
            cy.contains("SignOut").click();
            cy.contains("SignIn").click();
            cy.url().should("include", "/login");

            cy.get('[data-cy="log_email"]').type("0");
            cy.get('input.log_input[type="password"]').type("00000000");

            cy.contains("Log in").click();
            cy.wait(500);
            //if another password work, user delete and re-make it.
            cy.get("body").then(($body) => {
              if ($body.find(':contains("testName")').length) {
                cy.log("testName exists on the page");
                cy.contains(".user-item", "testName")
                  .closest(".user-item")
                  .find(".delete")
                  .click();
              } else {
                cy.log("testName does not exist on the page");
                cy.log("Some problem occurs in DB");
              }
            });
          } else {
            cy.url().should("include", "/login");
            cy.contains("Sign Up").click();
            cy.url().should("include", "/SignUp");

            cy.get('[data-cy="signup_id"]').should("exist");
            cy.get('[data-cy="signup_id"]').type("testID");
            cy.get('[data-cy="signup_id"]').should("have.value", "testID");

            cy.get('[data-cy="signup_pw"]').should("exist");
            cy.get('[data-cy="signup_pw"]').type("testpassword");
            cy.get('[data-cy="signup_pw"]').should(
              "have.value",
              "testpassword"
            );

            cy.get('[data-cy="signup_pwv"]').should("exist");
            cy.get('[data-cy="signup_pwv"]').type("testpassword");
            cy.get('[data-cy="signup_pwv"]').should(
              "have.value",
              "testpassword"
            );

            cy.get('[data-cy="signup_name"]').should("exist");
            cy.get('[data-cy="signup_name"]').type("testName");
            cy.get('[data-cy="signup_name"]').should("have.value", "testName");

            cy.get('[data-cy="signup_email"]').should("exist");
            cy.get('[data-cy="signup_email"]').type("test@gmail.com");
            cy.get('[data-cy="signup_email"]').should(
              "have.value",
              "test@gmail.com"
            );

            cy.get('[data-cy="signup_phone"]').should("exist");
            cy.get('[data-cy="signup_phone"]').type("12345678");
            cy.get('[data-cy="signup_phone"]').should("have.value", "12345678");

            cy.contains("Create Account").should("exist");
            cy.contains("Create Account").click();

            cy.wait(1000);

            cy.url().should("include", "/Dashboard");
            cy.contains("Hello testName").should("exist");
          }
        });


      }
    });
  });
  

  });

 describe("3. Sign-up error message test", () => {
  beforeEach(() => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
    cy.contains("SignIn").click();
    cy.url().should("include", "/login");
    cy.wait(500);
    cy.contains("Sign Up").click();
    cy.wait(500);
    cy.url().should("include", "/SignUp");

  });

   it("email error test", () => {

     cy.get('[data-cy="signup_id"]').type("testID");

     cy.get('[data-cy="signup_pw"]').type("testpassword");

     cy.get('[data-cy="signup_pwv"]').type("testpassword");

     cy.get('[data-cy="signup_name"]').type("testName");

     cy.get('[data-cy="signup_email"]').type("0");

     cy.get('[data-cy="signup_phone"]').type("12345678");

     cy.contains("Create Account").should("exist");
     cy.contains("Create Account").click();

     cy.wait(1000);
     cy.contains("An account with this email address already exists").should(
       "exist"
     );
   });
   it("password error test", () => {

     cy.get('[data-cy="signup_id"]').type("testID");

     cy.get('[data-cy="signup_pw"]').type("1");

     cy.get('[data-cy="signup_pwv"]').type("1");

     cy.get('[data-cy="signup_name"]').type("testName");

     cy.get('[data-cy="signup_email"]').type("test@gmail.com");

     cy.get('[data-cy="signup_phone"]').type("12345678");

     cy.contains("Create Account").should("exist");
     cy.contains("Create Account").click();

     cy.wait(1000);
     cy.contains("Please enter a password of at least 8 characters").should(
       "exist"
     );
   });
   it("phone number error test", () => {

     cy.get('[data-cy="signup_id"]').type("testID");

     cy.get('[data-cy="signup_pw"]').type("testpassword");

     cy.get('[data-cy="signup_pwv"]').type("testpassword");

     cy.get('[data-cy="signup_name"]').type("testName");

     cy.get('[data-cy="signup_email"]').type("test2@gmail.com");

     cy.get('[data-cy="signup_phone"]').type("a");

     cy.contains("Create Account").should("exist");
     cy.contains("Create Account").click();

     cy.wait(1000);
     cy.contains("Phone number contains non-numeric characters.").should(
       "exist"
     );
   });
 });

 
describe("4. Forget Password page input and errormessage test", () => {
  it("Forget Password page", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
    cy.contains("SignIn").click();
    cy.url().should("include", "/login");
    cy.wait(500);

    cy.contains("Forgot Password?").should("exist");
    cy.contains("Forgot Password?").click();
    cy.wait(1000);
    cy.url().should("include", "/ForgetPassword");

    cy.contains("Verification").should("exist");
    cy.contains("Verification").click();
    cy.contains("Please enter all required fields.").should("exist");
    cy.wait(1000);

    cy.get('[data-cy="forget_name"]').should("exist");
    cy.get('[data-cy="forget_name"]').type("testName");
    cy.get('[data-cy="forget_name"]').should("have.value", "testName");

    cy.get('[data-cy="forget_email"]').should("exist");
    cy.get('[data-cy="forget_email"]').type("test@gmail.com");
    cy.get('[data-cy="forget_email"]').should("have.value", "test@gmail.com");

    cy.get('[data-cy="forget_phone"]').should("exist");
    cy.get('[data-cy="forget_phone"]').type("12345678");
    cy.get('[data-cy="forget_phone"]').should("have.value", "12345678");

    cy.contains("Verification").should("exist");
    cy.contains("Verification").click();
    cy.wait(1000);

    cy.contains("New Password").should("exist");

   cy.get('[data-cy="forget_newpwd"]').should("exist");
   cy.get('[data-cy="forget_newpwd"]').type("changepassword");
   cy.get('[data-cy="forget_newpwd"]').should("have.value", "changepassword");

   cy.get('[data-cy="forget_newagain"]').should("exist");
   cy.get('[data-cy="forget_newagain"]').type("changepassword");
   cy.get('[data-cy="forget_newagain"]').should(
     "have.value",
     "changepassword"
   );
   cy.contains("Change Password").should("exist");
   cy.contains("Change Password").click();
   cy.wait(500);
  });
 });


describe("5. Login error message test", () => {
  beforeEach(() => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
    cy.contains("SignIn").click();
    cy.url().should("include", "/login");
    cy.wait(500);
  });

  it("Log-in Test with empty text box", () => {

    cy.get('[data-cy="log_email"]').should("exist");

    cy.get('input.log_input[type="password"]').should("exist");

    cy.contains("Log in").should("exist");
    cy.contains("Log in").click();

    cy.wait(1000);

    cy.contains("Please enter all required fields").should("exist");
  });

  it("Log-in Test with wrong password", () => {

    cy.get('[data-cy="log_email"]').should("exist");
    cy.get('[data-cy="log_email"]').type("test@gmail.com");
    cy.get('[data-cy="log_email"]').should("have.value", "test@gmail.com");

    cy.get('input.log_input[type="password"]').should("exist");
    cy.get('input.log_input[type="password"]').type("1");
    cy.get('input.log_input[type="password"]').should(
      "have.value",
      "1"
    );
    cy.contains("Log in").should("exist");
    cy.contains("Log in").click();

    cy.wait(1000);

    cy.contains("Wrong email or password provided").should("exist");
  });
});

describe("6. Login test", () => {
  it("Log-in success Test", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
    cy.contains("SignIn").click();
    cy.url().should("include", "/login");
    cy.wait(500);

    cy.get('[data-cy="log_email"]').should("exist");
    cy.get('[data-cy="log_email"]').type("test@gmail.com");
    cy.get('[data-cy="log_email"]').should("have.value", "test@gmail.com");

    cy.get('input.log_input[type="password"]').should("exist");
    cy.get('input.log_input[type="password"]').type("changepassword");
    cy.get('input.log_input[type="password"]').should(
      "have.value",
      "changepassword"
    );
    cy.contains("Log in").should("exist");
    cy.contains("Log in").click();
    cy.wait(1000);
    cy.url().should("include", "/Dashboard");
    cy.contains("Hello testName").should("exist");
  });
});


describe("7. Log out test", () => {
  it("Log out success Test", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
    cy.contains("SignIn").click();
    cy.url().should("include", "/login");
    cy.wait(500);

    cy.get('[data-cy="log_email"]').type("test@gmail.com");

    cy.get('input.log_input[type="password"]').type("changepassword");

    cy.contains("Log in").should("exist");
    cy.contains("Log in").click();
    cy.wait(1000);
    cy.url().should("include", "/Dashboard");
    cy.contains("Hello testName").should("exist");

    cy.contains("SignOut").should("exist");
    cy.contains("SignOut").click();

    cy.contains("SignIn").should("exist");
    cy.contains("Explore and Customize Your Own Map").should("exist");


  });
});


describe("7. My Profile test", () => {
  beforeEach(() => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
    cy.contains("SignIn").click();
    cy.url().should("include", "/login");
    cy.wait(500);
  });
  it("Profile change Test", () => {

    cy.get('[data-cy="log_email"]').type("test@gmail.com");
    cy.get('input.log_input[type="password"]').type("changepassword");
    cy.contains("Log in").click();
    cy.url().should("include", "/Dashboard");
    cy.wait(1000);

    cy.contains("My Profile").should("exist");
    cy.contains("My Profile").click();
    cy.contains("My Profile").should("exist");

    cy.get(".profile_input").eq(3).clear().type("testpassword");
    cy.get(".profile_input").eq(4).clear().type("testpassword");

    cy.contains("Change Information").should("exist");
    cy.contains("Change Information").click();
  });
  
  it("Test successful profile change with login", () => {

    cy.wait(1000);
    cy.get('[data-cy="log_email"]').type("test@gmail.com");
    cy.get('[data-cy="log_email"]').should("have.value", "test@gmail.com");

    cy.get('input.log_input[type="password"]').type("testpassword");
    cy.get('input.log_input[type="password"]').should(
      "have.value",
      "testpassword"
    );
    cy.contains("Log in").should("exist");
    cy.contains("Log in").click();
    cy.wait(1000);
    cy.url().should("include", "/Dashboard");
    cy.contains("Hello testName").should("exist");
  });
 });