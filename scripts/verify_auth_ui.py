import os
import time
from playwright.sync_api import sync_playwright

output_dir = r'C:\Users\Admin\.gemini\antigravity\brain\bd277f97-2604-4468-8980-0e9192e06c9d'

with sync_playwright() as p:
    browser = p.chromium.launch(channel='msedge', headless=True)
    context = browser.new_context(viewport={'width': 1400, 'height': 900})
    page = context.new_page()
    
    print('Navigating to http://localhost:3000...')
    page.goto('http://localhost:3000', wait_until='networkidle')
    page.evaluate("() => { localStorage.clear(); sessionStorage.clear(); }")
    page.reload(wait_until='networkidle')
    page.wait_for_timeout(1000)
    
    # 1. Sign In button
    signin_btn = page.locator('button', has_text='Sign In')
    print(f'Found {signin_btn.count()} Sign In buttons')
    if signin_btn.count() > 0:
        signin_btn.first.click()
        page.wait_for_timeout(800)
        p_signin = os.path.join(output_dir, 'verify_auth_modal_signin.png')
        page.screenshot(path=p_signin)
        print(f'Captured Sign In modal -> {p_signin}')
        
        # 2. Switch to Sign Up
        signup_toggle = page.locator('button', has_text='Đăng ký ngay')
        if signup_toggle.count() > 0:
            signup_toggle.click()
            page.wait_for_timeout(600)
            
            # Type into password to trigger strength meter
            pass_input = page.locator('input[placeholder*="Ít nhất 6 ký tự"]')
            if pass_input.count() > 0:
                pass_input.fill('Travel@2026')
                page.wait_for_timeout(400)
            
            p_signup = os.path.join(output_dir, 'verify_auth_modal_signup.png')
            page.screenshot(path=p_signup)
            print(f'Captured Sign Up modal -> {p_signup}')

    browser.close()
    print('Done verifying Auth UI!')
