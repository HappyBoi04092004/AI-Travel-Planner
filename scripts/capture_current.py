import os
from playwright.sync_api import sync_playwright

output_dir = r'C:\Users\Admin\.gemini\antigravity\brain\bd277f97-2604-4468-8980-0e9192e06c9d'
with sync_playwright() as p:
    browser = p.chromium.launch(channel='msedge', headless=True)
    page = browser.new_page(viewport={'width': 1400, 'height': 900})
    page.goto('http://localhost:3000', wait_until='networkidle', timeout=15000)
    page.reload(wait_until='networkidle')
    page.wait_for_timeout(1000)
    
    # Click chat button
    chat_btn = page.locator('button', has_text='Hỏi Trợ lý AI Du lịch')
    if chat_btn.count() > 0:
        chat_btn.first.click()
    page.wait_for_timeout(1000)
    page.screenshot(path=os.path.join(output_dir, 'current_chat_open.png'))
    print('Captured chat open')
    browser.close()
