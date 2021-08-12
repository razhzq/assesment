import { Navbar, Container } from "react-bootstrap";



const Header = () => {
    return ( 
        <div className="navbar">
           <Navbar bg="light">
             <Container>
               <Navbar.Brand>SupplyChainz</Navbar.Brand>
             </Container>
           </Navbar>
        </div>
     );
}
 
export default Header;