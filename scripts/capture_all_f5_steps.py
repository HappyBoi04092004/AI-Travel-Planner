import os
from playwright.sync_api import sync_playwright

output_dir = r'C:\Users\Admin\.gemini\antigravity\brain\bd277f97-2604-4468-8980-0e9192e06c9d'

with sync_playwright() as p:
    browser = p.chromium.launch(channel='msedge', headless=True)
    page = browser.new_page(viewport={'width': 1400, 'height': 900})
    
    page.goto('http://localhost:3000', wait_until='networkidle', timeout=15000)
    page.reload(wait_until='networkidle')
    page.wait_for_timeout(1000)
    
    # Step 1 -> Step 2
    page.locator('button', has_text='Tiếp tục: Khám phá bản đồ').first.click()
    page.wait_for_timeout(1500)
    
    # Step 2 -> Step 3
    page.locator('button', has_text='Bước 3: Khám phá ẩm thực').first.click()
    page.wait_for_timeout(1500)
    
    # Step 3 -> Step 4
    page.locator('button', has_text='Tiếp tục: Chọn phương tiện').first.click()
    page.wait_for_timeout(1500)
    page.screenshot(path=os.path.join(output_dir, 'after_f5_step4.png'))
    print('Captured Step 4')
    
    # Step 4 -> Step 5
    page.locator('button', has_text='Tiếp tục: Bản đồ tiện ích').first.click()
    page.wait_for_timeout(1500)
    page.screenshot(path=os.path.join(output_dir, 'after_f5_step5.png'))
    print('Captured Step 5')
    
    # Step 5 -> Step 6
    page.locator('button', has_text='Tiếp tục: Xác nhận chuyến đi').first.click()
    page.wait_for_timeout(1500)
    page.screenshot(path=os.path.join(output_dir, 'after_f5_step6.png'))
    print('Captured Step 6')

    browser.close()
    print('All captures complete!')

