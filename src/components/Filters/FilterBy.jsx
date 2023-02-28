import styles from './Filters.module.css';

export default function FilterBy({ sortFields, items, onSorted }) {
    
    function handleSelectChange(e) {
        const selected = e.target.value;

        if(selected === ''){
            onSorted(null)
            return
        }

        const itemsFiltered = items.filter(item => {
            return item.status === selected;
        });

        onSorted(itemsFiltered)
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
