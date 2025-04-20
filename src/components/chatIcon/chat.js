import { FaWhatsapp } from "react-icons/fa";
import './chat.scss';

const Chat = () => {
    return (
        <a
            href="https://wa.me/01067551474"
            className="whatsapp-button"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
        >
            <FaWhatsapp className="whatsapp-icon" />
        </a>
    );
}

export default Chat;