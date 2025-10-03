# Airtable Integration Setup Guide

## Step 1: Create Airtable Base

1. Go to https://airtable.com and sign in
2. Create a new base called "Lightspeed Labs Website"

## Step 2: Create Interactions Table

Create a table called "Interactions" with these fields:
- **Interaction Type** (Single select: Contact Form, Newsletter Signup)
- **Name** (Single line text) - *for contact forms only*
- **Email** (Email) - *required for both types*
- **Company** (Single line text) - *for contact forms only*
- **Company Type** (Single select: VC, Startup, Digital, Other) - *for contact forms only*
- **Interest** (Single line text) - *for contact forms only*
- **Message** (Long text) - *for contact forms only*
- **Source** (Single line text) - *tracks where submission came from*
- **Timestamp** (Date) - *when form was filled*
- **Submitted At** (Date) - *when record was created*
- **Status** (Single select: Subscribed, Unsubscribed) - *for newsletter signups only*

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
AIRTABLE_TABLE=Interactions
```

## Step 6: Deploy

Deploy your site to Vercel and your forms will automatically start saving to Airtable!

## Testing

After deployment, test both forms:
- Contact form should create records in "Interactions" table with Interaction Type = "Contact Form"
- Newsletter signup should create records in "Interactions" table with Interaction Type = "Newsletter Signup"

Both form types will appear in the same table, differentiated by the "Interaction Type" field.