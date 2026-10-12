#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${BASE_URL:-https://www.vivancedata.com}"
CANONICAL_BASE_URL="${CANONICAL_BASE_URL:-https://vivancedata.com}"
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

checks=0
failures=0
suspended=0

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
    if [[ "$code" == "402" ]]; then
      # 402 DEPLOYMENT_DISABLED is the whole Vercel team suspended for billing,
      # not this deploy: 2026-09-20 to 10-02 every site served it for 12 days.
      suspended=1
    fi
  fi
}

run_content_check() {
  local name="$1"
  local file="$2"
  local pattern="$3"
  local grep_flags="${4:--q}"

  checks=$((checks + 1))
  if grep "$grep_flags" "$pattern" "$file"; then
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
# Assert the brand, not the tagline: the tagline is copy that changes with
# repositioning (Aug 9 it became "AI for construction, HVAC, logistics and
# manufacturing" and this check cried wolf hourly for 10 days). The check
# exists to catch a wrong/empty deploy, and the brand in the <title> does that.
# Match the brand case-insensitively: #85 (Sep 3) recased "VivanceData" to
# "Vivancedata" and this check failed hourly for 17 days over the one letter.
run_content_check "Homepage title carries the brand" "$TMP_DIR/home.html" "<title>vivancedata" "-qi"

run_status_check "Blog index responds" "GET" "$BASE_URL/blog" "200" "$TMP_DIR/blog.html"
# Brand in the <title>, for the same reason as the homepage: this asserted the
# heading "AI Insights Blog", which became "Notes from the work", so it would
# have failed hourly against a healthy site.
run_content_check "Blog index title carries the brand" "$TMP_DIR/blog.html" "<title>[^<]*vivancedata" "-qi"

run_status_check "Contact page responds" "GET" "$BASE_URL/contact" "200" "$TMP_DIR/contact.html"
# The contact page's title is copy too ("Contact Us" became "Book a call" in
# #85). Assert the brand in the <title> and that the form actually rendered.
run_content_check "Contact page title carries the brand" "$TMP_DIR/contact.html" "<title>[^<]*vivancedata" "-qi"
run_content_check "Contact page renders the contact form" "$TMP_DIR/contact.html" 'aria-label="Contact form"' 

run_status_check "robots.txt responds" "GET" "$BASE_URL/robots.txt" "200" "$TMP_DIR/robots.txt"
run_content_check "robots.txt protects API path" "$TMP_DIR/robots.txt" "Disallow: /api/"

run_status_check "sitemap.xml responds" "GET" "$BASE_URL/sitemap.xml" "200" "$TMP_DIR/sitemap.xml"
run_content_check "sitemap.xml includes blog URL" "$TMP_DIR/sitemap.xml" "<loc>https://vivancedata.com/blog</loc>"

run_status_check "Contact API GET returns method not allowed" "GET" "$BASE_URL/api/contact" "405" "$TMP_DIR/api-contact-get.json"
run_status_check "Contact API POST validation triggers on empty payload" "POST" "$BASE_URL/api/contact" "400" "$TMP_DIR/api-contact-post.json" "{}"
# The validation message is copy ("Missing required fields" became "Some
# required fields are still empty." in #114). Assert the error contract: a JSON
# body with a non-empty "error" string.
run_content_check "Contact API POST returns a JSON error message" "$TMP_DIR/api-contact-post.json" '"error":"[^"]'

# --- Can a lead actually land? -------------------------------------------
# Every check above passed while no lead could reach anyone: production had no
# email provider, so the form answered 503 "please email info@vivancedata.com",
# and vivancedata.com had no MX record, so that email bounced. A page that
# loads is not a practice that can be contacted.
run_status_check "Contact form can deliver (email provider configured)" "GET" "$BASE_URL/api/health/email" "200" "$TMP_DIR/health-email.json"

checks=$((checks + 1))
mx_domain="${CANONICAL_BASE_URL#https://}"
# DNS-over-HTTPS rather than dig: curl is the one tool every runner has. Match
# type 15 inside "Answer" only: the echoed "Question" carries type 15 as well,
# so a bare match passes for a domain with no MX at all.
if curl -sS "https://dns.google/resolve?name=${mx_domain}&type=MX" | grep -q '"Answer": *\[[^]]*"type": *15'; then
  pass "Inbox exists: ${mx_domain} has an MX record (info@ can receive)"
else
  fail "Inbox exists: ${mx_domain} has NO MX record, so mail to info@${mx_domain} bounces"
fi


echo "Completed $checks production smoke checks."
if [[ "$failures" -gt 0 ]]; then
  echo "Result: $failures check(s) failed."
  if [[ "$suspended" -eq 1 ]]; then
    echo "HTTP 402: the Vercel team is suspended (billing), not this deploy. Fix the payment method; every site on the team is down."
  fi
  exit 1
fi

echo "Result: all checks passed."
