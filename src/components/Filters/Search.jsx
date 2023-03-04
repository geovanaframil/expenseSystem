import styles from './Filters.module.css';

export default function Search({ findFields, items, onFiltered }) {
    function handlerChange(e) {
        let inputSearchValue = e.target.value;

        if (inputSearchValue === '') {
            onFiltered(null);
            return;
        }

        const itemsMaped = items.filter(item => {
            return findFields.some(field => {
                return String(item[field].toLowerCase()).includes(
                    inputSearchValue.toLowerCase()
                );
            });
        });

        onFiltered(itemsMaped);
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
