import { Container } from 'react-bootstrap';
import Navbar from './Navbar';
import { CartProvider } from '@/context/context';

export default function Layout({ children }) {
	return (
		<CartProvider>
			<Navbar />
			<Container fluid>{children}</Container>
		</CartProvider>
	);
}
