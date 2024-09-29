// orderTemplate.js
const orderTemplate = (customerName, orderNumber, orderDate, orderStatus, statusMessage) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Order Status Update</title>
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
            background-color: #2ecc71;
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
        .order-details {
            background-color: #f0f0f0;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
        }
        .status-bar {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            margin-bottom: 20px;
        }
        .status-step {
            flex: 1;
            text-align: center;
        }
        .status-step .dot {
            width: 20px;
            height: 20px;
            background-color: #ddd;
            border-radius: 50%;
            margin: 0 auto 10px;
        }
        .status-step.active .dot {
            background-color: #2ecc71;
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
            <h1 style="margin: 0;">Order Status Update</h1>
        </div>
        <div class="content">
            <p>Dear ${customerName},</p>
            <p>We're writing to provide you with an update on your recent order.</p>
            
            <div class="order-details">
                <p><strong>Order Number:</strong> ${orderNumber}</p>
                <p><strong>Order Date:</strong> ${orderDate}</p>
                <p><strong>Current Status:</strong> ${orderStatus}</p>
            </div>
            
            <div class="status-bar">
                <div class="status-step ${orderStatus === 'Ordered' ? 'active' : ''}">
                    <div class="dot"></div>
                    <p>Ordered</p>
                </div>
                <div class="status-step ${['Processing', 'Shipped', 'Delivered'].includes(orderStatus) ? 'active' : ''}">
                    <div class="dot"></div>
                    <p>Processing</p>
                </div>
                <div class="status-step ${['Shipped', 'Delivered'].includes(orderStatus) ? 'active' : ''}">
                    <div class="dot"></div>
                    <p>Shipped</p>
                </div>
                <div class="status-step ${orderStatus === 'Delivered' ? 'active' : ''}">
                    <div class="dot"></div>
                    <p>Delivered</p>
                </div>
            </div>
            
            <p>${statusMessage}</p>
            
            <p>If you have any questions about your order, please don't hesitate to contact our customer support team.</p>
            
            <p>Thank you for choosing our service!</p>
            
            <p>Best regards,<br>Your Company Name</p>
        </div>
        <div class="footer">
            <p>This is an automated email. Please do not reply directly to this message.</p>
            <p>© 2023 Your Company Name. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;

module.exports = orderTemplate;