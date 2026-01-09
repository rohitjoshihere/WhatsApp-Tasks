const axios = require('axios');

const sendWhatsAppMessage = async (to, body) => {
    try {
        const url = `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
        const response = await axios.post(
            url,
            {
                messaging_product: 'whatsapp',
                to: to,
                type: 'text',
                text: { body: body },
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(`\x1b[32m[WhatsApp] Message successfully sent to ${to}\x1b[0m`);
        return response.data;
    } catch (err) {
        const errorData = err.response?.data?.error;
        console.error(`\x1b[31m[WhatsApp Error] Failed to send message to ${to}\x1b[0m`);
        if (errorData) {
            console.error(`  - Code: ${errorData.code}`);
            console.error(`  - Message: ${errorData.message}`);
            if (errorData.error_data) {
                console.error(`  - Details: ${errorData.error_data.details}`);
            }
        } else {
            console.error(`  - Error: ${err.message}`);
        }
        throw err;
    }
};

module.exports = { sendWhatsAppMessage };
