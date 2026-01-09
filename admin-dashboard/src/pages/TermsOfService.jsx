import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 p-6 md:p-12 font-sans">
            <div className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                    <Link to="/login" className="flex items-center text-whatsapp-green hover:text-emerald-400 transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Login
                    </Link>
                    <FileText className="w-12 h-12 text-whatsapp-green" />
                </div>

                <h1 className="text-4xl font-bold mb-6 text-white border-b border-slate-700 pb-4">Terms of Service</h1>

                <div className="space-y-6 text-slate-300 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using the WhatsApp Task Management System, you agree to be bound by these Terms of Service.
                            If you do not agree with any part of these terms, you are prohibited from using this service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">2. Description of Service</h2>
                        <p>
                            This application provides an AI-driven interface for managing tasks via WhatsApp Cloud API.
                            The service includes task creation, assignment, status tracking, and automated escalation notifications.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">3. User Responsibilities</h2>
                        <p>
                            Users are responsible for:
                        </p>
                        <ul className="list-disc ml-6 mt-2 space-y-2">
                            <li>Ensuring the accuracy of the information provided in task descriptions.</li>
                            <li>Maintaining the confidentiality of their login credentials for the Admin Dashboard.</li>
                            <li>Complying with WhatsApp's own terms of service when interacting with the bot.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">4. Content Guidelines</h2>
                        <p>
                            Users shall not use the service to create tasks containing illegal, abusive, or harmful content.
                            The system administrator reserves the right to remove any content that violates these guidelines.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">5. Disclaimer of Warranties</h2>
                        <p>
                            The service is provided "as is" without any warranties of any kind.
                            We do not guarantee that the service will be uninterrupted, timely, or error-free.
                            Task delivery via WhatsApp is subject to network availability and Meta's service status.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">6. Limitation of Liability</h2>
                        <p>
                            In no event shall the developers be liable for any damages arising out of the use or inability to use the service,
                            including but not limited to loss of data or business interruption.
                        </p>
                    </section>

                    <section className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                        <p className="text-sm italic">
                            Last Updated: January 09, 2026. This document is part of the compliance suite for the WhatsApp Cloud API integration.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
