Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

//User Account Test
//----------------------------------------------------
// Map - Create, Edit, Customize, Fork, Upload Test
//----------------------------------------------------


describe("1. Check the User", () => {
  
  it("before signup, checking user", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com");
    cy.contains("SignIn").click();
    cy.url().should("include", "/login");
    cy.wait(1000);
    cy.get('[data-cy="log_email"]').type("test@gmail.com");
    cy.get('input.log_input[type="password"]').type("testpassword");

    cy.contains("Log in").should("exist");
    cy.contains("Log in").click();
    cy.wait(1000);
    cy.url().then((url) => {
      if (url.includes("/Dashboard")) {
        cy.contains("Hello testName").should("exist");
        cy.contains("SignOut").should("exist");
        cy.contains("SignOut").click();
      } else {
        cy.url().should("include", "/login");

        cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com");
        cy.contains("SignIn").click();
        cy.url().should("include", "/login");
        cy.contains("Sign Up").click();
        cy.url().should("include", "/SignUp");

        cy.get('[data-cy="signup_id"]').type("testID");
        cy.get('[data-cy="signup_pw"]').type("testpassword");
        cy.get('[data-cy="signup_pwv"]').type("testpassword");
        cy.get('[data-cy="signup_name"]').type("testName");
        cy.get('[data-cy="signup_email"]').type("test@gmail.com");
        cy.get('[data-cy="signup_phone"]').type("12345678");

        cy.contains("Create Account").should("exist");
        cy.contains("Create Account").click();

        cy.wait(1000);

        cy.url().should("include", "/Dashboard");
        cy.contains("Hello testName").should("exist");
      }
    });
  });

});

describe("2. Check the exist Map", () => {
  it("before test, checking map", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com");
    cy.contains("SignIn").click();
    cy.url().should("include", "/login");
    cy.get('[data-cy="log_email"]').type("test@gmail.com");
    cy.get('input.log_input[type="password"]').type("testpassword");

    cy.contains("Log in").should("exist");
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
});


describe("3. Create Map test", () => {
    beforeEach(() => {
      cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
      cy.contains("SignIn").click();
      cy.url().should("include", "/login");
      cy.wait(1000);
      cy.get('[data-cy="log_email"]').type("test@gmail.com");
      cy.get('input.log_input[type="password"]').type("testpassword");

      cy.contains("Log in").click();
      cy.wait(1000);
    });

  it("create Point & fork map", () => {
    cy.contains("Create Map").should("exist");
    cy.once("uncaught:exception", () => false);
    cy.contains("Create Map").click();

    // Select an option by its value or text
    cy.get(".fork-select").first().select("Point Map");
    cy.get(".fork-select").last().select("Europe");

    cy.get('[data-cy="create_mapname"]').type("Point Europe");
    cy.get('[data-cy="create_mapname"]').should("have.value", "Point Europe");

    cy.get('[data-cy="create_discrip"]').type("Point Europe Map");
    cy.get('[data-cy="create_discrip"]').should(
      "have.value",
      "Point Europe Map"
    );

    cy.wait(1000);
    cy.wait(1000);
    cy.get("#create-button").click();
  });

  it("create default & fork map", () => {

    cy.contains("Create Map").should("exist");
    cy.once("uncaught:exception", () => false);
    cy.contains("Create Map").click();

    // Select an option by its value or text
    cy.get(".fork-select").first().select("Default Map");
    cy.get(".fork-select").last().select("Africa");
    
    cy.get('[data-cy="create_mapname"]').type("Front Test Map");
    cy.get('[data-cy="create_mapname"]').should("have.value", "Front Test Map");

    cy.get('[data-cy="create_discrip"]').type("This is My Map");
    cy.get('[data-cy="create_discrip"]').should("have.value", "This is My Map");

    cy.wait(1000);
    cy.wait(1000);
    cy.get("#create-button").click();
  });
});

describe("4. Map List test", () => {
  it("User Map List check", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
    cy.contains("SignIn").click();
    cy.url().should("include", "/login");
    cy.wait(1000);
    cy.get('[data-cy="log_email"]').type("test@gmail.com");
    cy.get('input.log_input[type="password"]').type("testpassword");

    cy.contains("Log in").click();
    cy.wait(1000);

    cy.url().should("include", "/Dashboard");
    cy.wait(1000);

    cy.get(".map-name").contains("Front Test Map").should("exist");

  });
});

