import styles from './Table.module.css';

export default function Table({ configs, data, ...props }) {
    return (
        <div className="container">
            <table
                className={`${styles.table} ${
                    props.table ? 'table_fixed' : ''
                }`}
            >
                <thead>
                    <tr>
                        {configs.map(item => (
                            <th key={item.label}>{item.label}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            item?.show && (
                                <tr key={index} id={item.id}>
                                    {configs.map((config, index) => (
                                        <td
                                            key={index}
                                            className={styles[config?.style]}
                                            attr-key={config.key}
                                            attr-value={item[config.key]}
                                            onClick={() => {
                                                config?.onClick &&
                                                    config.onClick(item);
                                            }}
                                        >
                                            {(config?.action &&
                                                config.action(item)) ||
                                                item[config.key]}
                                        </td>
                                    ))}
                                </tr>
                            )
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
