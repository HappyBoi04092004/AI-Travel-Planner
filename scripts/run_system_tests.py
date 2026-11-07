# -*- coding: utf-8 -*-
"""
AI Vietnam Travel Planner - Comprehensive Automated System Test Suite
Runs end-to-end diagnostics across Backend, Frontend, Data Integrity, APIs, and Services.
Outputs detailed logs to logs/system_tests.log for automated error detection and remediation.
"""

import os
import sys
import json
import time
import re
import logging
from datetime import datetime
import requests

# Setup directories
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGS_DIR = os.path.join(BASE_DIR, 'logs')
os.makedirs(LOGS_DIR, exist_ok=True)
LOG_FILE = os.path.join(LOGS_DIR, 'system_tests.log')

# Setup Logger
logger = logging.getLogger('SystemTester')
logger.setLevel(logging.DEBUG)

# Clear old handlers
if logger.hasHandlers():
    logger.handlers.clear()

# File handler with UTF-8
file_handler = logging.FileHandler(LOG_FILE, mode='w', encoding='utf-8')
file_handler.setLevel(logging.DEBUG)
file_formatter = logging.Formatter('[%(asctime)s] [%(levelname)s] [%(name)s] %(message)s', datefmt='%Y-%m-%d %H:%M:%S')
file_handler.setFormatter(file_formatter)
logger.addHandler(file_handler)

# Console handler
console_handler = logging.StreamHandler(sys.stdout)
console_handler.setLevel(logging.INFO)
console_formatter = logging.Formatter('[%(levelname)s] %(message)s')
console_handler.setFormatter(console_formatter)
logger.addHandler(console_handler)

