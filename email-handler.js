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
      - Subject: New Appointment Request from {{from_name}}
      - Template Content (paste this so EVERY field shows):

        New Appointment Request

        {{message}}

   4. Get your Public Key from Account > API Keys

   5. Update the config below with your IDs
*/

// EmailJS Configuration
const EMAILJS_CONFIG = {
    publicKey: 'YOUR_PUBLIC_KEY_HERE',          // Replace with your EmailJS public key
    serviceId: 'YOUR_SERVICE_ID_HERE',          // Replace with your service ID
    templateId: 'YOUR_TEMPLATE_ID_HERE'         // Replace with your template ID
};

function formatEmailDate(dateString) {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatEmailTime(timeString) {
    if (!timeString) return 'Not specified';
    const [hours, minutes] = String(timeString).split(':');
    const hour = parseInt(hours, 10);
    if (Number.isNaN(hour)) return timeString;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes || '00'} ${ampm}`;
}

function buildBookingMessage(details) {
    return [
        'NEW APPOINTMENT REQUEST',
        '',
        'CLIENT DETAILS',
        `Name: ${details.fullName}`,
        `Phone: ${details.phone}`,
        `Email: ${details.email}`,
        '',
        'APPOINTMENT DETAILS',
        `Service: ${details.service}`,
        `Preferred Date: ${details.date}`,
        `Preferred Time: ${details.time}`,
        `Address: ${details.address}`,
        `Additional Notes: ${details.notes}`,
        '',
        `Submitted: ${details.submittedAt}`
    ].join('\n');
}

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
        const fullName = (formData.fullName || '').trim() || 'Not provided';
        const phone = (formData.phone || '').trim() || 'Not provided';
        const email = (formData.email || '').trim() || 'Not provided';
        const service = (formData.service || '').trim() || 'Not specified';
        const date = formatEmailDate(formData.date);
        const time = formatEmailTime(formData.time);
        const address = (formData.address || '').trim() || 'Not provided';
        const notes = (formData.notes || '').trim() || 'None';
        const submittedAt = new Date().toLocaleString('en-US', {
            dateStyle: 'full',
            timeStyle: 'long'
        });

        const message = buildBookingMessage({
            fullName,
            phone,
            email,
            service,
            date,
            time,
            address,
            notes,
            submittedAt
        });

        // Address includes the extra booking fields so emails still show
        // phone/service/date/time even if the EmailJS template only has
        // {{fullName}} and {{address}}.
        const addressWithDetails = [
            address,
            '',
            `Phone: ${phone}`,
            `Email: ${email}`,
            `Service: ${service}`,
            `Preferred Date: ${date}`,
            `Preferred Time: ${time}`,
            `Notes: ${notes}`
        ].join('\n');

        const templateParams = {
            fullName,
            name: fullName,
            from_name: fullName,
            phone,
            email,
            user_email: email,
            from_email: email,
            reply_to: email,
            service,
            date,
            time,
            address: addressWithDetails,
            notes,
            submittedAt,
            message
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
