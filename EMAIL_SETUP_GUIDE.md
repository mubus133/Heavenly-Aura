# EMAIL NOTIFICATIONS SETUP GUIDE
## Heavenly Aura Spa - Appointment Request Email Alerts

This guide will help you set up automatic email notifications when customers submit appointment requests through your website.

---

## 🎯 What You'll Achieve

When a customer fills out the booking form on your website:
- ✅ You receive an **instant email** to **heavenlyauraspa.org@gmail.com**
- ✅ Email contains all booking details (name, phone, service, date, time, address)
- ✅ **100% FREE** (EmailJS free tier: 200 emails/month)
- ✅ No server or backend coding required

---

## 📋 Prerequisites

- Access to **heavenlyauraspa.org@gmail.com**
- 15 minutes of setup time
- Internet connection

---

## 🚀 STEP-BY-STEP SETUP

### Step 1: Create EmailJS Account

1. Go to **https://www.emailjs.com/**
2. Click **"Sign Up"** (top right)
3. Choose **"Sign up with Google"** and select **heavenlyauraspa.org@gmail.com**
4. Complete the signup process

---

### Step 2: Add Email Service

1. After logging in, go to **Email Services** (left sidebar)
2. Click **"Add New Service"**
3. Select **Gmail** from the list
4. Click **"Connect Account"** and authorize **heavenlyauraspa.org@gmail.com**
5. **Copy the Service ID** (looks like: `service_xxxxxxx`) — save this!
6. Click **"Create Service"**

---

### Step 3: Create Email Template

1. Go to **Email Templates** (left sidebar)
2. Click **"Create New Template"**
3. **Template Name:** `Appointment Request Notification`
4. Configure the template:

