import puppeteer, { Browser } from 'puppeteer'
import { MailTemplate, User } from './types'
import { login } from './login'
import { send } from './send'

const user: User = {
  name: process.env.USER_NAME as string,
  password: process.env.PASSWORD as string
}

export const start = async ({
  subject,
  mailBody
}: {
  subject: string
  mailBody: string
}) => {
  let browser: Browser | null = null
  try {
    browser = await puppeteer.launch({
      headless: process.env.ENV === 'production'
    })
    const page = await browser.newPage()

    const template: MailTemplate = {
      to: process.env.TO as string,
      subject,
      body: mailBody
    }

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
