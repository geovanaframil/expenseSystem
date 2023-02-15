import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <nav className={`${styles.navbar} container`}>
                <Link to='/despesas'>Despesas</Link>
                <Link to='/usuarios'>Usuários</Link>
                <Link to='/categorias'>Categorias</Link>
            </nav>
        </header>
    );
}
