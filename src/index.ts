import puppeteer, { Browser } from 'puppeteer'
import { MailTemplate, User } from './types'
import { login } from './login'
import { send } from './send'

const user: User = {
  name: process.env.USER_NAME as string,
  password: process.env.PASSWORD as string
}

const template: MailTemplate = {
  to: process.env.TO as string,
  subject: process.env.SUBJECT as string,
  body: process.env.BODY as string
}

const start = async () => {
  let browser: Browser | null = null
  try {
    browser = await puppeteer.launch({
      headless: process.env.ENV === 'production'
    })
    const page = await browser.newPage()

    await login(page, user)
    await send(page, template)
  } catch (e) {
    console.error(e)
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}
;(async () => await start())()
