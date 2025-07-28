from http.server import SimpleHTTPRequestHandler
import urllib.parse
from pathlib import Path
import datetime

class ApiEndpoints():
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

class Handler(SimpleHTTPRequestHandler, ApiEndpoints):
    def do_POST(self):
        if self.path == "/message/send":
            self.message_send()
            return

        # fallback to default handler
        return super().do_POST()
