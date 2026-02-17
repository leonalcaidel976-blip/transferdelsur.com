#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime

class TransferDelSurAPITester:
    def __init__(self, base_url="https://telegram-bot-backup.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.reservation_id = None

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.api_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}
        if self.token:
            headers['Authorization'] = f'Bearer {self.token}'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PATCH':
                response = requests.patch(url, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    return success, response.json()
                except:
                    return success, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")

            return success, {}

        except requests.exceptions.RequestException as e:
            print(f"❌ Failed - Network Error: {str(e)}")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_endpoints(self):
        """Test basic health endpoints"""
        print("\n" + "="*50)
        print("TESTING HEALTH ENDPOINTS")
        print("="*50)
        
        self.run_test("API Root", "GET", "", 200)
        self.run_test("Health Check", "GET", "health", 200)

    def test_admin_login(self):
        """Test admin authentication"""
        print("\n" + "="*50)
        print("TESTING ADMIN AUTHENTICATION")
        print("="*50)
        
        # Test with correct credentials
        success, response = self.run_test(
            "Admin Login (Correct)",
            "POST",
            "admin/login",
            200,
            data={"email": "admin@transferdelsur.es", "password": "admin123"}
        )
        
        if success and 'token' in response:
            self.token = response['token']
            print(f"✅ Token obtained: {self.token[:20]}...")
            return True
        
        # Test with wrong credentials
        self.run_test(
            "Admin Login (Wrong)",
            "POST", 
            "admin/login",
            401,
            data={"email": "wrong@email.com", "password": "wrong"}
        )
        
        return False

    def test_reservation_flow(self):
        """Test complete reservation workflow"""
        print("\n" + "="*50)
        print("TESTING RESERVATION SYSTEM")
        print("="*50)
        
        # Test creating reservations for all 3 types
        reservation_types = ["aeropuerto", "por_horas", "tours"]
        
        for service_type in reservation_types:
            success, response = self.run_test(
                f"Create {service_type} Reservation",
                "POST",
                "reservations",
                200,
                data={
                    "service_type": service_type,
                    "pickup_location": "Test Pickup Location",
                    "destination": "Marbella Centro", 
                    "date": "2024-12-31",
                    "time": "10:30",
                    "passengers": 2,
                    "luggage": 1,
                    "name": "Test User",
                    "email": "test@example.com",
                    "phone": "+34600000000",
                    "notes": "Test reservation"
                }
            )
            
            if success and 'id' in response and not self.reservation_id:
                self.reservation_id = response['id']
                print(f"✅ Reservation ID saved: {self.reservation_id}")

    def test_admin_reservations(self):
        """Test admin reservation management"""
        print("\n" + "="*50)
        print("TESTING ADMIN RESERVATION MANAGEMENT")
        print("="*50)
        
        if not self.token:
            print("❌ No admin token available, skipping reservation management tests")
            return
            
        # Get all reservations
        self.run_test("Get Reservations", "GET", "reservations", 200)
        
        # Get admin stats
        self.run_test("Get Admin Stats", "GET", "admin/stats", 200)
        
        # Update reservation status if we have a reservation ID
        if self.reservation_id:
            success, _ = self.run_test(
                "Update Reservation Status",
                "PATCH",
                f"reservations/{self.reservation_id}/status?status=confirmada",
                200
            )
            
            # Delete reservation for cleanup
            self.run_test(
                "Delete Reservation", 
                "DELETE",
                f"reservations/{self.reservation_id}",
                200
            )

    def test_contact_flow(self):
        """Test contact form functionality"""
        print("\n" + "="*50)
        print("TESTING CONTACT SYSTEM")
        print("="*50)
        
        # Create contact message
        success, response = self.run_test(
            "Submit Contact Form",
            "POST",
            "contact",
            200,
            data={
                "name": "Test Contact",
                "email": "contact@test.com", 
                "phone": "+34600000000",
                "subject": "Test Subject",
                "message": "This is a test contact message"
            }
        )
        
        contact_id = None
        if success and 'id' in response:
            contact_id = response['id']
        
        # Get contacts (admin only)
        if self.token:
            self.run_test("Get Contacts", "GET", "contacts", 200)
            
            if contact_id:
                # Mark as read
                self.run_test(
                    "Mark Contact Read",
                    "PATCH",
                    f"contacts/{contact_id}/read",
                    200
                )
                
                # Delete contact for cleanup
                self.run_test(
                    "Delete Contact",
                    "DELETE", 
                    f"contacts/{contact_id}",
                    200
                )

    def print_summary(self):
        """Print test summary"""
        print("\n" + "="*50)
        print("TEST SUMMARY")
        print("="*50)
        print(f"Total Tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed}")
        print(f"Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run*100):.1f}%")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return True
        else:
            print("⚠️  Some tests failed!")
            return False

def main():
    print("🚗 Transfer del Sur API Testing")
    print("="*50)
    
    tester = TransferDelSurAPITester()
    
    # Run all test suites
    tester.test_health_endpoints()
    admin_success = tester.test_admin_login()
    tester.test_reservation_flow()
    
    if admin_success:
        tester.test_admin_reservations()
        tester.test_contact_flow()
    else:
        print("⚠️  Skipping admin-only tests due to login failure")
    
    # Print final summary
    all_passed = tester.print_summary()
    
    return 0 if all_passed else 1

if __name__ == "__main__":
    sys.exit(main())