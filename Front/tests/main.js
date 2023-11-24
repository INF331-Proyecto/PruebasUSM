const { Builder, By, Key, until } = require("selenium-webdriver");
const chaiAsPromised = require("chai-as-promised");
const chai = require("chai");

chai.use(chaiAsPromised);
const { assert } = chai;

describe("Shop Tests", () => {
	driver = new Builder().forBrowser("chrome").build();
	driver.manage().setTimeouts({ implicit: 5000 });
	driver.manage().window().maximize();
	it("should be able to add a product to the cart", async () => {
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

describe("User Account", () => {
	const user = "usuario1";
	const pass = "clave1";
	it("should be able to create an account", async () => {
		await driver.get("http://20.231.216.22/");
		// find <a> link with "Login" text
		await driver
			.findElement(By.xpath("//a[contains(text(), 'Login')]"))
			.click();
		await driver.wait(
			until.elementLocated(
				By.xpath("//h2[contains(text(), 'Registrar')]"),
				10000
			)
		);
		let registrarForm = await driver
			.findElement(By.xpath("//h2[contains(text(), 'Registrar')]"))
			.findElement(By.xpath(".."));

		//fill form with email, it has "email" and "contraseña" id
		await registrarForm.findElement(By.id("email")).sendKeys(user);
		await registrarForm.findElement(By.id("contraseña")).sendKeys(pass);
		await registrarForm.findElement(By.id("contraseña2")).sendKeys(pass);
		await registrarForm
			.findElement(By.xpath("//button[contains(text(), 'Registrar')]"))
			.click();
	});

	it("should be able to login to that account", async () => {
		let registrarForm = await driver
			.findElement(By.xpath("//h2[contains(text(), 'Login')]"))
			.findElement(By.xpath(".."));

		//fill form with email, it has "email" and "contraseña" id
		await registrarForm.findElement(By.id("email")).sendKeys(user);
		await registrarForm.findElement(By.id("contraseña")).sendKeys(pass);
		await registrarForm
			.findElement(By.xpath("//button[contains(text(), 'Iniciar')]"))
			.click();
		await driver.wait(
			until.elementLocated(
				By.xpath("//h2[contains(text(), 'A iniciado su sesion!')]"),
				10000
			)
		);
		const texto = await driver
			.findElement(By.xpath("//h2[contains(text(), 'A iniciado su sesion!')]"))
			.getText();
		await assert.equal(texto, "A iniciado su sesion!");
	});
});

after(async () => {
	await driver.quit();
});
