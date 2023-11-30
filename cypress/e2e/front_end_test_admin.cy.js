Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});
//Admin Account Test ------------------------------------------------

describe("1. Homepage Test", () => {
  it("passes", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
    cy.contains("Home").should("exist");
    cy.contains("Sign in").should("exist");
    cy.contains("Sign in").click();
    cy.url().should("include", "/login");
  });
});

describe("2. New User Account and Create Map for Adming checking", () => {
  it("Make New Account for delete Test", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/SignUp");
    cy.url().should("include", "/SignUp");

    cy.get('[data-cy="signup_id"]').should("exist");
    cy.get('[data-cy="signup_id"]').type("testID");
    cy.get('[data-cy="signup_id"]').should("have.value", "testID");

    cy.get('[data-cy="signup_pw"]').type("testpassword");
    cy.get('[data-cy="signup_pw"]').should("have.value", "testpassword");

    cy.get('[data-cy="signup_pwv"]').type("testpassword");
    cy.get('[data-cy="signup_pwv"]').should("have.value", "testpassword");

    cy.get('[data-cy="signup_name"]').type("AtestName");
    cy.get('[data-cy="signup_name"]').should("have.value", "AtestName");

    cy.get('[data-cy="signup_email"]').type("test1@gmail.com");
    cy.get('[data-cy="signup_email"]').should("have.value", "test1@gmail.com");

    cy.get('[data-cy="signup_phone"]').type("12345678");
    cy.get('[data-cy="signup_phone"]').should("have.value", "12345678");

    cy.contains("Create Account").should("exist");
    cy.contains("Create Account").click();

    cy.wait(1000);
    cy.url().should("include", "/Dashboard");
    cy.contains("Hello AtestName").should("exist");
  });

  it("create and fork map", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/login");
    cy.url().should("include", "/login");
    cy.get('[data-cy="log_email"]').type("test1@gmail.com");
    cy.get('input.log_input[type="password"]').type("testpassword");
    cy.contains("Log in").click();
    cy.wait(1000);

    cy.contains("Create Map").should("exist");
    cy.once("uncaught:exception", () => false);
    cy.contains("Create Map").click();

    cy.get('[data-cy="create_discrip"]').type("This is Map for ATEST");
    cy.get('[data-cy="create_discrip"]').should(
      "have.value",
      "This is Map for ATEST"
    );

    cy.get('[data-cy="create_mapname"]').type("A Test Map");
    cy.get('[data-cy="create_mapname"]').should("have.value", "A Test Map");

    cy.contains("Fork Map").should("exist");
    cy.contains("Fork Map").click();
    cy.wait(500);

    cy.contains("South America").should("exist");
    cy.contains("South America").click();

    cy.wait(1000);
    cy.wait(1000);
    cy.get("#create-button").click();
  });
  it("Log-in and edit map test", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/login");
    cy.url().should("include", "/login");
    cy.get('[data-cy="log_email"]').type("test1@gmail.com");
    cy.get('input.log_input[type="password"]').type("testpassword");
    cy.contains("Log in").click();
    cy.wait(1000);

    cy.contains("Edit").should("exist");
    cy.contains("Edit").click();

    cy.contains("Edit Map").should("exist");
    cy.wait(1000);

    cy.contains("Private").should("exist");
    cy.contains("Private").click();

    cy.contains("Public").should("exist");

    cy.get("#edit-button").click();
    cy.wait(300);
  });
});

describe("3. Admin Log-in Test", () => {
  it("Admin log-in", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
    cy.contains("Sign in").should("exist");
    cy.contains("Sign in").click();
    cy.url().should("include", "/login");

    cy.wait(1000);
    cy.get('[data-cy="log_email"]').should("exist");
    cy.get('[data-cy="log_email"]').type("0");
    cy.get('[data-cy="log_email"]').should("have.value", "0");

    cy.get('input.log_input[type="password"]').should("exist");
    cy.get('input.log_input[type="password"]').type("00000000");
    cy.get('input.log_input[type="password"]').should(
      "have.value",
      "00000000"
    );
    cy.contains("Log in").should("exist");
    cy.contains("Log in").click();
    cy.wait(1000);
    cy.url().should("include", "/AdminDashboard");
    cy.contains("Hello Admin").should("exist");
    
  });
});

