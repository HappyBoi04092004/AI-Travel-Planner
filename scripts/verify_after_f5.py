import os
import time
from playwright.sync_api import sync_playwright

output_dir = r'C:\Users\Admin\.gemini\antigravity\brain\bd277f97-2604-4468-8980-0e9192e06c9d'

with sync_playwright() as p:
    browser = p.chromium.launch(channel='msedge', headless=True)
    page = browser.new_page(viewport={'width': 1400, 'height': 900})
    
    print('Navigating to http://localhost:3000...')
    page.goto('http://localhost:3000', wait_until='networkidle', timeout=15000)
    
    print('Executing F5 Reload as requested by user...')
    page.reload(wait_until='networkidle')
    page.wait_for_timeout(1500)
    
    # 1. Capture Step 1 after F5
    p1 = os.path.join(output_dir, 'after_f5_step1.png')
    page.screenshot(path=p1)
    print(f'Captured Step 1 after F5 -> {p1}')
    
    # 2. Click chatbot button to check chatbot header and text
    chat_btn = page.locator('button', has_text='Hỏi Trợ lý AI Du lịch')
    if chat_btn.count() > 0:
        chat_btn.first.click()
        page.wait_for_timeout(1000)
        p_chat = os.path.join(output_dir, 'after_f5_chat_open.png')
        page.screenshot(path=p_chat)
        print(f'Captured Chat open -> {p_chat}')
        # close chat
        close_btn = page.locator('button[title="Đóng chatbox"]')
        if close_btn.count() > 0:
            close_btn.first.click()
            page.wait_for_timeout(500)
            
    # 3. Step 1 -> Step 2
    step1_next = page.locator('button', has_text='Tiếp tục: Khám phá bản đồ Việt Nam')
    if step1_next.count() > 0:
        step1_next.first.click()
        page.wait_for_timeout(2000)
        p2 = os.path.join(output_dir, 'after_f5_step2.png')
        page.screenshot(path=p2)
        print(f'Captured Step 2 -> {p2}')
        
    # 4. Step 2 -> Step 3
    step2_next = page.locator('button', has_text='Bước 3: Khám phá ẩm thực & văn hóa')
    if step2_next.count() > 0:
        step2_next.first.click()
        page.wait_for_timeout(2000)
        p3 = os.path.join(output_dir, 'after_f5_step3.png')
        page.screenshot(path=p3)
        print(f'Captured Step 3 -> {p3}')

    browser.close()
    print('All verifications finished!')
