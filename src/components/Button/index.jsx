import styles from './Button.module.css';

export default function Button({ config }) {
    return (
        <button
            className={styles.button}
            onClick={config.onClick}
            data-style={config.style}
            style={config?.style}
        >
            {config.name}
        </button>
    );
}