describe("4. Admin User map list Test", () => {
  it("Show Map list for each User", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/login");
    cy.url().should("include", "/login");
    cy.get('[data-cy="log_email"]').type("0");
    cy.get('input.log_input[type="password"]').type("00000000");
    cy.contains("Log in").click();
    cy.wait(1000);
    
    cy.contains("Map").should("exist");
    cy.contains("Map").click();

    cy.contains("Title").should("exist");
    cy.contains("Description").should("exist");

    cy.contains("Map").should("exist");
    cy.contains("Map").click();

    cy.contains("Title").should("not.exist");
    cy.contains("Description").should("not.exist");
  });
});

describe("5. Admin User delete Test", () => {
  it("Delete User with Admin account", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/login");
    cy.url().should("include", "/login");
    cy.get('[data-cy="log_email"]').type("0");
    cy.get('input.log_input[type="password"]').type("00000000");
    cy.contains("Log in").click();
    cy.wait(1000);

    cy.contains("AtestName").should("exist");

    cy.contains("Delete").should("exist");
    cy.contains("Delete").click();

    cy.contains("AtestName").should("not.exist");
  });
});

describe("6. Admin Map Sort Test", () => {
  it("Map Sort button test", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/login");
    cy.url().should("include", "/login");
    cy.get('[data-cy="log_email"]').type("0");
    cy.get('input.log_input[type="password"]').type("00000000");
    cy.contains("Log in").click();
    cy.wait(1000);

    cy.contains("Map List").should("exist");
    cy.contains("Map List").click();

    cy.contains("Sort").should("exist");
    cy.contains("Sort").click();

    cy.contains("Ascending").should("exist");
    cy.contains("Ascending").click();

    cy.contains("Ascending").should("exist");
    cy.contains("Ascending").click();

    cy.contains("Recent Date").should("exist");
    cy.contains("Recent Date").click();
  });
});

describe("7. Admin Map Delete Test", () => {
  it("Delete A Test map", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/login");
    cy.url().should("include", "/login");
    cy.get('[data-cy="log_email"]').type("0");
    cy.get('input.log_input[type="password"]').type("00000000");
    cy.contains("Log in").click();
    cy.wait(1000);

    cy.contains("Map List").should("exist");
    cy.contains("Map List").click();

    cy.contains("Sort").should("exist");
    cy.contains("Sort").click();

    cy.contains("Ascending").should("exist");
    cy.contains("Ascending").click();

    cy.contains("A Test Map").should("exist");

    cy.contains("x").should("exist");
    cy.contains("x").click();

    cy.contains("A Test Map").should("not.exist");
  });
});

describe("8. Admin Map Search Test", () => {
  it("Map Search Test", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/login");
    cy.url().should("include", "/login");
    cy.get('[data-cy="log_email"]').type("0");
    cy.get('input.log_input[type="password"]').type("00000000");
    cy.contains("Log in").click();
    cy.wait(1000);

    cy.contains("Map List").should("exist");
    cy.contains("Map List").click();

    cy.get('[data-cy="admin-searchbox"]').should("exist");
    cy.get('[data-cy="admin-searchbox"]').type("Front Test Map (2)");
    cy.get('[data-cy="admin-searchbox"]').should(
      "have.value",
      "Front Test Map (2)"
    );

    cy.contains("Search").should("exist");
    cy.contains("Search").click();

    cy.contains("Front Test Map (2)").should("exist");
    
  });
});

describe("9. Admin Map View test", () => {
  it("", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/login");
    cy.url().should("include", "/login");
    cy.get('[data-cy="log_email"]').type("0");
    cy.get('input.log_input[type="password"]').type("00000000");
    cy.contains("Log in").click();
    cy.wait(1000);

    cy.contains("Map List").should("exist");
    cy.contains("Map List").click();
    cy.wait(1000);

    cy.get('[data-cy="admin-searchbox"]').should("exist");
    cy.get('[data-cy="admin-searchbox"]').type("Front Test Map (2)");
    cy.get('[data-cy="admin-searchbox"]').should(
      "have.value",
      "Front Test Map (2)"
    );

    cy.get('img[alt="My SVG"]').click();

    cy.contains("TITLE :").should("exist");
    cy.contains("Description :").should("exist");
    cy.contains("Legend").should("exist");
  });
});