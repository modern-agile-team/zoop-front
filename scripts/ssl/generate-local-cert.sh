#!/usr/bin/env bash
set -euo pipefail

# Generate a local self-signed certificate for HTTPS dev (localhost)
# Requires: openssl

ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
SSL_DIR="$ROOT_DIR/.ssl"
KEY_FILE="$SSL_DIR/localhost.key"
CERT_FILE="$SSL_DIR/localhost.crt"

mkdir -p "$SSL_DIR"

echo "Generating localhost development certificate in $SSL_DIR"

# Create an OpenSSL config with SAN for localhost
OPENSSL_CNF="$SSL_DIR/localhost.cnf"
cat > "$OPENSSL_CNF" << 'EOF'
[req]
distinguished_name = req_distinguished_name
x509_extensions = v3_req
prompt = no

[req_distinguished_name]
C = KR
ST = Local
L = Local
O = Dev
OU = Dev
CN = localhost

[v3_req]
subjectAltName = @alt_names
basicConstraints = CA:false
keyUsage = digitalSignature, keyEncipherment
extendedKeyUsage = serverAuth

[alt_names]
DNS.1 = localhost
IP.1 = 127.0.0.1
IP.2 = ::1
EOF

# Generate key and cert (valid 825 days similar to mkcert default)
openssl req -x509 -nodes -days 825 \
  -newkey rsa:2048 \
  -keyout "$KEY_FILE" \
  -out "$CERT_FILE" \
  -config "$OPENSSL_CNF"

echo "Created:"
echo "  Key:  $KEY_FILE"
echo "  Cert: $CERT_FILE"
echo "Done. Set VITE_HTTPS=true or run 'yarn dev:https' to use it."