describe("5. Edit map Test", () => {
  beforeEach(() => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
    cy.contains("SignIn").click();
    cy.url().should("include", "/login");
    cy.wait(1000);
    cy.get('[data-cy="log_email"]').type("test@gmail.com");
    cy.get('input.log_input[type="password"]').type("testpassword");

    cy.contains("Log in").click();
    cy.wait(1000);
  });
  it("before edit map, checking map", () => {

    cy.url().then((url) => {
      if (url.includes("/Dashboard")) {
        cy.get("body").then(($body) => {
          if ($body.find('.delete:contains("Edit")').length) {
            cy.get('.delete:contains("Edit")').then(() => {
              cy.log('"Edit" buttons found, skipping the test');
            });
          } 
          else {
            cy.contains("Create Map").should("exist");
            cy.once("uncaught:exception", () => false);
            cy.contains("Create Map").click();

            // Select an option by its value or text
            cy.get(".fork-select").first().select("Default Map");
            cy.get(".fork-select").last().select("Africa");

            cy.get('[data-cy="create_discrip"]').type("This is My Map");
            cy.get('[data-cy="create_discrip"]').should(
              "have.value",
              "This is My Map"
            );

            cy.get('[data-cy="create_mapname"]').type("Front Test Map");
            cy.get('[data-cy="create_mapname"]').should(
              "have.value",
              "Front Test Map"
            );

            cy.wait(1000);
            cy.wait(1000);
            cy.get("#create-button").click();
          }
        });
      } else {
        cy.url().should("include", "/login");
        cy.log("login fail");
      }
    });
  });
  it("Edit map test", () => {
    cy.get("select").select("Ascending");
    cy.wait(500);

    cy.contains("Edit").should("exist");
    cy.contains("Edit").first().click();

    cy.contains("Edit Map").should("exist");
    cy.wait(1000);

    cy.get('[data-cy="create_mapname"]').should("have.value", "Front Test Map");
    cy.get('[data-cy="create_mapname"]').type(" (2)");
    cy.get('[data-cy="create_mapname"]').should(
      "have.value",
      "Front Test Map (2)"
    );
    
    cy.contains("private").should("exist");
    cy.contains("private").click();
    
    cy.contains("public").should("exist");

    cy.get("#edit-button").click();

    cy.contains("Dashboard").should("exist");
    cy.contains("Dashboard").click();

    cy.contains("Front Test Map (2)").should("exist");
  });
});

describe("6. Search Map test", () => {
  beforeEach(() => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
    cy.contains("SignIn").click();
    cy.url().should("include", "/login");
    cy.wait(1000);
    cy.get('[data-cy="log_email"]').type("test@gmail.com");
    cy.get('input.log_input[type="password"]').type("testpassword");

    cy.contains("Log in").click();
    cy.wait(1000);
  });
  it("Search Map name and check", () => {
    cy.url().should("include", "/Dashboard");
    cy.wait(1000);
    cy.contains("Search Map").should("exist");
    cy.contains("Search Map").click();

    cy.get(".search-input").should("exist");
    cy.get('.search-input').type("Front Test Map");
    cy.get(".search-input").should("have.value", "Front Test Map");

    cy.get(".search-button").should("exist");
    cy.get(".search-button").click();

    cy.contains("Front Test Map (2)").should("exist");
  });
});

