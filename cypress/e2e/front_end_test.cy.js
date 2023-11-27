Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

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

    cy.contains("Create Account").should("exist");
    cy.contains("Create Account").click();

    cy.wait(1000);
    cy.url().should("include", "/Dashboard");
    cy.contains("Hello testName").should("exist");
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

  //  cy.contains('[data-cy="forget_newpwd"]').should("exist");
  //  cy.get('[data-cy="forget_newpwd"]').type("changepassword");
  //  cy.get('[data-cy="forget_newpwd"]').should("have.value", "changepassword");

  //  cy.contains('[data-cy="forget_email"]').should("exist");
  //  cy.get('[data-cy="forget_newagain"]').type("changepassword");
  //  cy.get('[data-cy="forget_newagain"]').should(
  //    "have.value",
  //    "changepassword"
  //  );
  //  cy.contains("Change Password").should("exist");
  //  cy.contains("Change Password").click();
  });
 });

describe("4. Login test", () => {
  it("Log-in Test", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/login");
    cy.url().should("include", "/login");
    cy.wait(1000);
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
    cy.url().should("include", "/Dashboard");
    cy.contains("Hello testName").should("exist");
  });
});

describe("5. My Profile test", () => {
  it("Profile change Test", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/login");
    cy.url().should("include", "/login");
    cy.get('[data-cy="log_email"]').type("test@gmail.com");
    cy.get('input.log_input[type="password"]').type("testpassword");
    cy.contains("Log in").click();
    cy.url().should("include", "/Dashboard");
    cy.wait(1000);

    cy.contains("My Profile").should("exist");
    cy.contains("My Profile").click();
    cy.contains("My Profile").should("exist");

    cy.get('[data-cy="profile_phone"]').clear().type('87654321');

    cy.contains("Change Information").should("exist");
    // cy.contains("Change Information").click();
  });
 });

describe("6. Create Map test", () => {
  it("create and fork map", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/login");
    cy.url().should("include", "/login");
    cy.get('[data-cy="log_email"]').type("test@gmail.com");
    cy.get('input.log_input[type="password"]').type("testpassword");
    cy.contains("Log in").click();
    cy.wait(1000);

    cy.contains("Create Map").should("exist");
    cy.once("uncaught:exception", () => false);
    cy.contains("Create Map").click();

    cy.get('[data-cy="create_discrip"]').type("This is My Map");
    cy.get('[data-cy="create_discrip"]').should("have.value", "This is My Map");

    cy.get('[data-cy="create_mapname"]').type("Front Test Map");
    cy.get('[data-cy="create_mapname"]').should("have.value", "Front Test Map");

    cy.contains("Fork Map").should("exist");
    cy.contains("Fork Map").click();
    cy.wait(500);

    cy.contains("Africa").should("exist");
    cy.get("a").contains("Africa").click({ force: true });
    cy.wait(1000);
    cy.wait(1000);
    cy.get("#create-button").click();
  });
});

//-------------Success----------------------------------------------------------------

describe("7. Edit map Test", () => {
  it("Log-in and edit map test", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/login");
    cy.url().should("include", "/login");
    cy.get('[data-cy="log_email"]').type("test@gmail.com");
    cy.get('input.log_input[type="password"]').type("testpassword");
    cy.contains("Log in").click();
    cy.wait(1000);

    cy.contains("Edit").should("exist");
    cy.contains("Edit").click();

    cy.contains("Edit Map").should("exist");
    cy.wait(1000);

    cy.get('[data-cy="create_mapname"]').should("have.value", "Front Test Map");
    cy.get('[data-cy="create_mapname"]').type(" (2)");
    cy.get('[data-cy="create_mapname"]').should(
      "have.value",
      "Front Test Map (2)"
    );

    cy.get("#edit-button").click();

    cy.contains("Dashboard").should("exist");
    cy.contains("Dashboard").click();

    cy.contains("Front Test Map (2)").should("exist");
  });
});

describe("8. Customize Text Test", () => {
  it("Change the label", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/login");
    cy.url().should("include", "/login");
    cy.get('[data-cy="log_email"]').type("test@gmail.com");
    cy.get('input.log_input[type="password"]').type("testpassword");
    cy.contains("Log in").click();
    cy.wait(1000);

    cy.contains("Front Test Map (2)").should("exist");
    cy.contains("Edit").click();
    cy.contains("Edit Map").should("exist");

    cy.contains("Map Customize Tool").should("exist");
    cy.contains("Map Customize Tool").click();
    cy.wait(500);

    cy.get('[data-cy="custom_text"]').type("New Area");
    cy.get('[data-cy="custom_text"]').should("have.value", "New Area");

    cy.contains("Applied Text Change").should("exist");
    cy.contains("Applied Text Change").click();

    cy.get("path.leaflet-interactive").first().click();

    cy.contains("SAVE").should("exist");
    cy.contains("SAVE").click();
  });
});

describe("9. Customize Map test", () => {
  it("Customize Color Test", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/login");
    cy.url().should("include", "/login");
    cy.get('[data-cy="log_email"]').type("test@gmail.com");
    cy.get('input.log_input[type="password"]').type("testpassword");
    cy.contains("Log in").click();
    cy.wait(1000);

    cy.contains("Front Test Map (2)").should("exist");
    cy.contains("Edit").click();
    cy.contains("Edit Map").should("exist");

    cy.contains("Map Customize Tool").should("exist");
    cy.contains("Map Customize Tool").click();
    cy.wait(500);

    cy.contains("Pick a Color").click();
    //onchange function -> trigger "change" / HEX number
    cy.get(".color-picker").invoke("val", "#0EE10E").trigger("change");

    cy.get("path.leaflet-interactive").first().click();

    cy.contains("SAVE").should("exist");
    cy.contains("SAVE").click();
  });
});

describe("10. Legend test", () => {
  it("Make new Legend Test", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/login");
    cy.url().should("include", "/login");
    cy.get('[data-cy="log_email"]').type("test@gmail.com");
    cy.get('input.log_input[type="password"]').type("testpassword");
    cy.contains("Log in").click();
    cy.wait(1000);

    cy.contains("Front Test Map (2)").should("exist");
    cy.contains("Edit").click();
    cy.contains("Edit Map").should("exist");

    cy.contains("Map Customize Tool").should("exist");
    cy.contains("Map Customize Tool").click();
    cy.wait(500);

    cy.contains("Legend").should("exist");
    cy.contains("Legend").click();
    cy.get('input[placeholder="Legend Label"]').type("new label");

   cy.contains("Add Legend").should("exist");
    cy.contains("Add Legend").click();

    cy.contains("SAVE").should("exist");
    cy.contains("SAVE").click();
  });
 });


//----------Future Plan-------------------------------------------------------

// describe("9. Import Map test", () => {
//   it("", () => {
//     cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
//   });
// });

// describe("10. Search Map test", () => {
//   it("", () => {
//   });
// });

// describe("11. Admin Log-in Test", () => {
//   it("", () => {
//   });
// });

// describe("12. Admin User delete Test", () => {
//   it("", () => {
//   });
// });

// describe("13. Admin Map Delete Test", () => {
//   it("", () => {
//   });
// });
