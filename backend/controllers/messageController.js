const Message = require('../models/Message');
const transporterMail = require('../services/emailConfig')
const contactTemplate = require('../mailTemplates/contactTemplate')

exports.createMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const newMessage = new Message({
            name,
            email,
            subject,
            message,
        });
        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error sending contact message', error: error.message });
    }
};

exports.getAllMessages = async (req, res) => {
    try {
        const contacts = await Message.find().sort({ date: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching contacts', error: error.message });
    }
};

exports.updateMessageStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, replyMsg } = req.body;
        const updatedMessage = await Message.findByIdAndUpdate(
            id,
            { status, replyMsg },
            { new: true }
        );
        if (!updatedMessage) {
            return res.status(404).json({ message: 'Message not found' });
        }

        // Send email to the user
        if (status === 'replied' && replyMsg) {
            try {
                await transporterMail.sendMail({
                    from: process.env.EMAIL_FROM,
                    to: updatedMessage.email,
                    subject: `Re: ${updatedMessage.subject}`,
                    text: replyMsg,
                    html: contactTemplate(updatedMessage.name, updatedMessage.message, replyMsg, updatedMessage.date),
                });
            } catch (e) {
                console.log("Error while sending message", e);

            }

        }

        res.status(200).json(updatedMessage);
    } catch (error) {
        res.status(400).json({ message: 'Error updating contact status', error: error.message });
    }
}