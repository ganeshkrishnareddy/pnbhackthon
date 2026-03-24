import os
import re

frontend_dir = r"d:\WebApps\Gamified Eco Education 2\Quantum_Scanner\frontend"
index_file = os.path.join(frontend_dir, "index.html")

with open(index_file, "r", encoding="utf-8") as f:
    html = f.read()

# 1. Update Navigation Links globally
html = html.replace('href="#hero"', 'href="/"')
html = html.replace('href="#why-us"', 'href="/why-us"')
html = html.replace('href="#features"', 'href="/features"')
html = html.replace('href="#about"', 'href="/about"')
html = html.replace('href="#contact"', 'href="/contact"')

# Extract Header + Hero (which will be kept or replaced)
# The head, nav, background, footer, modals etc are common to all pages.
# Let's extract the common parts.

header_match = re.search(r'(.*?)(?=<!-- Hero Section -->)', html, flags=re.DOTALL)
header_part = header_match.group(1) if header_match else ""

# Extract sections
# We'll use regex to grab the entire section including comments
sections = {
    "why-us": re.search(r'(<!-- Why Us Section -->.*?)(?=<!-- Features Section -->)', html, flags=re.DOTALL).group(1),
    "features": re.search(r'(<!-- Features Section -->.*?)(?=<!-- About Section -->)', html, flags=re.DOTALL).group(1),
    "about": re.search(r'(<!-- About Section -->.*?)(?=<!-- Contact Section -->)', html, flags=re.DOTALL).group(1),
    "contact": re.search(r'(<!-- Contact Section -->.*?)(?=<!-- Footer -->)', html, flags=re.DOTALL).group(1),
}

footer_match = re.search(r'(<!-- Footer -->.*)', html, flags=re.DOTALL)
footer_part = footer_match.group(1) if footer_match else ""

# To make the pages look good, we add some padding-top for Sections pages so they don't overlap with the fixed navbar
# We'll wrap the section in a div with formatting.
content_wrapper_open = '\n<div style="padding-top: 100px; min-height: calc(100vh - 300px);">\n'
content_wrapper_close = '\n</div>\n'

for name, content in sections.items():
    page_html = header_part + content_wrapper_open + content + content_wrapper_close + footer_part
    with open(os.path.join(frontend_dir, f"{name}.html"), "w", encoding="utf-8") as f:
        f.write(page_html)

# Now update index.html to remove those sections
# Everything from <!-- Why Us Section --> to <!-- Footer -->
index_html = re.sub(r'<!-- Why Us Section -->.*?<!-- Footer -->', '<!-- Footer -->', html, flags=re.DOTALL)

with open(index_file, "w", encoding="utf-8") as f:
    f.write(index_html)

print("Successfully splitted frontend pages.")
