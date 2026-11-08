import os
import time
from playwright.sync_api import sync_playwright

output_dir = r'C:\Users\Admin\.gemini\antigravity\brain\bd277f97-2604-4468-8980-0e9192e06c9d'

with sync_playwright() as p:
    browser = p.chromium.launch(channel='msedge', headless=True)
    page = browser.new_page(viewport={'width': 1400, 'height': 900})
    
    page.goto('http://localhost:3000', wait_until='networkidle')
    page.wait_for_timeout(800)
    
    # Click Sign In button in header
    signin_btn = page.locator('button', has_text='Sign In')
    if signin_btn.count() > 0:
        signin_btn.first.click()
        page.wait_for_timeout(600)
        
        # Click Switch to Sign Up
        signup_toggle = page.locator('button', has_text='Đăng ký ngay')
        if signup_toggle.count() > 0:
            signup_toggle.click()
            page.wait_for_timeout(400)
            
            # Type into password
            pass_input = page.locator('input[placeholder*="Ít nhất 6 ký tự"]')
            if pass_input.count() > 0:
                pass_input.fill('Travel@2026')
                page.wait_for_timeout(300)
                
            # Scroll modal container to top to show complete header
            page.evaluate("() => { const modal = document.querySelector('.overflow-y-auto'); if(modal) modal.scrollTop = 0; }")
            page.wait_for_timeout(300)
            
            p_signup = os.path.join(output_dir, 'verify_auth_modal_signup_full.png')
            page.screenshot(path=p_signup)
            print(f'Captured full signup modal -> {p_signup}')

    browser.close()

