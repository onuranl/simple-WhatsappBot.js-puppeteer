'use strict';
const puppeteer = require('puppeteer');

async function main(){
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // Navigates to whatsapp - Gitmek istediğin sitenin linki
    await page.goto("https://web.whatsapp.com/");
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );

    //  Whom do you want to message - Mesajı göndermek istediğin kişinin rehberdeki adı
    const targetName = "Mahmut Abi";

    await page.waitForSelector(`span[title='${targetName}']`);
    await page.waitForTimeout(2000);
    
    await page.click(`span[title='${targetName}']`);
    
    // i observed sometimes "data-tab='6'" can change for everyone , you can do ctrl+shift+ı on website and then check it -
    // site üzerinde ctrl+shift+ı yapıp kontrol edebilirsiniz
    const messagebox = await page.$("div[data-tab='6']");
    await messagebox.focus();  
    
    // Amount of your messages to send - Göndermek istedigin mesaj adeti
    const amountOfMessages = 100;

    for (var i = 0; i < amountOfMessages; i++) {
      await page.evaluate(() => {
        // What do you want to message - Ne mesajı göndermek istiyorsun
        const message = "Ne Mutlu Türküm Diyene !";
        document.execCommand("insertText", false, message);
      });
      await page.click("span[data-testid='send']");
    }
  } catch (error) {
    console.log("error: "+ error);
  }
}

main();