import styles from "./Table.module.css";

export default function Table({ config, data }) {
  return (
    <div className="container">
      <table className={styles.table}>
        <thead>
          <tr>
            {config.map((item) => (
              <th key={item.label}>{item.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((usuario, index) => {
            {
              usuario.show && (
                <tr key={index} id={usuario.id}>
                  {config.map((item, index) => (
                    <td
                      key={index}
                      className={styles[item?.style]}
                      attr-key={item.key}
                      attr-value={usuario[item.key]}
                      onClick={() => {
                        item?.onClick && item.onClick(usuario);
                      }}
                    >
                      {usuario?.action || usuario[item.key]}
                    </td>
                  ))}
                </tr>
              );
            }
          })}
        </tbody>
      </table>
    </div>
  );
}
