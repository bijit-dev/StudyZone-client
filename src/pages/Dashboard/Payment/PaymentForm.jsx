import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { sessionId } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [error, setError] = useState('');

    // Fetch session data
    const { isPending, data: sessionInfo = {} } = useQuery({
        queryKey: ['session', sessionId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/session/${sessionId}`);
            return res.data;
        }
    })

    if (isPending) {
        return '...loading'
    }

    const amount = sessionInfo.registrationFee;
    const amountInCents = amount * 100;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (!card) {
            return;
        }

        // step- 1: validate the card
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setError(error.message);
        }
        else {
            setError('');

            // step-2: create payment intent
            const res = await axiosSecure.post('/create-payment-intent', {
                amountInCents,
                sessionId
            })

            const clientSecret = res.data.clientSecret;

            // step-3: confirm payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    },
                },
            });

            if (result.error) {
                setError(result.error.message);
            } else {
                setError('');
                if (result.paymentIntent.status === 'succeeded') {
                    const transactionId = result.paymentIntent.id;
                    // step-4 mark session paid also create payment history
                    
                    const { _id, ...bookingInfo } = sessionInfo;
                    bookingInfo.sessionId = sessionId;
                    bookingInfo.email = user.email;
                    bookingInfo.status = "confirmed";
                    bookingInfo.paid = true;
                    bookingInfo.paymentMethod = result.paymentIntent.payment_method_types;
                    bookingInfo.transactionId = transactionId;
                    bookingInfo.registrationDate = new Date();

                    axiosSecure.post("/booking", bookingInfo).then((res) => {
                        if (res.data.insertedId) {
                            // Swal.fire("Booking Successful", "You’ve booked the session.", "success");
                            // ✅ Show SweetAlert with transaction ID
                            Swal.fire({
                                icon: 'success',
                                title: 'Payment Successful!',
                                html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
                                confirmButtonText: 'Go to my booked session',
                            });
                            
                            navigate("/dashboard/view-booked-session");
                        }
                    });
                }
            }
        }





    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
                <CardElement className="p-2 border rounded">
                </CardElement>
                <button
                    type='submit'
                    className="btn btn-secondary text-black w-full"
                    disabled={!stripe}
                >
                    Pay ${amount}
                </button>
                {
                    error && <p className='text-red-500'>{error}</p>
                }
            </form>
        </div>
    );
};

export default PaymentForm;