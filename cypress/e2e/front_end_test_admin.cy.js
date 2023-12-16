Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});
//Admin Account Test ------------------------------------------------

describe("1. Homepage Test", () => {
  it("passes", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
    cy.contains("Home").should("exist");
    cy.contains("SignIn").should("exist");
    cy.contains("SignIn").click();
    cy.url().should("include", "/login");
  });
});

describe("2. New User Account and Create Map for Adming checking", () => {
  it("before signup, checking user", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
    cy.contains("SignIn").click();
    cy.url().should("include", "/login");
    cy.wait(1000);
    cy.get('[data-cy="log_email"]').type("test1@gmail.com");
    cy.get('input.log_input[type="password"]').type("testpassword");

    cy.contains("Log in").should("exist");
    cy.contains("Log in").click();
    cy.wait(1000);

    cy.url().then((url) => {
      if (url.includes("/Dashboard")) {
        cy.contains("Hello AtestName").should("exist");
        cy.contains("SignOut").should("exist");
        cy.contains("SignOut").click();
      } else {
        cy.url().should("include", "/login");
        cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
        cy.contains("SignIn").click();
        cy.contains("Sign Up").click();
        cy.url().should("include", "/SignUp");

        cy.get('[data-cy="signup_id"]').type("testID");
        cy.get('[data-cy="signup_pw"]').type("testpassword");
        cy.get('[data-cy="signup_pwv"]').type("testpassword");
        cy.get('[data-cy="signup_name"]').type("AtestName");
        cy.get('[data-cy="signup_email"]').type("test1@gmail.com");
        cy.get('[data-cy="signup_phone"]').type("12345678");
        cy.contains("Create Account").click();

        cy.wait(1000);
        cy.url().should("include", "/Dashboard");
        cy.contains("Hello AtestName").should("exist");
      }
    });
  });

  it("before test, checking map", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com");
    cy.contains("SignIn").click();
    cy.url().should("include", "/login");
    cy.get('[data-cy="log_email"]').type("test1@gmail.com");
    cy.get('input.log_input[type="password"]').type("testpassword");
    cy.contains("Log in").click();
    cy.wait(1000);
    cy.url().should("include", "/Dashboard");
    cy.wait(1000);

    cy.get("body").then(($body) => {
      if ($body.find('.delete:contains("X")').length) {
        cy.get('.delete:contains("X")').each(($btn) => {
          cy.wrap($btn)
            .click()
            .then(() => {
              cy.wait(500);
            });
        });
        cy.get('.delete:contains("X")').should("not.exist");
      } else {
        cy.log('No "X" buttons found, skipping the test');
      }
    });
  });
  it("create and fork map", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com");
    cy.contains("SignIn").click();
    cy.url().should("include", "/login");
    cy.get('[data-cy="log_email"]').type("test1@gmail.com");
    cy.get('input.log_input[type="password"]').type("testpassword");
    cy.contains("Log in").click();
    cy.wait(1000);
    cy.url().should("include", "/Dashboard");
    cy.wait(1000);

    cy.contains("Create Map").should("exist");
    cy.once("uncaught:exception", () => false);
    cy.contains("Create Map").click();

    cy.get(".fork-select").first().select("Default Map");
    cy.get(".fork-select").last().select("Africa");

    cy.get('[data-cy="create_mapname"]').type("A Test Map");
    cy.get('[data-cy="create_mapname"]').should("have.value", "A Test Map");

    cy.get('[data-cy="create_discrip"]').type("This is Map for ATEST");
    cy.get('[data-cy="create_discrip"]').should(
      "have.value",
      "This is Map for ATEST"
    );

    cy.wait(1000);
    cy.wait(1000);
    cy.get("#create-button").click();
  });
});

describe("3. Admin Log-in Test", () => {
  it("Admin log-in", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
    cy.contains("SignIn").should("exist");
    cy.contains("SignIn").click();
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
    cy.contains("Hello, Admin").should("exist");
    
  });
});

