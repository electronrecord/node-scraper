const puppeteer = require('puppeteer')
const axios = require('axios')

async function run () {
    try {
        const url = 'https://www.vistaprint.com/business-cards/soft-touch'
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: {width: 1000, height: 1200}
        })
        const page = await browser.newPage()
        await page.goto(url)
        await page.waitForTimeout(3000)
        // await page.click('#button--builder-quantity-dropdown')
        // await page.waitForSelector('#option-100--builder-quantity-dropdown')

        let shapeType = await page.evaluate(() => {
            let el = document.querySelector("#button--on-page-builder-Shape")
            return el ? el.innerText : ""
        })
        console.log(shapeType)
        if (shapeType) {
            const lis = await page.$$('ul#listbox--on-page-builder-Shape li')
            for await(let li of lis) {
                const value = await li.evaluate(el => el.textContent);
                console.log('Shape', value)
                await page.click('#button--on-page-builder-Shape')
                await page.waitForTimeout(2000);

                await li.click()
                let elements = ['100','250', '500','1000','1500', '2000','2500','5000', '10000']
                for await (let elementu of elements) {
                    const element = await page.waitForSelector(`#option-${elementu}--builder-quantity-dropdown`); // select the element
                    const value = await element.evaluate(el => el.textContent);
                    console.log(value)

                    const element1 = await page.waitForSelector(`#option-${elementu}--builder-quantity-dropdown > div > div`); // select the element
                    const value1 = await element1.evaluate(el => el.textContent);
                    console.log(value1)
                }
                await page.waitForTimeout(2000)
            }
        }


        let cornersType = await page.evaluate(() => {
            let el = document.querySelector("#button--on-page-builder-Corners")
            return el ? el.innerText : ""
        })
        if (cornersType) {
            const lis2 = await page.$$('ul#listbox--on-page-builder-Corners li')
            for await(let li of lis2) {
                const value = await li.evaluate(el => el.textContent);
                console.log('Corners', value)

                await page.click('#button--on-page-builder-Corners')
                await page.waitForTimeout(2000);

                await li.click()
                let elements = ['100','250', '500','1000','1500', '2000','2500','5000', '10000']
                for await (let elementu of elements) {
                    const element = await page.waitForSelector(`#option-${elementu}--builder-quantity-dropdown`); // select the element
                    const value = await element.evaluate(el => el.textContent);
                    console.log(value)

                    const element1 = await page.waitForSelector(`#option-${elementu}--builder-quantity-dropdown > div > div`); // select the element
                    const value1 = await element1.evaluate(el => el.textContent);
                    console.log(value1)
                }
                await page.waitForTimeout(2000)
            }
        }


        let thicknessType = await page.evaluate(() => {
            let el = document.querySelector("#button--on-page-builder-Paper\\ Thickness")
            return el ? el.innerText : ""
        })
        if (thicknessType) {
            const lis3 = await page.$$('ul#listbox--on-page-builder-Paper\\ Thickness li')
            for await(let li of lis3) {
                const value = await li.evaluate(el => el.textContent);
                console.log('Thickness', value.replace('Recommended', ''))

                await page.click('#button--on-page-builder-Paper\\ Thickness')
                await page.waitForTimeout(2000);

                await li.click()
                let elements = ['100','250', '500','1000','1500', '2000','2500','5000', '10000']
                for await (let elementu of elements) {
                    const element = await page.waitForSelector(`#option-${elementu}--builder-quantity-dropdown`); // select the element
                    const value = await element.evaluate(el => el.textContent);
                    console.log(value)

                    const element1 = await page.waitForSelector(`#option-${elementu}--builder-quantity-dropdown > div > div`); // select the element
                    const value1 = await element1.evaluate(el => el.textContent);
                    console.log(value1)
                }
                await page.waitForTimeout(2000)
            }


        }

        console.log(!thicknessType && !shapeType && !cornersType)
        if (!thicknessType && !shapeType && !cornersType) {
            console.log('here')
            let elements = ['100','250', '500','1000','1500', '2000','2500','5000', '10000']
            for await (let elementu of elements) {
                const element = await page.waitForSelector(`#option-${elementu}--builder-quantity-dropdown`); // select the element
                const value = await element.evaluate(el => el.textContent);
                console.log(value)

                const element1 = await page.waitForSelector(`#option-${elementu}--builder-quantity-dropdown > div > div`); // select the element
                const value1 = await element1.evaluate(el => el.textContent);
                console.log(value1)
            }
        }




    } catch (e) {
        console.log(e)
    }

}
run()
