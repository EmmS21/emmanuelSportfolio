const { Builder, By, until, Key } = require('selenium-webdriver');
const { Actions } = require('selenium-webdriver/lib/input');
const chrome = require('selenium-webdriver/chrome');
const { expect } = require('chai');
const fs = require('fs');


async function openLink() {
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();
    let actions = new Actions(driver);
    try {
        await driver.get('https://job-assistant.vercel.app/');
        await driver.manage().window().maximize();
        await driver.executeScript(`alert('Maximizing the screen size for the test.');`);
        await driver.switchTo().alert().accept();
        const title = await driver.getTitle();
        expect(title).to.include('Job Assistant'); 

        // Display the test result on the browser
        await driver.executeScript(`
            let div = document.createElement('div');
            div.style.position = 'fixed';
            div.style.top = '10px';
            div.style.right = '10px';
            div.style.backgroundColor = 'green';
            div.style.color = 'white';
            div.style.padding = '10px';
            div.style.zIndex = 10000;
            div.innerText = 'Test: Open and verify title - PASSED';
            document.body.appendChild(div);
        `);

        // Hover over the start button
        let startButton = await driver.findElement(By.className('start-button'));
        await driver.actions({ bridge: true }).move({ origin: startButton }).perform();

        // Display the test result for hover effect on the browser
        await driver.executeScript(`
            let hoverResult = document.createElement('div');
            hoverResult.style.position = 'fixed';
            hoverResult.style.top = '60px';
            hoverResult.style.right = '10px';
            hoverResult.style.backgroundColor = 'green';
            hoverResult.style.color = 'white';
            hoverResult.style.padding = '10px';
            hoverResult.style.zIndex = 10000;
            hoverResult.innerText = 'Test: Hover over start button - Hover effect displayed';
            document.body.appendChild(hoverResult);
        `);

        // Click the start button
        await startButton.click();

        // Wait for the form to be visible
        await driver.wait(until.elementLocated(By.className('submissionform')));

        // Check if the form is visible
        const formElement = await driver.findElement(By.className('submissionform'));
        const isFormVisible = await formElement.isDisplayed();
        expect(isFormVisible).to.be.equal(true);

        // Display the test result for form visibility on the browser
        await driver.executeScript(`
            let divForm = document.createElement('div');
            divForm.style.position = 'fixed';
            divForm.style.top = '110px';
            divForm.style.right = '10px';
            divForm.style.backgroundColor = 'green';
            divForm.style.color = 'white';
            divForm.style.padding = '10px';
            divForm.style.zIndex = 10000;
            divForm.innerText = 'Test: Submission Form - Rendered';
            document.body.appendChild(divForm);
        `);
        console.log("Script started");
        const prompts = JSON.parse(fs.readFileSync('public/prompts.json', 'utf-8'));
        const resumeInput = await driver.findElement(By.css('.submissionform textarea[name="resume"]'));
        const portfolioInput = await driver.findElement(By.css('.submissionform textarea[name="portfolio"]'));
        const vacancyInput = await driver.findElement(By.css('.submissionform textarea[name="vacancy"]'));

        async function handleInput(inputElement, promptKey) {
            try {
                await inputElement.click();
                const activeElement = await driver.switchTo().activeElement();
                const activeElementId = await activeElement.getId();
                const inputElementId = await inputElement.getId();
        
                if (activeElementId === inputElementId) {
                    await inputElement.sendKeys(prompts[promptKey]);
                }
            } catch (error) {
                console.error("Error:", error.message);
            }
        }
        await handleInput(resumeInput, 'one');
        await handleInput(portfolioInput, 'two'); 
        await handleInput(vacancyInput, 'three'); 
        
        const submitButtonLocator = By.css('.submissionbutton');
        await driver.wait(until.elementLocated(submitButtonLocator), 10000);
        const submitButton = await driver.findElement(submitButtonLocator);
        await driver.executeScript("arguments[0].scrollIntoView(true);", submitButton);
        await driver.wait(until.elementIsVisible(submitButton), 10000);
        
        // Optionally, scroll to the button
        const actions = driver.actions();
        await actions.move({ target: submitButton }).perform();
        await driver.sleep(1000);  
        // Click the button
        await submitButton.click();
        // Display the test result for submitting the form on the browser
        await driver.executeScript(`
            let divSubmit = document.createElement('div');
            divSubmit.style.position = 'fixed';
            divSubmit.style.top = '210px';
            divSubmit.style.right = '10px';
            divSubmit.style.backgroundColor = 'green';
            divSubmit.style.color = 'white';
            divSubmit.style.padding = '10px';
            divSubmit.style.zIndex = 10000;
            divSubmit.innerText = 'Test: Form submission - Successful';
            document.body.appendChild(divSubmit);
        `);
        await driver.wait(until.elementLocated(By.css('.please-wait')));
        await driver.executeScript(`
        let divSpinner = document.createElement('div');
        divSpinner.style.position = 'fixed';
        divSpinner.style.top = '260px';
        divSpinner.style.right = '10px';
        divSpinner.style.backgroundColor = 'green';
        divSpinner.style.color = 'white';
        divSpinner.style.padding = '10px';
        divSpinner.style.zIndex = 10000;
        divSpinner.innerText = 'Test: Spinner - Rendered';
        document.body.appendChild(divSpinner);
    `);
    const pacmanLoaderLocator = By.css('[data-testid="loader"]');
    await driver.wait(until.elementLocated(pacmanLoaderLocator), 10000);
    const pacmanLoaderElement = await driver.findElement(pacmanLoaderLocator);
    
    // Hover over the spinner
    await driver.actions({ bridge: true }).move({ origin: pacmanLoaderElement }).perform();

    // Wait for the "Play Game" button to appear using XPath
    const playGameButtonLocator = By.css('[data-testid="playbutton"]');
    await driver.wait(until.elementLocated(playGameButtonLocator), 20000);
    const playGameButton = await driver.findElement(playGameButtonLocator);
    
    // Click the "Play Game" button
    await playGameButton.click();    

    // Display the test result for the "Play Game" button appearance
    await driver.executeScript(`
        let divPlayGame = document.createElement('div');
        divPlayGame.style.position = 'fixed';
        divPlayGame.style.top = '310px';
        divPlayGame.style.right = '10px';
        divPlayGame.style.backgroundColor = 'green';
        divPlayGame.style.color = 'white';
        divPlayGame.style.padding = '10px';
        divPlayGame.style.zIndex = 10000;
        divPlayGame.innerText = 'Test: Play Game button - Appeared';
        document.body.appendChild(divPlayGame);
    `);
    await driver.executeScript(`
        let summaryDiv = document.createElement('div');
        summaryDiv.style.position = 'fixed';
        summaryDiv.style.top = '360px';
        summaryDiv.style.right = '10px';
        summaryDiv.style.backgroundColor = 'blue';
        summaryDiv.style.color = 'white';
        summaryDiv.style.padding = '10px';
        summaryDiv.style.zIndex = 10000;
        summaryDiv.innerText = 'Test Summary:\\n\\n' +
            '1. Open and verify title - PASSED\\n' +
            '2. Hover over start button - Hover effect displayed\\n' +
            '3. Submission Form - Rendered\\n' +
            '4. Form submission - Successful\\n' +
            '5. Spinner - Rendered\\n' +
            '6. Play Game button - Appeared';
        document.body.appendChild(summaryDiv);

        // Wait for 10 seconds before closing the page
        setTimeout(() => {
            window.close();
        }, 10000);
    `);


    } catch (error) {
        console.error("Error within Selenium script:", error.message);
        throw error;  
    } finally {
        setTimeout(() => {
            driver.quit();
        }, 10000);
    }
}

module.exports = openLink;