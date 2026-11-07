import os
from playwright.sync_api import sync_playwright

output_dir = r'C:\Users\Admin\.gemini\antigravity\brain\bd277f97-2604-4468-8980-0e9192e06c9d'

with sync_playwright() as p:
    browser = p.chromium.launch(channel='msedge', headless=True)
    page = browser.new_page(viewport={'width': 1400, 'height': 900})
    page.goto('http://localhost:3000', wait_until='networkidle', timeout=15000)
    page.wait_for_timeout(1000)

    # Step 1
    page.screenshot(path=os.path.join(output_dir, 'step1_v2.png'))
    print('Captured Step 1')

    # Click continue to Step 2
    page.click('button:has-text("Tiếp tục: Khám phá bản đồ")')
    page.wait_for_timeout(2000)
    page.screenshot(path=os.path.join(output_dir, 'step2_v2.png'))
    print('Captured Step 2')

    # Step 2 -> Step 3
    page.click('button:has-text("Bước 3: Khám phá ẩm thực")')
    page.wait_for_timeout(2000)
    page.screenshot(path=os.path.join(output_dir, 'step3_v2.png'))
    print('Captured Step 3')

    # Step 3 -> Step 4
    page.click('button:has-text("Tiếp tục: Chọn phương tiện")')
    page.wait_for_timeout(1500)
    page.screenshot(path=os.path.join(output_dir, 'step4_v2.png'))
    print('Captured Step 4')

    # Step 4 -> Step 5
    page.click('button:has-text("Tiếp tục: Bản đồ tiện ích")')
    page.wait_for_timeout(1500)
    page.screenshot(path=os.path.join(output_dir, 'step5_v2.png'))
    print('Captured Step 5')

    # Step 5 -> Step 6
    page.click('button:has-text("Tiếp tục: Xác nhận chuyến đi")')
    page.wait_for_timeout(1500)
    page.screenshot(path=os.path.join(output_dir, 'step6_v2.png'))
    print('Captured Step 6')

    # Now open chatbot to see how it looks when opened
    page.click('button[title="Mở Trợ lý AI Du lịch Việt Nam"]')
    page.wait_for_timeout(1000)
    page.screenshot(path=os.path.join(output_dir, 'step6_chatbot_open.png'))
    print('Captured Step 6 with Chatbot Open')

    browser.close()
    print('All captures finished!')
