# Global Honeypot

Client-side form validation script for Webflow sites. Blocks free/personal email addresses and includes a hidden input trap for bot detection. Applies automatically to all Webflow forms on the page and can be toggled on/off via a Webflow CMS field.

## Features

- **Business email enforcement** — Rejects submissions from free email providers (Gmail, Yahoo, Outlook, etc.) including common misspellings
- **Bot detection** — Hidden `input-15` field silently blocks submission when filled by bots
- **CMS-driven toggle** — Script only runs when a CMS "form validation" toggle is enabled
- **Global application** — Automatically initializes on every `.w-form` on the page

## Webflow Setup

### 1. CMS Toggle

Add a **Switch** field called "Form Validation" to your CMS collection. Bind it as a custom attribute on a page wrapper element:

- **Attribute name:** `data-form-validation`
- **Attribute value:** CMS field (outputs `"true"` or `"false"`)

### 2. Form Elements

For each form, add the following custom attributes in the Webflow Designer:

| Element | Custom Attribute |
|---|---|
| Hidden input (bot trap) | `data-input-15` |
| Error message div | `data-error-message` |

The email input and submit button are detected automatically by type (`input[type="email"]` and `input[type="submit"]` / `button[type="submit"]`).

### 3. Embed the Script

Add `global-code.js` as custom code in your Webflow project settings (before `</body>`) or inside a page-level embed block, wrapped in `<script>` tags:

```html
<script>
  // paste contents of global-code.js here
</script>
```

## Blocked Domains

gmail, yahoo, ymail, hotmail, outlook, aol, icloud, protonmail, proton, mail, gmx, zoho, tutanota, fastmail, yandex, live, msn

Also catches common misspellings: `gmali`, `gamil`.

The pattern matches any TLD (`.com`, `.co.uk`, etc.).
