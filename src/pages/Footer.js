import Button from "react-bootstrap/Button";

const Footer = () => {
    return (
        <footer className="py-4">
            <div id="news-letters" className="my-2 w-100  px-sm-5 py-1 d-flex justify-content-center align-items-center flex-column flex-md-row">
                <div>
                    <h2 className="text-center">Sign up to our newsletter</h2>
                </div>
                <div className="email-input-footer w-50 d-flex flex-column flex-sm-row justify-content-center align-items-center">
                    <input type="email" className="form-control mx-1 w-75" placeholder="input your email"/>
                    <Button variant="light">Subscribe</Button>
                </div>
            </div>
            <div id="news-letters" className="w-75 h-75 d-flex flex-column flex-md-row justify-content-between">
                <div className="w-50">
                    <h2 className="text-center">About us</h2>
                    <p style={{textAlign: "justify"}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vivamus lacinia odio vitae vestibulum. Nulla facilisi.
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                        accusantium doloremque laudantium. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi
                        ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vivamus lacinia odio.
                    </p>
                </div>
                <div className="w-50">
                    <h2 className="font-bold text-center">Contact</h2>
                    <div className="w-100 d-flex flex-column align-items-center">
                        <ul>
                            <li>📍 London, New York, Dubai, Athens</li>
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