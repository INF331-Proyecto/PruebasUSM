const { Builder, By, Key, until } = require("selenium-webdriver");
const chaiAsPromised = require("chai-as-promised");
const chai = require("chai");

chai.use(chaiAsPromised);
const { assert } = chai;

describe("DefaultTest", () => {
  it("should be able to add a product to the cart", async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.manage().setTimeouts({ implicit: 5000 });
    await driver.manage().window().maximize();
    await driver.get("http://20.231.216.22/");
    await driver.wait(
      until.elementLocated(By.xpath("//h3[contains(text(), 'Test')]"), 10000)
    );

    let testDiv = await driver
      .findElement(By.xpath("//h3[contains(text(), 'Test')]"))
      .findElement(By.xpath(".."));

    const carro = await driver.findElement(
      By.xpath("//button[contains(text(), 'Carrito')]")
    );

    let textoCarro = await carro.getText();
    await assert.equal(textoCarro, "Carrito (0)");

    await testDiv
      .findElement(By.xpath("//button[contains(text(), 'Añadir')]"))
      .click();

    textoCarro = await carro.getText();
    await assert.equal(textoCarro, "Carrito (1)");
  });
});
