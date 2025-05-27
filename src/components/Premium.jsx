import axios from "axios";
import { BASE_URL } from "../utils/constants";

const premium = () => {

    const handleBuyClick = async (membershipType) => {

        const order = await axios.post(BASE_URL + "/payment/create", {
            membershipType
        }, { withCredentials: true });

        // console.log(order?.data?.data);
        //It should open the payment gateway here(Razorpay Dialog box)

        const { amount, keyId, currency, notes, orderId, } = order.data;

        // Open Razorpay Checkout
        const options = {
            key: keyId, // Replace with your Razorpay key_id
            amount,
            currency,
            name: 'Dev Tinder',
            description: 'Purchase Membership',
            order_id: orderId, // This is the order_id created in the backend
            prefill: {
                name: notes?.firstName + " " + notes?.lastName,
                email: notes?.emailId,
            },
            theme: {
                color: '#F37254'
            },
        };



        const rzp = new window.Razorpay(options);
        rzp.open();


    }
    return (
        <div className="py-10 px-4">
            <div className="flex w-full">
                <div className="card bg-base-300 rounded-box grid h-auto grow place-items-center py-8">
                    <h1 className="font-bold text-2xl mb-2.5">Silver Membership</h1>
                    <ul>
                        <li> - Access to exclusive content</li>
                        <li> - Priority support</li>
                        <li> - Monthly newsletter</li>
                        <li> - Discounts on merchandise</li>
                        <li> - 3 Months Blue Tick</li>
                    </ul>
                    <button className="btn btn-primary mt-5" onClick={() => { handleBuyClick("silver") }}>Buy Silver</button>
                </div>
                <div className="divider divider-horizontal">OR</div>
                <div className="card bg-base-300 rounded-box grid h-auto grow place-items-center py-8">
                    <h1 className="font-bold text-2xl mb-2.5">Gold Membership</h1>
                    <ul>
                        <li> - All Silver benefits</li>
                        <li> - Early access to new features</li>
                        <li> - Personalized content recommendations</li>
                        <li> - Access to premium community forums</li>
                        <li> - 6 Months Blue Tick</li>
                    </ul>
                    <button className="btn btn-secondary mt-5" onClick={() => { handleBuyClick("gold") }}>Buy Gold</button>
                </div>
            </div>
        </div>
    );
};

export default premium;
