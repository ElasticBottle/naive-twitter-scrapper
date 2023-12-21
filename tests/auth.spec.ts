import { test } from "@playwright/test";
import { writeFileSync } from "fs";

test("scrape", async ({ page }) => {
  console.log("logging user in");
  await page.goto("https://twitter.com/");
  await page.getByTestId("loginButton").click();
  await page.locator("label div").nth(3).click();
  await page
    .getByLabel("Phone, email, or username")
    .fill(process.env.TWITTER_USER_EMAIL ?? "");
  await page.getByLabel("Phone, email, or username").press("Enter");
  await page.getByTestId("ocfEnterTextTextInput").click();
  await page
    .getByTestId("ocfEnterTextTextInput")
    .fill(process.env.TWITTER_USER_NAME ?? "");
  await page.getByTestId("ocfEnterTextTextInput").press("Enter");
  await page
    .getByLabel("Password", { exact: true })
    .fill(process.env.TWITTER_USER_PWD ?? "");
  await page.getByLabel("Password", { exact: true }).press("Enter");
  console.log("successfully logged user in");

  const handle = process.env.TWIITER_HANDLE_TO_SCRAPE ?? "";
  console.log("scrapping twitter user:", handle);
  await page.getByTestId("SearchBox_Search_Input").click();
  await page.getByTestId("SearchBox_Search_Input").fill("0xcygaar");
  await page.getByTestId("TypeaheadUser").click();

  await page.waitForTimeout(5_000);

  let result: Set<string> = new Set();
  const tweetsElement = await page.getByTestId("tweetText");
  const tweets = await tweetsElement.allTextContents();
  tweets.forEach((tweet) => result.add(tweet));

  for (
    let i = 0;
    i < parseInt(process.env.NUMBER_OR_TIMES_TO_SCROLL ?? "45");
    ++i
  ) {
    await page.mouse.wheel(0, 3_000);
    await page.waitForTimeout(1_00);
    const tweetsElement = await page.getByTestId("tweetText");
    const tweets = await tweetsElement.allTextContents();
    tweets.forEach((tweet) => result.add(tweet));
  }

  console.log("result.size", result.size);
  writeFileSync(
    "playwright/.auth/tweets.json",
    JSON.stringify(Array.from(result))
  );
});
