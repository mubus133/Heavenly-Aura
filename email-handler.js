/* ============================================================
   HEAVENLY AURA SPA - BACKEND EMAIL HANDLER
   EmailJS Integration for Form Submissions
   ============================================================ */

/*
   SETUP INSTRUCTIONS:

   1. Go to https://www.emailjs.com/ and create a free account
   2. Add a new Email Service (Gmail):
      - Service ID: (copy this)
      - Connect your heavenlyauraspa.org@gmail.com account

   3. Create an Email Template:
      - Template ID: (copy this)
      - Subject: New Appointment Request - Heavenly Aura Spa
      - Template Content:

        New Appointment Request

        Client Details:
        Name: {{fullName}}
        Phone: {{phone}}
        Email: {{email}}

        Appointment Details:
        Service: {{service}}
        Preferred Date: {{date}}
        Preferred Time: {{time}}
        Address: {{address}}

        Additional Notes:
        {{notes}}

        ---
        Submitted: {{submittedAt}}

   4. Get your Public Key from Account > API Keys

   5. Update the config below with your IDs
*/

// EmailJS Configuration
const EMAILJS_CONFIG = {
    publicKey: 'YOUR_PUBLIC_KEY_HERE',          // Replace with your EmailJS public key
    serviceId: 'YOUR_SERVICE_ID_HERE',          // Replace with your service ID
    templateId: 'YOUR_TEMPLATE_ID_HERE'         // Replace with your template ID
};

// Initialize EmailJS
function initEmailJS() {
    if (typeof emailjs === 'undefined') {
        console.warn('EmailJS library not loaded. Email notifications disabled.');
        return false;
    }

    emailjs.init(EMAILJS_CONFIG.publicKey);
    return true;
}

// Send appointment email
async function sendAppointmentEmail(formData) {
    if (!initEmailJS()) {
        return { success: false, error: 'EmailJS not configured' };
    }

    try {
        const templateParams = {
            fullName: formData.fullName,
            phone: formData.phone,
            email: formData.email,
            service: formData.service || 'Not specified',
            date: formatDate(formData.date),
            time: formatTime(formData.time),
            address: formData.address,
            notes: formData.notes || 'None',
            submittedAt: new Date().toLocaleString('en-US', {
                dateStyle: 'full',
                timeStyle: 'long'
            })
        };

        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            templateParams
        );

        return { success: true, response };
    } catch (error) {
        console.error('Email sending failed:', error);
        return { success: false, error: error.text || error.message };
    }
}

// Export for use in script.js
window.sendAppointmentEmail = sendAppointmentEmail;
