# Set Up

1. Clone the repo.
1. Copy the `.env.example` file into your own `.env` (`cp .env.example .env`)
1. Fill out the `.env` file
1. Install the dependencies (`pnpm install`)
1. Run the scrape script (`pnpm run scrape`)

Results will be outputted as a array to `playwright/results/tweets.json`.

Have fun!

## What it does

Currently this only grabs the tweets of a given user without any accompanying metadata.

## Notes

You have to make sure that your account has the least security possible (i.e. no 2FA, recovery emails etc.). That or you just have to update the login methods
