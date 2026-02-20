#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-https://www.vivancedata.com}"
CANONICAL_BASE_URL="${CANONICAL_BASE_URL:-https://vivancedata.com}"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

checks=0
failures=0

pass() {
  printf "PASS: %s\n" "$1"
}

fail() {
  printf "FAIL: %s\n" "$1"
  failures=$((failures + 1))
}

run_status_check() {
  local name="$1"
  local method="$2"
  local url="$3"
  local expected_code="$4"
  local output_file="$5"
  local body="${6:-}"

  checks=$((checks + 1))

  local response
  if [[ -n "$body" ]]; then
    response="$(curl -sS -L -X "$method" -H "Content-Type: application/json" --data "$body" -o "$output_file" -w "%{http_code} %{time_total} %{url_effective}" "$url")"
  else
    response="$(curl -sS -L -X "$method" -o "$output_file" -w "%{http_code} %{time_total} %{url_effective}" "$url")"
  fi

  local code time_total effective_url
  read -r code time_total effective_url <<<"$response"

  if [[ "$code" == "$expected_code" ]]; then
    pass "$name (code=$code, time=${time_total}s, effective=$effective_url)"
  else
    fail "$name (expected $expected_code, got $code, effective=$effective_url)"
  fi
}

run_content_check() {
  local name="$1"
  local file="$2"
  local pattern="$3"

  checks=$((checks + 1))
  if grep -q "$pattern" "$file"; then
    pass "$name"
  else
    fail "$name (pattern not found: $pattern)"
  fi
}

run_redirect_check() {
  checks=$((checks + 1))

  local header_file="$TMP_DIR/redirect.headers"
  curl -sS -D "$header_file" -o /dev/null "$CANONICAL_BASE_URL/"

  local status_code
  status_code="$(awk '/^HTTP\// {code=$2} END {print code}' "$header_file")"
  local location
  location="$(awk 'BEGIN{IGNORECASE=1} /^location:/ {print $2}' "$header_file" | tr -d '\r')"

  if [[ "$status_code" =~ ^30[1278]$ && "$location" == https://www.vivancedata.com/* ]]; then
    pass "Canonical domain redirects to www domain (code=$status_code, location=$location)"
    return
  fi

  if [[ "$status_code" == "200" ]]; then
    pass "Canonical domain serves directly without redirect (code=200)"
    return
  fi

  fail "Canonical domain redirect check (code=$status_code, location=$location)"
}

echo "Running production smoke checks against $BASE_URL"

run_redirect_check

run_status_check "Homepage responds" "GET" "$BASE_URL/" "200" "$TMP_DIR/home.html"
run_content_check "Homepage contains expected title" "$TMP_DIR/home.html" "VivanceData - AI Solutions for Modern Businesses"

run_status_check "Blog index responds" "GET" "$BASE_URL/blog" "200" "$TMP_DIR/blog.html"
run_content_check "Blog index contains heading text" "$TMP_DIR/blog.html" "AI Insights Blog"

run_status_check "Contact page responds" "GET" "$BASE_URL/contact" "200" "$TMP_DIR/contact.html"
run_content_check "Contact page contains expected title" "$TMP_DIR/contact.html" "Contact Us - VivanceData"

run_status_check "robots.txt responds" "GET" "$BASE_URL/robots.txt" "200" "$TMP_DIR/robots.txt"
run_content_check "robots.txt protects API path" "$TMP_DIR/robots.txt" "Disallow: /api/"

run_status_check "sitemap.xml responds" "GET" "$BASE_URL/sitemap.xml" "200" "$TMP_DIR/sitemap.xml"
run_content_check "sitemap.xml includes blog URL" "$TMP_DIR/sitemap.xml" "<loc>https://vivancedata.com/blog</loc>"

run_status_check "Contact API GET returns method not allowed" "GET" "$BASE_URL/api/contact" "405" "$TMP_DIR/api-contact-get.json"
run_status_check "Contact API POST validation triggers on empty payload" "POST" "$BASE_URL/api/contact" "400" "$TMP_DIR/api-contact-post.json" "{}"
run_content_check "Contact API POST includes validation message" "$TMP_DIR/api-contact-post.json" "\"Missing required fields\""

echo "Completed $checks production smoke checks."
if [[ "$failures" -gt 0 ]]; then
  echo "Result: $failures check(s) failed."
  exit 1
fi

echo "Result: all checks passed."
