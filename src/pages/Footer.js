import Button from "react-bootstrap/Button";

const Footer = () => {
    return (
        <footer>
            <div id="news-letters" className="my-2 w-75 h-25 px-5 py-1 d-flex justify-content-center align-items-center">
                <div>
                    <h2>Sign up to our newsletter</h2>
                </div>
                <div className="d-flex w-50 justify-content-end">
                    <input type="email" className="form-control w-50 mx-1" placeholder="input your email"/>
                    <Button variant="light">Subscribe</Button>
                </div>
            </div>
            <div id="news-letters" className="w-75 h-75 d-flex justify-content-between">
                <div className="w-50">
                    <h2>About us</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vivamus lacinia odio vitae vestibulum. Nulla facilisi.
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                        accusantium doloremque laudantium. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi
                        ut aliquip ex ea commodo consequat.
                    </p>
                </div>
                <div className="w-50">
                    <h2 className="text-danger font-bold text-center">Contact</h2>
                    <div className="w-100 d-flex flex-column align-items-end">
                        <ul className="mt-4 position ">
                            <li>📍 London, New York, Dubai, Athens, Shangai</li>
                            <li>📞 +1 (212) 555-1234</li>
                            <li>💬 WhatsApp | Telegram | Viber</li>
                            <li>✉️ info@yachtsell.com</li>
                            <li>🕒 07:00AM - 09:00PM | Every Day</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;