describe("7. Customize Text Test", () => {
  beforeEach(() => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
    cy.contains("SignIn").click();
    cy.url().should("include", "/login");
    cy.wait(1000);
    cy.get('[data-cy="log_email"]').type("test@gmail.com");
    cy.get('input.log_input[type="password"]').type("testpassword");

    cy.contains("Log in").click();
    cy.wait(1000);

    cy.url().should("include", "/Dashboard");
    cy.wait(500);

    cy.get("select").select("Ascending");
    cy.wait(500);
  });
  it("Change the label", () => {

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

describe("8. Customize Map test", () => {
  beforeEach(() => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
    cy.contains("SignIn").click();
    cy.url().should("include", "/login");
    cy.wait(1000);
    cy.get('[data-cy="log_email"]').type("test@gmail.com");
    cy.get('input.log_input[type="password"]').type("testpassword");

    cy.contains("Log in").click();
    cy.wait(1000);
    cy.url().should("include", "/Dashboard");
    cy.wait(500);

    cy.get("select").select("Ascending");
    cy.wait(500);

  });
  it("Customize Color Test", () => {

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

describe("9. Legend test", () => {
  beforeEach(() => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
    cy.contains("SignIn").click();
    cy.url().should("include", "/login");
    cy.wait(1000);
    cy.get('[data-cy="log_email"]').type("test@gmail.com");
    cy.get('input.log_input[type="password"]').type("testpassword");

    cy.contains("Log in").click();
    cy.wait(500);

    cy.url().should("include", "/Dashboard");
    cy.wait(500);

    cy.get("select").select("Ascending");
    cy.wait(500);
  });

  it("Make new Legend Test", () => {
    
    cy.contains("Front Test Map (2)").should("exist");
    cy.contains("Edit").click();
    cy.contains("Edit Map").should("exist");

    cy.contains("Map Customize Tool").should("exist");
    cy.contains("Map Customize Tool").click();
    cy.wait(500);

    cy.contains("Legend").should("exist");
    cy.contains("Legend").click();
    cy.get('input[placeholder="Legend Label"]').type("new label");

    cy.contains("+").should("exist");
    cy.contains("+").click();

    cy.contains("SAVE").should("exist");
    cy.contains("SAVE").click();
  });
 });

describe("10. Import Map test", () => {
  beforeEach(() => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
    cy.contains("SignIn").click();
    cy.url().should("include", "/login");
    cy.wait(1000);
    cy.get('[data-cy="log_email"]').type("test@gmail.com");
    cy.get('input.log_input[type="password"]').type("testpassword");

    cy.contains("Log in").click();
    cy.wait(1000);
  });

  it("Create map with import geojson file", () => {
    cy.url().should("include", "/Dashboard");
    cy.wait(1000);

    cy.contains("Create Map").should("exist");
    cy.once("uncaught:exception", () => false);
    cy.contains("Create Map").click();

    // Select an option by its value or text
    cy.get(".fork-select").first().select("Point Map");
    cy.get(".button.upload").click();
    const filepath = "./cypress/fixtures/testgeojson.geojson";

    cy.get("#creatmap-fileInput").selectFile(filepath, { force: true });
    cy.wait(1000);

    cy.get('[data-cy="create_mapname"]').type("Point import");
    cy.get('[data-cy="create_mapname"]').should("have.value", "Point import");

    cy.get('[data-cy="create_discrip"]').type("Point import testgeojson Map");
    cy.get('[data-cy="create_discrip"]').should(
      "have.value",
      "Point import testgeojson Map"
    );
    cy.wait(1000);
    cy.wait(1000);
    cy.get("#create-button").click();
    
  });

});


describe("11. Map View test", () => {
  it("Search and cilck map to check view page with legend", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
    cy.contains("SignIn").click();
    cy.url().should("include", "/login");
    cy.wait(500);

    cy.get('[data-cy="log_email"]').type("test@gmail.com");
    cy.get('input.log_input[type="password"]').type("testpassword");
    cy.contains("Log in").click();
    cy.wait(1000);

    cy.contains("Search Map").should("exist");
    cy.contains("Search Map").click();
    cy.wait(1000);

    cy.get(".search-input").should("exist");
    cy.get(".search-input").type("Front Test Map");
    cy.get(".search-input").should("have.value", "Front Test Map");

    cy.get(".search-button").should("exist");
    cy.get(".search-button").click();

    cy.get('img[alt="My SVG"]').eq(3).click();
    
    cy.contains("TITLE :").should("exist");
    cy.contains("Description :").should("exist");

    cy.contains("Legend").should("exist");
    cy.contains("Legend").click();

  });
});

describe("12. Sort button test", () => {
  it("Sort button test with search map page", () => {
    cy.visit("https://customap416client-3b33f67d5c86.herokuapp.com/");
    cy.contains("SignIn").click();
    cy.url().should("include", "/login");
    cy.wait(500);

    cy.get('[data-cy="log_email"]').type("test@gmail.com");
    cy.get('input.log_input[type="password"]').type("testpassword");
    cy.contains("Log in").click();
    cy.wait(1000);

    cy.contains("Search Map").should("exist");
    cy.contains("Search Map").click();
    cy.wait(1000);

    let initialList = [];

    cy.get(".map-name")
      .each(($el) => {
        initialList.push($el.text());
      })
      .then(() => {
        cy.get("select").select("Ascending");

        cy.get(".map-name").should(($listItems) => {
          let sortedListAsc = $listItems
            .map((index, html) => Cypress.$(html).text())
            .get();
          expect(sortedListAsc).to.deep.equal([...initialList].sort());
        });
        cy.get("select").select("Descending");

        cy.get(".map-name").should(($listItems) => {
          let sortedListDesc = $listItems
            .map((index, html) => Cypress.$(html).text())
            .get();

          expect(sortedListDesc).to.deep.equal(
            [...initialList].sort().reverse()
          );
        });
      });
  });
});

