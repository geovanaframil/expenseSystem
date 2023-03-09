import styles from './Filters.module.css';

export default function FilterBy({
    findFields,
    sortFields,
    items,
    term,
    onSorted
}) {
    function handleSelectChange(e) {
        const selected = e.target.value;

        let itemsMaped = items;

        if (findFields) {
            itemsMaped = items.map(item => {
                const show = findFields.some(field => {
                    return String(item[field])
                        .toLowerCase()
                        .includes(term.toLowerCase());
                });

                return { ...item, show };
            });
        }

        if (selected !== '') {
            itemsMaped = itemsMaped.map(item => {
                const show = sortFields.some(field => {
                    return item.show ? item[field.key] === selected : item.show;
                });

                return { ...item, show };
            });
        }

        onSorted(itemsMaped);
    }

    return (
        <div className={styles.filterBy}>
            <label>Filtrar Por:</label>
            <select onChange={handleSelectChange}>
                <option value=""></option>
                {sortFields.map((field, index) => (
                    <option key={index} value={field.value}>
                        {field.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
