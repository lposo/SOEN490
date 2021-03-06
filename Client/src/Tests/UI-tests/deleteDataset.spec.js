// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('deleteDataset', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('deleteDataset', async function() {
    await driver.get("http://localhost:4500/")
    await driver.manage().window().setRect(1368, 872)
    await driver.findElement(By.css(".makeStyles-menuButton-4")).click()
    await driver.findElement(By.linkText("Graph")).click()
    {
      const element = await driver.findElement(By.css(".MuiButton-textPrimary:nth-child(3) > .MuiButton-label"))
      await driver.actions({ bridge: true }).moveToElement(element).perform()
    }
    await driver.findElement(By.css(".MuiButton-textPrimary:nth-child(3) > .MuiButton-label")).click()
    {
      const element = await driver.findElement(By.CSS_SELECTOR, "body")
      await driver.actions({ bridge: true }).moveToElement(element, 0, 0).perform()
    }
    await driver.findElement(By.id("datasets")).click()
    {
      const dropdown = await driver.findElement(By.id("datasets"))
      await dropdown.findElement(By.xpath("//option[. = 'Dataset2']")).click()
    }
    await driver.findElement(By.id("datasets")).click()
    await driver.findElement(By.css(".MuiBox-root-26 > .MuiButtonBase-root > .MuiButton-label")).click()
    await driver.findElement(By.id("datasets")).click()
    {
      const dropdown = await driver.findElement(By.id("datasets"))
      await dropdown.findElement(By.xpath("//option[. = 'Dataset3']")).click()
    }
    await driver.findElement(By.id("datasets")).click()
    await driver.findElement(By.css(".MuiBox-root-26 > .MuiButtonBase-root > .MuiButton-label")).click()
  })
})