describe("4. Admin User map list Test", () => {
  beforeEach(() => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
    cy.contains("SignIn").click();
    cy.get('[data-cy="log_email"]').type("0");
    cy.get('input.log_input[type="password"]').type("00000000");
    cy.contains("Log in").click();
    cy.wait(1000);
  });

  it("Check map list with Map button for User", () => {
    cy.wait(1000);

    cy.get("body").then(($body) => {
      if ($body.find(':contains("AtestName")').length) {
        // If "Oen" exists, perform the following actions
        cy.log("Oen exists on the page");
        cy.contains(".user-item", "AtestName")
          .closest(".user-item")
          .find(".map")
          .click();
        cy.contains("Title").should("exist");
      } else {
        // If "Oen" does not exist, log a message
        cy.log("AtestName user does not exist on the page");
      }
    });
  });
});


// admin user sort test



describe("5. Admin Map View test", () => {
  beforeEach(() => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
    cy.contains("SignIn").click();
    cy.get('[data-cy="log_email"]').type("0");
    cy.get('input.log_input[type="password"]').type("00000000");
    cy.contains("Log in").click();
    cy.wait(1000);
  });

  it("Admin search and map view", () => {
    cy.contains("Map List").should("exist");
    cy.contains("Map List").click();
    cy.wait(1000);

    cy.get('img[alt="My SVG"]').then((images) => {
      if (images.length > 3) {
        cy.wrap(images).eq(3).click(); // click the first map.
        cy.contains("TITLE :").should("exist");
        cy.contains("Description :").should("exist");
        cy.contains("Legend").should("exist");
      } else {
        cy.log("No exist map in page");
      }
    });
  });
});

describe("6. Admin Map Search Test", () => {
  beforeEach(() => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
    cy.contains("SignIn").click();
    cy.get('[data-cy="log_email"]').type("0");
    cy.get('input.log_input[type="password"]').type("00000000");
    cy.contains("Log in").click();
    cy.wait(1000);
  });

  it("Map Search Test", () => {

    cy.contains("Map List").should("exist");
    cy.contains("Map List").click();

    cy.get('[data-cy="admin-searchbox"]').should("exist");
    cy.get('[data-cy="admin-searchbox"]').type("A Test Map");
    cy.get('[data-cy="admin-searchbox"]').should(
      "have.value",
      "A Test Map"
    );

    cy.contains("Search").should("exist");
    cy.contains("Search").click();

    cy.contains("A Test Map").should("exist");
    
  });
});

describe("7. Admin Map Delete Test", () => {
    beforeEach(() => {
      cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
      cy.contains("SignIn").click();
      cy.get('[data-cy="log_email"]').type("0");
      cy.get('input.log_input[type="password"]').type("00000000");
      cy.contains("Log in").click();
      cy.wait(1000);
    });

  it("Delete A Test map", () => {
    cy.contains("Map List").should("exist");
    cy.contains("Map List").click();

    cy.get('[data-cy="admin-searchbox"]').should("exist");
    cy.get('[data-cy="admin-searchbox"]').type("A Test Map");
    cy.get('[data-cy="admin-searchbox"]').should(
      "have.value",
      "A Test Map"
    );
    cy.get(".search-button").should("exist");
    cy.get(".search-button").last().click();

    cy.contains("A Test Map").should("exist");

    cy.get("body").then(($body) => {
      if ($body.find('.delete:contains("X")').length) {
        cy.get('.delete:contains("X")').each(($btn) => {
          cy.wrap($btn)
            .click()
            .then(() => {
              cy.wait(500);
            });
        });
      } else {
        cy.log('No "X" buttons found, skipping the test');
      }
    });

    cy.contains("A Test Map").should("not.exist");
  });
});

describe("8. Admin User delete Test", () => {
  beforeEach(() => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
    cy.contains("SignIn").click();
    cy.get('[data-cy="log_email"]').type("0");
    cy.get('input.log_input[type="password"]').type("00000000");
    cy.contains("Log in").click();
    cy.wait(1000);
  });

  it("Delete User with Admin account", () => {

    cy.get("body").then(($body) => {
      if ($body.find(':contains("AtestName")').length) {
        cy.log("AtestName exists on the page");
        cy.contains(".user-item", "AtestName")
          .closest(".user-item")
          .find(".delete")
          .click();
      } else {
        cy.log("AtestName does not exist on the page");
      }
    });

    cy.get("body").then(($body) => {
      if ($body.find(':contains("testName")').length) {
        cy.log("testName exists on the page");
        cy.contains(".user-item", "testName")
          .closest(".user-item")
          .find(".delete")
          .click();
      } else {
        cy.log("testName does not exist on the page");
      }
    });

  });
});

