import { Button } from "@nextui-org/button";
import { NavLink } from "react-router-dom";

export default function PrivacyPolicy() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                <p className="mb-4">
                    Welcome to Sweet Delights Bakery. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. The Data We Collect About You</h2>
                <p className="mb-4">
                    We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
                </p>
                <ul className="list-disc list-inside mb-4">
                    <li>Identity Data: first name, last name, username or similar identifier</li>
                    <li>Contact Data: billing address, delivery address, email address and telephone numbers</li>
                    <li>Financial Data: payment card details</li>
                    <li>Transaction Data: details about payments to and from you and other details of products you have purchased from us</li>
                    <li>Technical Data: internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website</li>
                    <li>Profile Data: your username and password, purchases or orders made by you, your interests, preferences, reviews and survey responses</li>
                    <li>Usage Data: information about how you use our website, products and services</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Personal Data</h2>
                <p className="mb-4">
                    We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                </p>
                <ul className="list-disc list-inside mb-4">
                    <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                    <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                    <li>Where we need to comply with a legal obligation.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
                <p className="mb-4">
                    We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Your Legal Rights</h2>
                <p className="mb-4">
                    Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
                </p>
                <ul className="list-disc list-inside mb-4">
                    <li>Request access to your personal data</li>
                    <li>Request correction of your personal data</li>
                    <li>Request erasure of your personal data</li>
                    <li>Object to processing of your personal data</li>
                    <li>Request restriction of processing your personal data</li>
                    <li>Request transfer of your personal data</li>
                    <li>Right to withdraw consent</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
                <p className="mb-4">
                    If you have any questions about this privacy policy or our privacy practices, please contact us at:
                </p>
                <p className="mb-4">
                    Sweet Delights Bakery<br />
                    123 Flour Street, Doughville, CA 90210<br />
                    Email: privacy@sweetdelightsbakery.com<br />
                    Phone: (555) 123-4567
                </p>
            </section>

            <div className="mt-8">
                <Button asChild>
                    <NavLink to="/">
                        Return to Home
                    </NavLink>
                </Button>
            </div>
        </div>
    )
}