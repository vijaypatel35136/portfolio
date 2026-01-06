import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AdminLoginModal({ onClose, onLogin }) {
    const [mobileNumber, setMobileNumber] = useState('');
    const [mobileVerified, setMobileVerified] = useState(false);
    const [loginStep, setLoginStep] = useState('mobile');
    const [generatedOTP, setGeneratedOTP] = useState('');
    const [enteredOTP, setEnteredOTP] = useState('');
    const [adminUsername, setAdminUsername] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleMobileVerification = () => {
        const AUTHORIZED_MOBILE = '8460235136';

        if (mobileNumber === AUTHORIZED_MOBILE) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            setGeneratedOTP(otp);
            setLoginStep('otp');
            alert(`Your OTP is: ${otp}\n\n(In production, this would be sent via SMS)`);
        } else {
            alert('Unauthorized mobile number!');
            setMobileNumber('');
        }
    };

    const handleOTPVerification = () => {
        if (enteredOTP === generatedOTP) {
            setMobileVerified(true);
            setLoginStep('credentials');
            setEnteredOTP('');
        } else {
            alert('Invalid OTP! Please try again.');
            setEnteredOTP('');
        }
    };

    const handleAdminLogin = () => {
        const ADMIN_USERNAME = 'Vijay Patel';
        const ADMIN_PASSWORD = 'Vijaypatel@123';

        if (adminUsername === ADMIN_USERNAME && adminPassword === ADMIN_PASSWORD) {
            onLogin();
        } else {
            alert('Invalid username or password!');
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-zinc-900 rounded-3xl border border-zinc-800 p-8 max-w-md w-full">
                <h3 className="text-2xl font-bold mb-2 text-center bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                    Admin Authentication
                </h3>
                <p className="text-center text-gray-400 text-sm mb-6">
                    {loginStep === 'mobile' && 'Step 1 of 3: Verify Mobile Number'}
                    {loginStep === 'otp' && 'Step 2 of 3: Enter OTP'}
                    {loginStep === 'credentials' && 'Step 3 of 3: Enter Credentials'}
                </p>

                {loginStep === 'mobile' ? (
                    <>
                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-2 text-gray-300">Mobile Number</label>
                            <input
                                type="tel"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                                onKeyDown={(e) => e.key === 'Enter' && mobileNumber.length === 10 && handleMobileVerification()}
                                placeholder="Enter mobile number"
                                className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white text-lg tracking-wider"
                                maxLength="10"
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={handleMobileVerification}
                                disabled={mobileNumber.length !== 10}
                                className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Send OTP
                            </button>
                            <button
                                onClick={onClose}
                                className="flex-1 border border-zinc-800 px-6 py-3 rounded-xl font-bold hover:border-red-500 hover:text-red-500 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                ) : loginStep === 'otp' ? (
                    <>
                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-2 text-gray-300">Enter OTP</label>
                            <input
                                type="text"
                                value={enteredOTP}
                                onChange={(e) => setEnteredOTP(e.target.value.replace(/\D/g, ''))}
                                onKeyDown={(e) => e.key === 'Enter' && enteredOTP.length === 6 && handleOTPVerification()}
                                placeholder="Enter 6-digit OTP"
                                className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white text-2xl tracking-widest text-center font-bold"
                                maxLength="6"
                            />
                            <p className="text-xs text-gray-500 mt-2 text-center">OTP has been sent to your mobile number</p>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={handleOTPVerification}
                                disabled={enteredOTP.length !== 6}
                                className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Verify OTP
                            </button>
                            <button
                                onClick={onClose}
                                className="flex-1 border border-zinc-800 px-6 py-3 rounded-xl font-bold hover:border-red-500 hover:text-red-500 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                        <button
                            onClick={handleMobileVerification}
                            className="w-full mt-4 text-sm text-orange-400 hover:text-orange-300 transition-colors"
                        >
                            Resend OTP
                        </button>
                    </>
                ) : (
                    <>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-2 text-gray-300">Username</label>
                            <input
                                type="text"
                                value={adminUsername}
                                onChange={(e) => setAdminUsername(e.target.value)}
                                placeholder="Enter username"
                                className="w-full px-4 py-3 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-2 text-gray-300">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={adminPassword}
                                    onChange={(e) => setAdminPassword(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
                                    placeholder="Enter password"
                                    className="w-full px-4 py-3 pr-12 bg-black/50 border border-zinc-800 rounded-xl focus:border-orange-500 focus:outline-none text-white"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={handleAdminLogin}
                                className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                            >
                                Login
                            </button>
                            <button
                                onClick={onClose}
                                className="flex-1 border border-zinc-800 px-6 py-3 rounded-xl font-bold hover:border-red-500 hover:text-red-500 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
