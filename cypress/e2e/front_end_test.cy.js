describe('1. Homepage Test', () => {
  it('passes', () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
    cy.contains("Home").should("exist");
    cy.contains("Sign in").should("exist");
    cy.contains("Sign in").click();
    cy.url().should("include", "/login");
  });
})

describe("2. Sign up Test", () => {
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

describe("3. Forget Password page input and errormessage test", () => {
  it("Forget Password page", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/login");
    cy.url().should("include", "/login");
    cy.wait(1000);

    cy.contains("Forgot Password?").should("exist");
    cy.contains("Forgot Password?").click();
    cy.wait(1000);
    cy.url().should("include", "/ForgetPassword");

    cy.contains("Verification").should("exist");
    cy.contains("Verification").click();
    cy.contains("Please enter all required fields.").should("exist");
    cy.wait(1000);

    cy.get('[data-cy="forget_name"]').should("exist");
    cy.get('[data-cy="forget_name"]').type("DoeDoe");
    cy.get('[data-cy="forget_name"]').should("have.value", "DoeDoe");

    cy.get('[data-cy="forget_email"]').should("exist");
    cy.get('[data-cy="forget_email"]').type("john.doe@stonybrook.edu");
    cy.get('[data-cy="forget_email"]').should(
      "have.value",
      "john.doe@stonybrook.edu"
    );
    
    cy.get('[data-cy="forget_phone"]').should("exist");
    cy.get('[data-cy="forget_phone"]').type("1");
    cy.get('[data-cy="forget_phone"]').should("have.value", "1" );

    cy.contains("Verification").should("exist");
    cy.contains("Verification").click();
    cy.wait(1000);

    cy.contains("Change Password").should("exist");
  });
});

describe("4. Login test", () => {
  it("Log-in Test", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/login");
    cy.url().should("include", "/login");
    cy.wait(1000);
    cy.get('[data-cy="log_email"]').should("exist");
    cy.get('[data-cy="log_email"]').type("john.doe@stonybrook.edu");
    cy.get('[data-cy="log_email"]').should(
      "have.value",
      "john.doe@stonybrook.edu"
    );

    cy.get('input.log_input[type="password"]').should("exist");
    cy.get('input.log_input[type="password"]').type("000000001");
    cy.get('input.log_input[type="password"]').should(
      "have.value",
      "000000001"
    );
    cy.contains("Log in").should("exist");
    cy.contains("Log in").click();
    cy.wait(1000);
    cy.url().should("include", "/Dashboard");
  });
});

