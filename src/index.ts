import puppeteer, { Browser } from 'puppeteer'
import { User } from './types'

const user: User = {
  name: process.env.USER_NAME as string,
  password: process.env.PASSWORD as string
}

const start = async () => {
  let browser: Browser | null = null
  try {
    browser = await puppeteer.launch({
      headless: process.env.ENV === 'production'
      // args: ['--start-fullscreen'],
      // defaultViewport: {
      //   width: 1600,
      //   height: 1000
      // }
    })
    const page = await browser.newPage()
    await page.goto('https://www.google.com/?hl=ja')
    await page.waitForSelector('#gb_70')
    await page.click('#gb_70')
    await page.waitForSelector('#initialView')
    await page.type('#identifierId', user.name)
    const idNextButton = await page.$('#identifierNext')
    await idNextButton!.click()

    await page.waitForSelector('input[type="password"]')
    await page.waitForSelector('#passwordNext')
    await page.type('#password input[type="password"]', user.password)

    await page.evaluate(
      (): void => {
        document.getElementById('#passwordNext')!.click()
      }
    )
    // await page.click('#passwordNext')
    page.waitForResponse('https://www.google.com/?hl=ja')

    await page.screenshot({ path: 'next.png' })
  } catch (e) {
    console.error(e)
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}
;(async () => await start())()
