import styles from './Filters.module.css';

export default function Search({ findFields, items, onFiltered, onTerm }) {
    function handlerChange(e) {
        let inputSearchValue = e.target.value;

        const itemsMaped = items.map(item => {
            const show = findFields.some(field => {
                return String(item[field].toLowerCase()).includes(
                    inputSearchValue.toLowerCase()
                );
            });

            return { ...item, show };
        });

        onFiltered(itemsMaped);

        if (onTerm) {
            onTerm(inputSearchValue);
        }
    }

    return (
        <>
            <div className={styles.search}>
                <label>Buscar</label>
                <input
                    className={styles.inputSearch}
                    type="text"
                    onChange={handlerChange}
                />
            </div>
        </>
    );
}
