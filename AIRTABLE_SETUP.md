# Airtable Integration Setup Guide

## Step 1: Create Airtable Base

1. Go to https://airtable.com and sign in
2. Create a new base called "Lightspeed Labs Website"

## Step 2: Create Tables

### Contact Forms Table
Create a table called "Contact Forms" with these fields:
- **Name** (Single line text)
- **Email** (Email)
- **Company** (Single line text)
- **Company Type** (Single select: VC, Startup, Digital, Other)
- **Interest** (Single line text)
- **Message** (Long text)
- **Source** (Single line text)
- **Timestamp** (Date)
- **Submitted At** (Date)

### Newsletter Signups Table
Create a table called "Newsletter Signups" with these fields:
- **Email** (Email)
- **Source** (Single line text)
- **Timestamp** (Date)
- **Submitted At** (Date)
- **Status** (Single select: Subscribed, Unsubscribed)

## Step 3: Get API Credentials

1. Go to https://airtable.com/account
2. Generate a Personal Access Token with these scopes:
   - `data.records:read`
   - `data.records:write`
   - `schema.bases:read`
3. Copy your token (starts with `pat...`)

## Step 4: Get Base and Table IDs

1. Go to https://airtable.com/api
2. Select your "Lightspeed Labs Website" base
3. Copy the Base ID (starts with `app...`)
4. Table IDs are automatically handled by table names

## Step 5: Configure Vercel Environment Variables

In your Vercel dashboard, add these environment variables:

```
AIRTABLE_TOKEN=pat_your_token_here
AIRTABLE_BASE_ID=app_your_base_id_here
AIRTABLE_CONTACT_TABLE=Contact Forms
AIRTABLE_NEWSLETTER_TABLE=Newsletter Signups
```

## Step 6: Deploy

Deploy your site to Vercel and your forms will automatically start saving to Airtable!

## Testing

After deployment, test both forms:
- Contact form should create records in "Contact Forms" table
- Newsletter signup should create records in "Newsletter Signups" table