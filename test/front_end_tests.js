import React from "react";
import App from "../project/client/src/App";
import MapComponent from "../project/client/src/map";
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Login test", () => {
  it("Log-in Test", () => {
    cy.viewport(1200, 800);

    cy.contains("Sign in").click();
    cy.get("input[type=email]").type("user@example.com");
    cy.get("input[type=password]").type("password123");
    cy.contains("Log in").click();
    cy.log("login success!");
  });
});
describe("Create map and file input load-clear test", () => {
  it("Create new Map", () => {
    cy.viewport(1200, 800);
    cy.mount(<App />);
    cy.contains("Create Map").click();

    cy.get("input[type=name]").type("My new map!");
    cy.get("input[type=desc]").type("it is my first map");
    cy.get("input[type=prop]").type("prop example");
    cy.get("input[type=text]").type("some text about the new map");
    cy.contains("Create New Map").click();
    cy.log("create new map success!");
  });
  it("File input test in Create new Map", () => {
    cy.viewport(1200, 800);
    cy.mount(<App />);
    cy.contains("Create Map").click();
    cy.mount(<MapComponent />);
    cy.get(".fileinput").selectFile("./testgeojson.geojson", {
      force: true,
    });
    cy.wait(2000);
    cy.contains("Render").click();
    cy.wait(4000);
    cy.contains("clear map").click();
  });
});
