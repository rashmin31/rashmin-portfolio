# API Specification — Rashmin Bhanderi Portfolio

## Base URL
- Development: http://localhost:3000/api
- Production: https://rashmin.vercel.app/api

## Authentication
None required. This is a public portfolio site.

## Endpoints

### Contact Form

#### POST /contact
**Purpose:** Server-side validation of contact form data before EmailJS send
**Auth required:** No

**Request Body:**
```json
{
  "name": "string — sender's full name, required, min 2 chars",
  "email": "string — sender's email address, required, valid email format",
  "subject": "string — message subject, required, min 5 chars",
  "message": "string — message body, required, min 20 chars, max 2000 chars"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Validation passed. Proceed with EmailJS send."
}
```

**Response 400 — Validation Failed:**
```json
{
  "success": false,
  "errors": {
    "name": "string | undefined — error message if field invalid",
    "email": "string | undefined",
    "subject": "string | undefined",
    "message": "string | undefined"
  }
}
```

**Response 405 — Method Not Allowed:**
```json
{
  "success": false,
  "message": "Method not allowed. Use POST."
}
```

**Response 500 — Server Error:**
```json
{
  "success": false,
  "message": "Internal server error."
}
```

**Validation Rules:**
- name: required, string, 2-100 characters
- email: required, valid email format (RFC 5322)
- subject: required, string, 5-150 characters
- message: required, string, 20-2000 characters
- All fields: strip HTML tags to prevent injection

**Notes:**
This endpoint does NOT send the email. It only validates.
The actual EmailJS send happens client-side after this endpoint returns 200.
This pattern keeps EmailJS credentials client-side (as designed by EmailJS)
while adding server-side input validation.