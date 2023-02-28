import { useEffect, useState } from 'react';
import styles from './Filters.module.css';

{/* <SelectSort  sortField="name" fields={[
  {
    label: 'Pago', 
    value: 'pago'
  },  {
    label: 'Pendente', 
    value: 'pentend'
  }]} 
  data={users} 
  onSorted={(data)=> setUsers(data) }}
></SelectSort> */}

function FilterBy({data, setExpensesFiltered}) {
    const [selectedStatus, setSelectedStatus] = useState('');

    useEffect(() => {
            let dataCopy = [...data];
   
            switch (selectedStatus) {
                case 'PAGO':
                case 'PENDENTE':
                    dataCopy = dataCopy.filter(item => item.status === selectedStatus)
                    break;
                default:
                    setExpensesFiltered(data);
            }

            setExpensesFiltered(dataCopy);
       
    }, [selectedStatus]);

    const handleSelectChange = e => {
        setSelectedStatus(e.target.value);
    };

    return (
        <div className={styles.filterBy}>
            <label>Filtrar Por:</label>
            <select value={selectedStatus} onChange={handleSelectChange}>
                <option></option>
                <option value="PAGO">Pago</option>
                <option value="PENDENTE">Pendente</option>
            </select>
        </div>
    );
}

export default FilterBy;
