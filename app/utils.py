import httpx
from bs4 import BeautifulSoup


async def fetch_title(url: str) -> str:
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            response = await client.get(url, follow_redirects=True)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                if soup.title and soup.title.string:
                    return soup.title.string.strip()
    except Exception as e:
        print(f"Error fetching title: {e}")
    return url  # Если не нашли заголовок, вернем сам URL