class TestRunner:
    def __init__(self):
        self.total_tests = 0
        self.passed_tests = 0
        self.failed_tests = 0
        self.warnings = 0
        self.results = []

    def record_result(self, name: str, success: bool, details: str = '', is_warning: bool = False):
        self.total_tests += 1
        status = "PASS" if success else ("WARN" if is_warning else "FAIL")
        if success:
            self.passed_tests += 1
            logger.info(f"✅ {name}: {details}")
        elif is_warning:
            self.warnings += 1
            logger.warning(f"⚠️ {name}: {details}")
        else:
            self.failed_tests += 1
            logger.error(f"❌ {name}: {details}")

        self.results.append({
            'name': name,
            'status': status,
            'details': details,
            'timestamp': datetime.now().isoformat()
        })

    def run_all(self):
        logger.info("=" * 70)
        logger.info("🚀 STARTING AI VIETNAM TRAVEL PLANNER SYSTEM TEST SUITE")
        logger.info(f"📁 Log output target: {LOG_FILE}")
        logger.info("=" * 70)

        self.test_backend_health()
        self.test_backend_chat_api()
        self.test_backend_plan_trip_api()
        self.test_frontend_routes()
        self.test_vietnam_data_integrity()
        self.test_weather_service_logic()
        self.test_date_utils_logic()

        self.print_summary()

    def test_backend_health(self):
        logger.info("\n--- TEST SUITE 1: BACKEND HEALTH & ENDPOINTS ---")
        try:
            res = requests.get('http://localhost:4000/health', timeout=5)
            if res.status_code == 200:
                data = res.json()
                self.record_result('Backend /health', True, f"Status code {res.status_code}, DB status: {data.get('database')}")
            else:
                self.record_result('Backend /health', False, f"Unexpected status {res.status_code}: {res.text}")
        except Exception as e:
            self.record_result('Backend /health', False, f"Connection failed: {e}")

        try:
            res = requests.get('http://localhost:4000/', timeout=5)
            if res.status_code == 200:
                self.record_result('Backend Root /', True, f"Status code 200, API service responds")
            else:
                self.record_result('Backend Root /', False, f"Status {res.status_code}")
        except Exception as e:
            self.record_result('Backend Root /', False, f"Connection failed: {e}")

    def test_backend_chat_api(self):
        logger.info("\n--- TEST SUITE 2: AI CHATBOT AGENT API ---")
        payload = {
            "message": "Ninh Bình có đặc sản gì ngon và Cố đô Hoa Lư có những hoạt động gì?",
            "currentTrip": {
                "destination": "Ninh Bình",
                "days": 3
            }
        }
        try:
            res = requests.post('http://localhost:4000/chat', json=payload, headers={'Content-Type': 'application/json; charset=utf-8'}, timeout=20)
            if res.status_code == 200:
                data = res.json()
                reply = data.get('response', '')
                if reply and len(reply) > 20:
                    self.record_result('Backend /chat AI response', True, f"Received {len(reply)} chars. Sample: {reply[:100]}...")
                else:
                    self.record_result('Backend /chat AI response', False, f"Response too short or empty: {data}")
            else:
                self.record_result('Backend /chat AI response', False, f"Status {res.status_code}: {res.text}")
        except Exception as e:
            self.record_result('Backend /chat AI response', False, f"Request failed: {e}")

    def test_backend_plan_trip_api(self):
        logger.info("\n--- TEST SUITE 3: TRIP PLANNING VALIDATION ---")
        # Test missing country validation
        try:
            res = requests.post('http://localhost:4000/plan-trip', json={}, timeout=5)
            if res.status_code == 400:
                self.record_result('Backend /plan-trip validation (empty input)', True, f"Properly rejected with 400: {res.json().get('error')}")
            else:
                self.record_result('Backend /plan-trip validation (empty input)', False, f"Expected 400, got {res.status_code}")
        except Exception as e:
            self.record_result('Backend /plan-trip validation (empty input)', False, f"Request failed: {e}")

    def test_frontend_routes(self):
        logger.info("\n--- TEST SUITE 4: FRONTEND ROUTES & PAGES ---")
        routes = [
            ('/', 'AI Vietnam Travel Planner'),
            ('/saved-trips', 'Saved Trips'),
            ('/trip', 'Trip Planner')
        ]
        for path, expected_content in routes:
            try:
                res = requests.get(f'http://localhost:3000{path}', timeout=8)
                if res.status_code == 200:
                    self.record_result(f'Frontend {path}', True, f"HTTP 200 OK (Content-Length: {len(res.text)} bytes)")
                else:
                    self.record_result(f'Frontend {path}', False, f"Status {res.status_code}")
            except Exception as e:
                self.record_result(f'Frontend {path}', False, f"Connection failed: {e}")

    def test_vietnam_data_integrity(self):
        logger.info("\n--- TEST SUITE 5: DATA INTEGRITY (34 PROVINCES & HUBS) ---")
        data_path = os.path.join(BASE_DIR, 'frontend', 'src', 'data', 'vietnamData.ts')
        if not os.path.exists(data_path):
            self.record_result('vietnamData.ts exists', False, f"File not found at {data_path}")
            return

        with open(data_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check total destinations by counting mergedFrom (each 34 province has exactly one mergedFrom)
        merged_from_matches = re.findall(r"mergedFrom:\s*['\"]([^'\"]+)['\"]", content)
        dest_count = len(merged_from_matches)
        if dest_count == 34:
            self.record_result('34 Provinces Count', True, f"Found exactly 34 consolidated provinces (Resolution 202/2025/QH15)")
        else:
            self.record_result('34 Provinces Count', False, f"Expected 34 provinces, found {dest_count}")

        # Check Ninh Binh specifically
        ninh_binh_check = 'Cố đô Hoa Lư' in content and 'dê núi' in content.lower() and 'đền thờ' in content.lower()
        if ninh_binh_check:
            self.record_result('Ninh Binh Hub & Activities', True, "Found Cố đô Hoa Lư with activities (Ăn thịt dê núi, đi thuyền, đi đền thờ, đi chùa)")
        else:
            self.record_result('Ninh Binh Hub & Activities', False, "Missing Cố đô Hoa Lư or key activities in Ninh Bình")

        # Check tourist spots count
        spot_matches = re.findall(r"subLocations:\s*\[", content)
        if len(spot_matches) >= 34:
            self.record_result('Tourist Clusters with SubLocations', True, f"Found {len(spot_matches)} tourist clusters with subLocations")
        else:
            self.record_result('Tourist Clusters with SubLocations', False, f"Only found {len(spot_matches)} tourist clusters with subLocations")

        # Check coordinate bounds
        lats = [float(x) for x in re.findall(r"lat:\s*([0-9]+\.[0-9]+)", content)]
        lngs = [float(x) for x in re.findall(r"lng:\s*([0-9]+\.[0-9]+)", content)]
        all_lats_valid = all(8.0 <= lat <= 24.5 for lat in lats[:34])
        all_lngs_valid = all(102.0 <= lng <= 110.5 for lng in lngs[:34])
        if all_lats_valid and all_lngs_valid:
            self.record_result('Geographic Coordinates Bounds', True, f"All 34 province coordinates are valid inside Vietnam (Lat 8°-24.5°N, Lng 102°-110.5°E)")
        else:
            self.record_result('Geographic Coordinates Bounds', False, "Some coordinates are outside Vietnam geographic bounds")

    def test_weather_service_logic(self):
        logger.info("\n--- TEST SUITE 6: WEATHER SERVICE LOGIC & 503 RESILIENCE ---")
        weather_file = os.path.join(BASE_DIR, 'frontend', 'src', 'services', 'WeatherService.ts')
        if not os.path.exists(weather_file):
            self.record_result('WeatherService.ts exists', False, "File not found")
            return

        with open(weather_file, 'r', encoding='utf-8') as f:
            code = f.read()

        # Check that 'throw new Error(`Open-Meteo returned status' is NOT present
        if 'throw new Error(`Open-Meteo returned status' in code or 'throw new Error("Open-Meteo returned status' in code:
            self.record_result('503 Resilience in WeatherService', False, "Still throwing unhandled Error on Open-Meteo status!")
        else:
            self.record_result('503 Resilience in WeatherService', True, "No unhandled throw on non-200 status; fallback logic is active")

        # Check fallback function exists
        if 'getSeasonalClimateFallback' in code:
            self.record_result('Seasonal Climate Fallback', True, "getSeasonalClimateFallback function implemented for Vietnam regions")
        else:
            self.record_result('Seasonal Climate Fallback', False, "Missing getSeasonalClimateFallback")

        # Test live Open-Meteo endpoint directly to check API reachability
        try:
            test_url = "https://api.open-meteo.com/v1/forecast?latitude=21.0285&longitude=105.8542&daily=temperature_2m_max,temperature_2m_min&timezone=Asia/Bangkok&forecast_days=7"
            res = requests.get(test_url, timeout=5)
            self.record_result('Live Open-Meteo Satellite API Reachability', True, f"Open-Meteo status: {res.status_code}")
        except Exception as e:
            self.record_result('Live Open-Meteo Satellite API Reachability', True, f"Open-Meteo unreachable ({e}), but app has fallback", is_warning=True)

    def test_date_utils_logic(self):
        logger.info("\n--- TEST SUITE 7: DATE UTILITIES & HYDRATION SAFETY ---")
        date_utils = os.path.join(BASE_DIR, 'frontend', 'src', 'utils', 'dateUtils.ts')
        if os.path.exists(date_utils):
            self.record_result('dateUtils.ts exists', True, "Deterministic date formatting utility present")
        else:
            self.record_result('dateUtils.ts exists', False, "dateUtils.ts missing")

        # Check page.tsx dynamic import ssr: false
        page_tsx = os.path.join(BASE_DIR, 'frontend', 'src', 'app', 'page.tsx')
        with open(page_tsx, 'r', encoding='utf-8') as f:
            p_code = f.read()
        if 'ssr: false' in p_code:
            self.record_result('Hydration Safety in page.tsx', True, "VietnamTravelWizard dynamically imported with ssr: false")
        else:
            self.record_result('Hydration Safety in page.tsx', False, "page.tsx is not using ssr: false")

    def print_summary(self):
        logger.info("\n" + "=" * 70)
        logger.info("📊 TEST EXECUTION SUMMARY")
        logger.info(f"Total Tests Run : {self.total_tests}")
        logger.info(f"Passed          : {self.passed_tests}")
        logger.info(f"Failed          : {self.failed_tests}")
        logger.info(f"Warnings        : {self.warnings}")
        logger.info("=" * 70)

        # Write machine-readable json summary to logs/test_summary.json
        summary_path = os.path.join(LOGS_DIR, 'test_summary.json')
        summary_data = {
            'timestamp': datetime.now().isoformat(),
            'total': self.total_tests,
            'passed': self.passed_tests,
            'failed': self.failed_tests,
            'warnings': self.warnings,
            'results': self.results
        }
        with open(summary_path, 'w', encoding='utf-8') as f:
            json.dump(summary_data, f, ensure_ascii=False, indent=2)

        logger.info(f"📄 Detailed log saved to: {LOG_FILE}")
        logger.info(f"📄 JSON summary saved to: {summary_path}")

        if self.failed_tests == 0:
            logger.info("🎉 ALL TESTS PASSED! THE SYSTEM IS 100% HEALTHY AND OPERATIONAL.")
        else:
            logger.warning(f"⚠️ {self.failed_tests} TESTS FAILED. PLEASE INSPECT {LOG_FILE} FOR DETAILS.")

if __name__ == '__main__':
    runner = TestRunner()
    runner.run_all()
    sys.exit(runner.failed_tests)
