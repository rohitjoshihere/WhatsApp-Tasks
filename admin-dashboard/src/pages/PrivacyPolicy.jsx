import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 p-6 md:p-12 font-sans">
            <div className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                    <Link to="/login" className="flex items-center text-whatsapp-green hover:text-emerald-400 transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Login
                    </Link>
                    <Shield className="w-12 h-12 text-whatsapp-green" />
                </div>

                <h1 className="text-4xl font-bold mb-6 text-white border-b border-slate-700 pb-4">Privacy Policy</h1>

                <div className="space-y-6 text-slate-300 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">1. Introduction</h2>
                        <p>
                            Welcome to the WhatsApp Task Management System. Your privacy is critically important to us.
                            This policy explains how we handle your information when you use our service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">2. Information We Collect</h2>
                        <p>
                            Our system collects minimal information required to provide task management functionality:
                        </p>
                        <ul className="list-disc ml-6 mt-2 space-y-2">
                            <li><strong>Phone Number:</strong> Used as your unique identifier to assign and manage tasks.</li>
                            <li><strong>Profiles:</strong> Name and basic profile information provided by WhatsApp.</li>
                            <li><strong>Task Content:</strong> Titles and descriptions of tasks you create or are assigned.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">3. How We Use Information</h2>
                        <p>
                            Your data is used solely for:
                        </p>
                        <ul className="list-disc ml-6 mt-2 space-y-2">
                            <li>Processing task commands via the WhatsApp Cloud API.</li>
                            <li>Displaying task progress on the Admin Dashboard.</li>
                            <li>Sending automated escalation and reminder notifications.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">4. Data Security</h2>
                        <p>
                            We prioritize the security of your data. All communication between the WhatsApp Cloud API and our servers
                            is encrypted. Access to the Admin Dashboard is protected by industry-standard JWT authentication.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">5. Third-Party Services</h2>
                        <p>
                            We use the WhatsApp Cloud API (a Meta service) to facilitate message delivery. By using this service,
                            you also agree to Meta's Privacy Policy.
                        </p>
                    </section>

                    <section className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                        <p className="text-sm italic">
                            Last Updated: January 09, 2026. This policy is compliant with Meta's developer requirements.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
