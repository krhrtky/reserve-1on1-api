import { Page } from 'puppeteer'
import { MailTemplate } from './types'

export const send: (
  page: Page,
  template: MailTemplate
) => Promise<void> = async (page, template) => {
  page.goto('https://mail.google.com/mail/u/0/?tab=wm&ogbl#inbox', {
    waitUntil: 'domcontentloaded'
  })
  await page.waitForSelector('div[role="button"][gh="cm"]')
  await page.click('div[role="button"][gh="cm"]')

  await page.waitForSelector('textarea[name="to"]')
  await page.type('textarea[name="to"]', template.to)
  await page.type('input[name="subjectbox"]', template.subject)
  await page.type('div[role="textbox"]', template.body)

  await page.click('div[role="button"][data-tooltip^="送信"]')
  await page.screenshot({ path: 'send.png' })
  await page.waitFor(2000)
}
