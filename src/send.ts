import { Page } from 'puppeteer'
import { MailTemplate } from './types'

export const send: (
  page: Page,
  template: MailTemplate
) => Promise<void> = async (page, template) => {
  page.goto('https://mail.google.com/mail/u/0/?tab=wm&ogbl#inbox', {
    waitUntil: 'domcontentloaded'
  })
  await page.click('div[role="button"][gh="cm"]')
  await page.waitForSelector('#\\:p4')
}
