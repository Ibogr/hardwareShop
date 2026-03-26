import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

function Payment({ total, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async () => {
    try {
      if (!stripe || !elements) {
        alert("Stripe not loaded yet");
        return;
      }

      const token = localStorage.getItem("token");

      // 🔥 DOĞRU ENDPOINT
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/orders/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ amount: total }),
        }
      );

      const { clientSecret } = await res.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        console.error(result.error.message);
        alert(result.error.message);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        alert("Payment successful!");
        onSuccess(); // 👉 order oluştur
      }
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <div>
      <CardElement
        className="form-control p-2 mb-3"
        options={{ hidePostalCode: true }}
      />
      <button className="btn btn-success" onClick={handleSubmit}>
        Pay € {total}
      </button>
    </div>
  );
}

export default Payment;
