import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        //const result = await axios.post("http://localhost:5000/payment/orders");

        // if (!result) {
        //     alert("Server error. Are you online?");
        //     return;
        // }

        //const { amount, id: order_id, currency } = result.data;

        const options = {
            key: "rzp_test_98afL4NIq4007K", // Enter the Key ID generated from the Dashboard
            amount: "5000",//paise
            currency: "INR",
            name: "Codian Labs",
            description: "Test Transaction",
            image: { logo },
            //order_id: "1234567890",
            handler: async function (response) {
                const data = {
                    orderCreationId: "1234567890",
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await axios.post("http://localhost:5000/payment/success", data);

                alert(result.data.msg);
            },
            prefill: {
                name: "Gaurav Bhalla",
                email: "gaurav10bhalla@gmail.com",
                contact: "9999999999",
            },
            notes: {
                address: "Allahabad",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <div className="App">
            <header className="App-header">
                <button className="App-link" onClick={displayRazorpay}>
                    Pay ₹50
                </button>
            </header>
        </div>
    );
}

export default App;