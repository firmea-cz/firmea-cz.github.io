import cookies
import random

def cookies_initial_set(self):
    # Check if cookie exists
    cookie_header = self.headers.get('Cookie', '')
    if "InitialCookie=" not in cookie_header:
        name = "InitialCookie"
        value = ""

        characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        for _ in range(10):
            value += random.choice(characters)

        headers = cookies.cookie_create(name, value)
        for header in headers:
            self.send_header(*header)
        self.send_response(200, value)
        self.end_headers()
        return

    else:
        self.send_response(400, "Cookie already exists")
        self.end_headers()
    return