#### **From Settings:**
- **From Name:** `Heavenly Aura Spa Website`
- **From Email:** `{{email}}` (the customer's email)
- **Reply To:** `{{email}}`

#### **To Settings:**
- **To Email:** `heavenlyauraspa.org@gmail.com`
- **To Name:** `Heavenly Aura Spa`

#### **Subject Line:**
```
New Appointment Request from {{fullName}}
```

#### **Content (HTML):**
Paste this into the content editor:

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #A75675; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f5f0; padding: 30px; border-radius: 0 0 8px 8px; }
        .info-row { margin: 15px 0; padding: 12px; background: white; border-left: 4px solid #D3A66C; border-radius: 4px; }
        .label { font-weight: bold; color: #5B4639; margin-right: 10px; }
        .value { color: #333; }
        .footer { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 2px solid #D3A66C; color: #999; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>📅 NEW APPOINTMENT REQUEST</h2>
        </div>
        <div class="content">
            <h3 style="color: #A75675; margin-bottom: 20px;">Client Information</h3>
            
            <div class="info-row">
                <span class="label">👤 Full Name:</span>
                <span class="value">{{fullName}}</span>
            </div>
            
            <div class="info-row">
                <span class="label">📞 Phone:</span>
                <span class="value">{{phone}}</span>
            </div>
            
            <div class="info-row">
                <span class="label">✉️ Email:</span>
                <span class="value">{{email}}</span>
            </div>
            
            <h3 style="color: #A75675; margin: 30px 0 20px;">Appointment Details</h3>
            
            <div class="info-row">
                <span class="label">💆 Service:</span>
                <span class="value">{{service}}</span>
            </div>
            
            <div class="info-row">
                <span class="label">📅 Preferred Date:</span>
                <span class="value">{{date}}</span>
            </div>
            
            <div class="info-row">
                <span class="label">🕐 Preferred Time:</span>
                <span class="value">{{time}}</span>
            </div>
            
            <div class="info-row">
                <span class="label">🏠 Address:</span>
                <span class="value">{{address}}</span>
            </div>
            
            <div class="info-row">
                <span class="label">📝 Additional Notes:</span>
                <span class="value">{{notes}}</span>
            </div>
            
            <div class="footer">
                <p><strong>⏰ Submitted:</strong> {{submittedAt}}</p>
                <p style="margin-top: 15px;">This is an automated notification from Heavenly Aura Spa website.</p>
                <p style="color: #A75675; font-weight: bold;">Please review and confirm this appointment manually.</p>
            </div>
        </div>
    </div>
</body>
</html>
```

5. Click **"Save"**
6. **Copy the Template ID** (looks like: `template_xxxxxxx`) — save this!

---

### Step 4: Get Your Public Key

1. Go to **Account** (click your profile icon, top right)
2. Go to **API Keys** section
3. **Copy your Public Key** (looks like: `xxxxxxxxxxxxxxx`) — save this!

---

### Step 5: Update Website Configuration

1. Open the file: `email-handler.js` in your website folder
2. Find this section at the top:

```javascript
const EMAILJS_CONFIG = {
    publicKey: 'YOUR_PUBLIC_KEY_HERE',          
    serviceId: 'YOUR_SERVICE_ID_HERE',          
    templateId: 'YOUR_TEMPLATE_ID_HERE'         
};
```

3. Replace the placeholders with your actual IDs:

```javascript
const EMAILJS_CONFIG = {
    publicKey: 'xxxxxxxxxxxxxxx',          // Your Public Key from Step 4
    serviceId: 'service_xxxxxxx',          // Your Service ID from Step 2
    templateId: 'template_xxxxxxx'         // Your Template ID from Step 3
};
```

4. **Save the file**

---

### Step 6: Test the Setup

1. Open your website in a browser
2. Scroll to the **"BOOK AN APPOINTMENT"** section
3. Fill out the form with test data:
   - Use your own email for testing
   - Fill all required fields
4. Click **"REQUEST APPOINTMENT"**
5. Check **heavenlyauraspa.org@gmail.com** inbox
6. You should receive an email within 5-10 seconds!

---

## ✅ VERIFICATION CHECKLIST

- [ ] EmailJS account created with heavenlyauraspa.org@gmail.com
- [ ] Gmail service connected
- [ ] Email template created and saved
- [ ] Public Key, Service ID, and Template ID copied
- [ ] `email-handler.js` file updated with correct IDs
- [ ] Test appointment submitted
- [ ] Confirmation email received in inbox

---

## 🔧 TROUBLESHOOTING

### "Email not received"
1. Check your spam/junk folder
2. Verify all three IDs are correct in `email-handler.js`
3. Open browser console (F12) and check for errors
4. Ensure you saved the file after editing

### "EmailJS not configured" error
1. Make sure `email-handler.js` is properly linked in `index.html`
2. Check browser console for script loading errors
3. Verify the EmailJS CDN link is working

### "Invalid template" error
1. Go back to EmailJS dashboard
2. Open your template and ensure all `{{variables}}` match exactly:
   - `{{fullName}}`
   - `{{phone}}`
   - `{{email}}`
   - `{{service}}`
   - `{{date}}`
   - `{{time}}`
   - `{{address}}`
   - `{{notes}}`
   - `{{submittedAt}}`

---

## 📊 EMAIL LIMITS (Free Tier)

- **200 emails per month** (FREE)
- **Average usage:** 20-50 appointments/month = well within limit
- If you exceed 200/month, upgrade to EmailJS Pro ($15/month for 1,000 emails)

---

## 💡 ADDITIONAL TIPS

### Add Email Filtering
1. In Gmail, create a filter for emails from "Heavenly Aura Spa Website"
2. Apply label: **"Website Appointments"**
3. Star these emails automatically
4. Forward to another email if needed

### Mobile Notifications
1. Install Gmail app on your phone
2. Enable push notifications for the label **"Website Appointments"**
3. Get instant alerts on new bookings!

---

## 📱 WHATSAPP INTEGRATION (Already Working)

**Note:** Direct WhatsApp notifications from the website form require WhatsApp Business API (paid service requiring server setup). 

**Current WhatsApp integration:**
- ✅ WhatsApp booking button (pre-filled messages)
- ✅ Floating WhatsApp button
- ✅ Multiple WhatsApp CTAs throughout site

**Customers can book via:**
1. Website form → Email notification ✅
2. WhatsApp button → Direct message to you ✅

---

## 🎉 YOU'RE DONE!

Your website now sends automatic email notifications for every appointment request!

**Next Steps:**
1. Monitor your inbox
2. Respond to appointment requests within 24 hours
3. Confirm appointments via phone/WhatsApp
4. Track conversion rates

---

## 📞 NEED HELP?

If you encounter issues:
1. Check EmailJS documentation: https://www.emailjs.com/docs/
2. Review browser console for error messages (F12 key)
3. Test with different browsers
4. Contact EmailJS support if service issues persist

---

**Document Version:** 1.0  
**Last Updated:** August 29, 2026  
**Website:** Heavenly Aura Spa
