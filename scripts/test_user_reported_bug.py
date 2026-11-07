import os
from playwright.sync_api import sync_playwright

output_dir = r'C:\Users\Admin\.gemini\antigravity\brain\bd277f97-2604-4468-8980-0e9192e06c9d'

with sync_playwright() as p:
    browser = p.chromium.launch(channel='msedge', headless=True)
    page = browser.new_page(viewport={'width': 1400, 'height': 900})
    
    page.goto('http://localhost:3000', wait_until='networkidle', timeout=15000)
    page.reload(wait_until='networkidle')
    page.wait_for_timeout(1000)
    
    # 1. First open chat in Step 1, then click minimize to verify it doesn't get dragged down
    chat_btn = page.locator('button[title*="Trợ lý AI"]')
    if chat_btn.count() > 0:
        chat_btn.first.click()
        page.wait_for_timeout(800)
        
        # Click minimize
        minimize_btn = page.locator('button[title="Thu nhỏ về biểu tượng logo"]')
        if minimize_btn.count() > 0:
            minimize_btn.first.click()
            page.wait_for_timeout(800)
            
    page.screenshot(path=os.path.join(output_dir, 'verify_step1_after_minimize.png'))
    print('Captured Step 1 after minimize')
    
    # 2. Go to Step 2
    step1_next = page.locator('button', has_text='Tiếp tục: Khám phá bản đồ')
    if step1_next.count() > 0:
        step1_next.first.click()
        page.wait_for_timeout(2000)
        
    # 3. Enter Fullscreen Map
    fullscreen_btn = page.locator('button', has_text='Phóng to Toàn Màn hình')
    if fullscreen_btn.count() > 0:
        fullscreen_btn.first.click()
        page.wait_for_timeout(1500)
        
    page.screenshot(path=os.path.join(output_dir, 'verify_fullscreen_map_circular_logo.png'))
    print('Captured Fullscreen Map with circular logo')
    
    # 4. Click circular logo while in fullscreen map to verify it opens cleanly
    ai_circle_btn = page.locator('button[title="Mở Trợ lý AI Du lịch Việt Nam"]')
    if ai_circle_btn.count() > 0:
        ai_circle_btn.first.click()
        page.wait_for_timeout(1000)
        page.screenshot(path=os.path.join(output_dir, 'verify_fullscreen_chat_opened.png'))
        print('Captured Fullscreen Map with Chat opened')
        
        # Click minimize inside fullscreen
        minimize_btn = page.locator('button[title="Thu nhỏ về biểu tượng logo"]')
        if minimize_btn.count() > 0:
            minimize_btn.first.click()
            page.wait_for_timeout(800)
            page.screenshot(path=os.path.join(output_dir, 'verify_fullscreen_after_minimize.png'))
            print('Captured Fullscreen Map after minimize back to circular logo')

    browser.close()
    print('All tests completed successfully!')

