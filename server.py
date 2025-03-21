import http.server
import socketserver
import json

PORT = 8000

class CORSRequestHandler(http.server.SimpleHTTPRequestHandler):
    def send_response(self, code, message=None):
        super().send_response(code, message)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        if self.path == '/mock_api.json':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            with open('mock_api.json', 'rb') as f:
                self.wfile.write(f.read())
        else:
            super().do_GET()

with socketserver.TCPServer(("", PORT), CORSRequestHandler) as httpd:
    print(f"Serving HTTP on port {PORT}...")
    httpd.serve_forever()