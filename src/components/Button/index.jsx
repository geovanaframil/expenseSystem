import styles from './Button.module.css';

export default function Button({ config, onClick }) {
    function handleClick() {
        if (config.onClick) {
            config.onClick();
        }
        if (onClick) {
            onClick();
        }
    }
    return (
        <button
            className={`${styles.button} ${
                config.type === 'red' ? 'buttonRed' : 'buttonBlue'
            }`}
            onClick={handleClick}
            data-style={config.style}
            style={config?.style}
        >
            {config.name}
        </button>
    );
}
