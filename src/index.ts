import puppeteer, { Browser } from 'puppeteer'
import { User } from './types'
import { login } from './login'

const user: User = {
  name: process.env.USER_NAME as string,
  password: process.env.PASSWORD as string
}

const start = async () => {
  let browser: Browser | null = null
  try {
    browser = await puppeteer.launch({
      headless: process.env.ENV === 'production'
    })
    const page = await browser.newPage()

    await login(page, user)
  } catch (e) {
    console.error(e)
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}
;(async () => await start())()
