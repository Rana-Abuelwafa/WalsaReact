import { Navbar } from "react-bootstrap";
import LanguageDropdown from "../Dropdowns/LanguageDropdown";
import "./mainNavbar.scss";

const MiniNavbar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Navbar fixed="top" className="navbar-mini">
      <Container>
        <Navbar.Brand href="/" className="brand">
          <img
            src="logo/wasla logo.png"
            alt="Logo"
            className="logo"
            style={{ width: isMobile ? "100px" : "135px" }}
          />
        </Navbar.Brand>
        <div className="ms-auto d-flex align-items-center">
          <LanguageDropdown />
        </div>
      </Container>
    </Navbar>
  );
};

export default MiniNavbar;
