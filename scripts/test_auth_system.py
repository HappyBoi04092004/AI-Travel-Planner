import requests
import json
import uuid

BASE_URL = 'http://localhost:4000'

def test_auth():
    print("🚀 TESTING ENHANCED AUTH SYSTEM")
    
    # 1. Health check
    res = requests.get(f"{BASE_URL}/health")
    assert res.status_code == 200, f"Health check failed: {res.text}"
    print("✅ 1. Backend is healthy")

    # 2. Register test user
    uid = uuid.uuid4().hex[:6]
    test_email = f"auth_tester_{uid}@test.vn"
    test_username = f"tester_{uid}"
    test_password = "Password123!"

    reg_payload = {
        "email": test_email,
        "username": test_username,
        "password": test_password
    }
    res = requests.post(f"{BASE_URL}/api/auth/signup", json=reg_payload)
    assert res.status_code == 201, f"Signup failed: {res.text}"
    data = res.json()
    token = data["access_token"]
    user = data["user"]
    print(f"✅ 2. Signup successful for {test_email}, role={user.get('role')}")
    assert user.get("role") == "user", "Default role should be user"

    # 3. Verify token endpoint
    headers = {"Authorization": f"Bearer {token}"}
    res = requests.get(f"{BASE_URL}/api/auth/verify-token", headers=headers)
    assert res.status_code == 200 and res.json().get("valid") is True, f"Verify token failed: {res.text}"
    print("✅ 3. Token verification endpoint works")

    # 4. Refresh token endpoint
    res = requests.post(f"{BASE_URL}/api/auth/refresh", headers=headers)
    assert res.status_code == 200, f"Refresh token failed: {res.text}"
    new_token = res.json()["access_token"]
    print("✅ 4. Refresh token works, received renewed token")

    # 5. Forgot password endpoint
    res = requests.post(f"{BASE_URL}/api/auth/forgot-password", json={"email": test_email})
    assert res.status_code == 200, f"Forgot password failed: {res.text}"
    reset_token = res.json().get("reset_token")
    assert reset_token is not None, "Reset token must be returned in dev"
    print(f"✅ 5. Forgot password generated reset token: {reset_token[:10]}...")

    # 6. Reset password endpoint
    new_password = "NewPassword456@"
    res = requests.post(f"{BASE_URL}/api/auth/reset-password/{reset_token}", json={"password": new_password})
    assert res.status_code == 200, f"Reset password failed: {res.text}"
    print("✅ 6. Reset password succeeded")

    # 7. Login with new password
    login_payload = {
        "email": test_email,
        "password": new_password
    }
    res = requests.post(f"{BASE_URL}/api/auth/login", json=login_payload)
    assert res.status_code == 200, f"Login with new password failed: {res.text}"
    print("✅ 7. Login with newly reset password succeeded")

    # 8. Upload avatar endpoint
    res = requests.post(
        f"{BASE_URL}/api/auth/upload-avatar",
        headers=headers,
        json={"profile_picture": "/logo-con-gai.png"}
    )
    assert res.status_code == 200, f"Upload avatar failed: {res.text}"
    assert res.json()["user"]["profile_picture"] == "/logo-con-gai.png"
    print("✅ 8. Profile avatar updated successfully")

    # 9. Remove avatar endpoint
    res = requests.post(f"{BASE_URL}/api/auth/remove-profile-picture", headers=headers)
    assert res.status_code == 200, f"Remove avatar failed: {res.text}"
    assert res.json()["user"]["profile_picture"] is None
    print("✅ 9. Profile avatar removed successfully")

    print("\n🎉 ALL 9 ENHANCED AUTH TESTS PASSED PERFECTLY!")

if __name__ == "__main__":
    test_auth()