describe("5. My Profile test", () => {
  it("Profile change Test", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/login");
    cy.url().should("include", "/login");
    cy.get('[data-cy="log_email"]').type("john.doe@stonybrook.edu");
    cy.get('input.log_input[type="password"]').type("000000001");
    cy.contains("Log in").click();
    cy.url().should("include", "/Dashboard");
    cy.wait(1000);

    cy.contains("My Profile").should("exist");
    cy.contains("My Profile").click();
    cy.contains("My Profile").should("exist");

    cy.contains('[data-cy="profile_phone"]').should("exist");
    cy.get('[data-cy="profile_phone"]').type("12345678");
    cy.get('[data-cy="profile_phone"]').should("have.value", "12345678");

    cy.contains("Change Information").should("exist");
    cy.contains("Change Information").click();
  });
  it("Profile change again Test", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/login");
    cy.url().should("include", "/login");
    cy.get('[data-cy="log_email"]').type("john.doe@stonybrook.edu");
    cy.get('input.log_input[type="password"]').type("000000001");
    cy.contains("Log in").click();
    cy.url().should("include", "/Dashboard");
    cy.wait(1000);

    cy.contains("My Profile").should("exist");
    cy.contains("My Profile").click();
    cy.contains("My Profile").should("exist");

    cy.contains("12345678").should("exist");

    cy.contains('[data-cy="profile_phone"]').should("exist");
    cy.get('[data-cy="profile_phone"]').type("1");
    cy.get('[data-cy="profile_phone"]').should("have.value", "1");

    cy.contains("Change Information").should("exist");
    cy.contains("Change Information").click();
  });
});
describe("6. Create Map test", () => {
  it("creage and fork map", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/login");
    cy.url().should("include", "/login");
    cy.get('[data-cy="log_email"]').type("john.doe@stonybrook.edu");
    cy.get('input.log_input[type="password"]').type("000000001");
    cy.contains("Log in").click();
    cy.wait(1000);

    cy.contains("Create Map").should("exist");
    cy.contains("Create Map").click();

    cy.contains('[data-cy="create_discrip"]').should("exist");
    cy.get('[data-cy="create_discrip"]').type("This is My Map");
    cy.get('[data-cy="create_discrip"]').should("have.value", "This is My Map");

    cy.contains('[data-cy="create_mapname"]').should("exist");
    cy.get('[data-cy="create_mapname"]').type("My Map");
    cy.get('[data-cy="create_mapname"]').should("have.value", "My Map");
  
    cy.contains("Fork Map").should("exist");
    cy.contains("Fork Map").click();

    cy.contains("Africa").should("exist");
    cy.contains("Africa").click();

    cy.contains('[data-cy="create_but"]').should("exist");
    cy.contains('[data-cy="create_but"]').click();

  });
  it("Log in and check map", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/login");
    cy.url().should("include", "/login");
    cy.get('[data-cy="log_email"]').type("john.doe@stonybrook.edu");
    cy.get('input.log_input[type="password"]').type("000000001");
    cy.contains("Log in").click();
    cy.url().should("include", "/Dashboard");
    cy.wait(1000);

    cy.contains("My Map").should("exist");

  });
});


describe("7. Edit map Test", () => {
  it("Log-in and edit map test", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/login");
    cy.url().should("include", "/login");
    cy.get('[data-cy="log_email"]').type("john.doe@stonybrook.edu");
    cy.get('input.log_input[type="password"]').type("000000001");
    cy.contains("Log in").click();
    cy.url().should("include", "/Dashboard");
    cy.wait(1000);

    cy.contains("My Map").should("exist");
    cy.contains("Edit").should("exist");
    cy.contains("Edit").click();

    cy.contains("Edit Map").should("exist");

    cy.contains('[data-cy="create_mapname"]').should("exist");
    cy.get('[data-cy="create_mapname"]').type("Changed Map");
    cy.get('[data-cy="create_mapname"]').should("have.value", "Changed Map");

    cy.contains('[data-cy="create_edit"]').should("exist");
    cy.contains('[data-cy="create_edit"]').click();

    cy.contains("Dashboard").should("exist");
    cy.contains("Dashboard").click();

    cy.contains("Changed Map").should("exist");

  });
});

describe("8. Customize Map test", () => {
  it("Edit and Customize Test", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/login");
    cy.url().should("include", "/login");
    cy.get('[data-cy="log_email"]').type("john.doe@stonybrook.edu");
    cy.get('input.log_input[type="password"]').type("000000001");
    cy.contains("Log in").click();
    cy.url().should("include", "/Dashboard");
    cy.wait(1000);

    cy.contains("Changed Map").should("exist");
    cy.contains("Edit").click();
    cy.contains("Edit Map").should("exist");

    cy.contains("Map Customize Tool").should("exist");
    cy.contains("Map Customize Tool").click();

    cy.contains('[data-cy="custom_text"]').should("exist");
    cy.get('[data-cy="custom_text"]').type("New Area");
    cy.get('[data-cy="custom_text"]').should("have.value", "New Area");

    cy.contains("Applied Text Change").should("exist");
    cy.contains("Applied Text Change").click();

    cy.contains("Chad").should("exist");
    cy.contains("Chad").click();

    cy.contains("SAVE").should("exist");
    cy.contains("SAVE").click();

    });
 });

