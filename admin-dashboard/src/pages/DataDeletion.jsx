import React from 'react';
import { Trash2, ArrowLeft, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const DataDeletion = () => {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 p-6 md:p-12 font-sans">
            <div className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                    <Link to="/login" className="flex items-center text-whatsapp-green hover:text-emerald-400 transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Login
                    </Link>
                    <Trash2 className="w-12 h-12 text-red-500" />
                </div>

                <h1 className="text-4xl font-bold mb-6 text-white border-b border-slate-700 pb-4">Data Deletion Instructions</h1>

                <div className="space-y-6 text-slate-300 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">User Data Deletion Callback</h2>
                        <p>
                            WhatsApp Task Management System does not save your personal data on its server.
                            However, according to Meta's policy for Facebook Apps and Login, we must provide a
                            <strong>User Data Deletion Callback URL</strong> or <strong>Data Deletion Instructions URL</strong>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">How to Delete Your Data</h2>
                        <p>
                            If you want to delete your activities and data from the WhatsApp Task Management System,
                            you can follow these steps:
                        </p>
                        <ol className="list-decimal ml-6 mt-2 space-y-4">
                            <li>
                                <strong>WhatsApp Chat:</strong> Simply delete the chat thread with our bot on your WhatsApp application.
                                This will remove the local history on your device.
                            </li>
                            <li>
                                <strong>System Data:</strong> To remove your user profile and all tasks associated with your phone number
                                from our database, please send an email to our support team.
                            </li>
                            <li>
                                <strong>Email Request:</strong> Send an email to
                                <span className="text-whatsapp-green font-medium ml-1">support@yourdomain.com</span>
                                with the subject line "Data Deletion Request" and include your registered WhatsApp phone number.
                            </li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">What Data will be Deleted?</h2>
                        <p>
                            Upon receiving a valid request, we will permanently remove:
                        </p>
                        <ul className="list-disc ml-6 mt-2 space-y-2">
                            <li>Your User Profile (Name and Phone Number).</li>
                            <li>All Tasks created by you.</li>
                            <li>All Tasks assigned to you.</li>
                        </ul>
                        <p className="mt-4 text-sm text-slate-400">
                            Note: Once deleted, this data cannot be recovered.
                        </p>
                    </section>

                    <section className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 flex items-start gap-4">
                        <Mail className="w-6 h-6 text-whatsapp-green flex-shrink-0 mt-1" />
                        <div>
                            <h3 className="text-white font-medium">Contact Support</h3>
                            <p className="text-sm">For any questions regarding your data or this deletion process, please contact us.</p>
                        </div>
                    </section>

                    <section className="p-4 rounded-lg border border-slate-800">
                        <p className="text-sm italic text-slate-500">
                            Last Updated: January 09, 2026. This page satisfies the Meta Developer policy for User Data Deletion.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default DataDeletion;
