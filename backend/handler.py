from http.server import SimpleHTTPRequestHandler

from api_delete import cookies_clear
from api_get import cookies_initial_set
from api_post import message_send, blog_comment, blog_comment_reply, blog_like

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, directory=None, **kwargs):
        super().__init__(*args, directory=directory, **kwargs)

    def cookies_initial_set(self):
        return cookies_initial_set(self)

    def cookies_clear(self):
        return cookies_clear(self)

    def message_send(self):
        return message_send(self)

    def blog_comment(self):
        return blog_comment(self)

    def blog_comment_reply(self):
        return blog_comment_reply(self)

    def blog_like(self):
        return blog_like(self)

    # def do_GET(self):
    #     if (
    #         self.path in ["/", "/script.js", "/blog.txt", "/markdown.txt"]
    #         or self.path.startswith("/assets/")
    #         or self.path.startswith("/data/")
    #     ):

    #         if self.path == "/":
    #             self.path = '/index.html'
    #             self.cookies_initial_set()

    #         return super().do_GET()

    #     elif self.path == "/cookies/initial/set":
    #         self.cookies_initial_set()
    #         return

    #     else:# Handle other file requests or return a 404
    #         return self.send_error(404, "Not Found") # If no matching endpoint, send 404

    def do_DELETE(self):
        if self.path == "/cookies/clear":
            self.cookies_clear()
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