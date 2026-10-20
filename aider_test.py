import re

def text_to_slug(text: str) -> str:
    """Converts text to lowercase hyphenated slugs."""
    return re.sub(r'[^a-zA-Z0-9]+', '-', text).lower().strip('-')

# pytest tests
def test_text_to_slug():
    assert text_to_slug("Hello World") == "hello-world"
    assert text_to_slug("  Leading and trailing spaces  ") == "leading-and-trailing-spaces"
