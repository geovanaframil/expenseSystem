import styles from './NotFound.module.css';

export default function NotFound() {
    return (
        <div className={`${styles.boxContainer} container`}>
            <h1>404</h1>
            Página não encontrada.
        </div>
    );
}
