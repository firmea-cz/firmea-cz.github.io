from http.server import SimpleHTTPRequestHandler
import urllib.parse
from pathlib import Path
import datetime
import random

import cookies

class ApiEndpoints():
    class Post():
        def message_send(self):
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            fields = urllib.parse.parse_qs(post_data.decode())

            name = fields.get('name', [''])[0]
            email = fields.get('email', [''])[0]
            message = fields.get('message', [''])[0]
            timestamp = datetime.datetime.now().isoformat()

            # Construct path relative to this file for robustness
            data_dir = Path(__file__).parent / "data"
            data_dir.mkdir(exist_ok=True)
            messages_path = data_dir / "messages.txt"

            # Save to file
            with open(messages_path, "a", encoding="utf-8") as f:
                f.write(f"[{timestamp}] {name} <{email}>:\n{message}\n\n")

            # Respond with simple HTML
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write("<html><body><h2>Děkujeme za zprávu!</h2><a href='/'>Zpět na hlavní stránku</a></body></html>".encode("utf-8"))
            return
        
        def blog_comment(self):
            return
        
        def blog_comment_reply(self):
            return
        
        def blog_like(self):
            return

class Handler(SimpleHTTPRequestHandler, ApiEndpoints):
    def do_GET(self):
        if self.path in ["/", "/script.js", "/blog.txt", "/markdown.txt"] or self.path.startswith("/assets/" or "/data/"):

            if self.path == "/":
                self.path = 'index.html'

            return super().do_GET()

        if self.path == "/cookies/initial/set":
            name = "InitialCookie"

            i = 0
            characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
            while i < 10:
                value = value + characters[random.randrange(len(characters)-1)]

            cookies.cookie_create(name, value)
            self.send_response(200, value)
            return

        else:# Handle other file requests or return a 404
            return self.send_error(404, "Not Found") # If no matching endpoint, send 404

    def do_DELETE(self):
        if self.path == "/cookies/clear":
            name = self.headers.get('Cookie-Name', '')
            headers = cookies.cookie_clear(name)
            for header in headers:
                self.send_header(*header)
            self.end_headers()
            return
        
        else:
            return self.send_error(404, "Not Found") # If no matching endpoint, send 404

    def do_POST(self):
        if self.path == "/message/send":
            self.message_send()
            return
        elif self.path == "/blog/comment":
            self.blog_comment()
            return
        elif self.path == "/blog/comment/reply":
            self.blog_comment_reply()
            return
        elif self.path == "/blog/like":
            self.blog_like()
            return
        else:
            return self.send_error(404, "Not Found")  # If no matching endpoint, send 404