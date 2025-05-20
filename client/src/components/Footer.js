import Nav from 'react-bootstrap/Nav';
import { RAFTINGCATALOG_ROUTE, RENTCATALOG_ROUTE, FAQ_ROUTE } from '../utils/consts';

const Footer = () => {
    return (
        <div style={{}}>
            <footer style={{position:'fixed',bottom: 0, left: 0, width: '100%', backgroundColor: '#343a40' }}>
                <Nav className="justify-content-center" activeKey="/home">
                    <Nav.Item>
                        <Nav.Link href={RAFTINGCATALOG_ROUTE} style={{color:'white'}}>Сплавы</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href={RENTCATALOG_ROUTE} style={{color:'white'}}>Прокат</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href={FAQ_ROUTE} style={{color:'white'}}>Вопросы</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Nav className="justify-content-end" activeKey="/home">
                    <Nav.Item>
                        <Nav.Link href="https://github.com/ArtemidiyIII/Kursovoi_svch" style={{color:'white'}}>GitHub</Nav.Link>
                    </Nav.Item>
                </Nav>
            </footer>
        </div>
    );
}

export default Footer;