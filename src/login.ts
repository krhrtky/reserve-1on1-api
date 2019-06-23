import { User } from './types'
import { Page } from 'puppeteer'

export const login: (page: Page, user: User) => Promise<void> = async (
  page,
  user
) => {
  await page.emulate({
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36',
    viewport: {
      width: 1524,
      height: 820,
      deviceScaleFactor: 1,
      isMobile: false,
      hasTouch: false,
      isLandscape: false
    }
  })

  await page.goto('https://accounts.google.com/signin/v2/identifier')
  await page.waitForSelector('#identifierId')

  await page.type('#identifierId', user.name)
  await page.click('#identifierNext')

  await page.waitForSelector('#password input[type="password"]', {
    visible: true
  })
  await page.waitFor(2000)

  await page.evaluate((password: string): string => {
    const passwordFrom = document.querySelector(
      'input[type="password"]'
    ) as HTMLInputElement
    passwordFrom.value = password
    return passwordFrom.value
  }, user.password)

  await page.click('#passwordNext')
  await page.waitFor(2000)

  await page.goto('https://mail.google.com/mail/u/0/?tab=wm&ogbl#inbox')
  await page.waitFor(1000)
}
