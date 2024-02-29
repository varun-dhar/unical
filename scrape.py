import asyncio
import dotenv
import scrapers.rmp

if __name__ == '__main__':
	dotenv.load_dotenv()
	asyncio.run(scrapers.rmp.run_scrape())
