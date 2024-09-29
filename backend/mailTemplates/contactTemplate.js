// contactTemplate.js
const contactTemplate = (name, originalMessage, replyMessage, date) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Response to Your Inquiry</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .container {
            background-color: #f9f9f9;
            border-radius: 5px;
            padding: 20px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .header {
            background-color: #4a90e2;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }
        .content {
            background-color: white;
            padding: 20px;
            border-radius: 0 0 5px 5px;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 0.8em;
            color: #888;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 style="margin: 0;">Response to Your Inquiry</h1>
        </div>
        <div class="content">
            <p>Dear ${name},</p>
            <p>Thank you for contacting us. We have received your message and are pleased to respond to your inquiry.</p>
            <div
                    style="background-color: #dcf8c6;text-wrap: wrap; border-radius: 10px; padding: 10px; margin-bottom: 10px; max-width: 80%; ">
                    <span
                        style="font-size: 0.7em; color: #7f7f7f; position: absolute; top: 5px; left: 10px;">${name}</span>
                    <p style="margin: 0; padding-top: 10px;text-wrap: wrap;">${originalMessage}</p>
                </div>
            <div
                    style="background-color: #f1f1f1; text-wrap: wrap;border-radius: 10px; padding: 10px; margin-bottom: 10px;  max-width: 80%; margin-left:20%; ">
                    <span style="font-size: 0.7em; color: #7f7f7f; position: absolute; top: 5px; left: 10px;">Bakery
                        Team</span>
                    <p style="margin: 0; padding-top: 10px;text-wrap: wrap;">${replyMessage}</p>
                </div>
            <p>If you have any further questions, please don't hesitate to reach out to us again.</p>
            <p>Best regards,<br>Customer Support Team</p>
        </div>
        <div class="footer">
            <p>This email was sent in response to your inquiry on ${date}.</p>
            <p>© 2023 Bakery Website. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

module.exports = contactTemplate;