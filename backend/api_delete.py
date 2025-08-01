import cookies

def cookies_clear(self):
    name = self.headers.get('Cookie-Name', '')
    headers = cookies.cookie_clear(name)
    for header in headers:
        self.send_header(*header)
    self.end_headers()
    return