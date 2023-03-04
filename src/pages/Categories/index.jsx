import { useEffect, useState } from 'react';
import Search from '../../components/Filters/Search';
import getAllCategories from '../../Services/categories.service';
import Table from '../../components/Table';
import styles from './Categories.module.css';
import Button from '../../components/Button';
import OrderBy from '../../components/Filters/OrderBy';

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [categoriesInitial, setCategoriesInitial] = useState([]);

    async function getCategories() {
        const data = await getAllCategories();
        const newData = data.map(item => {
            return {
                id: item.id,
                name: item.name,
                show: true
            };
        });
        setCategories(newData);
        setCategoriesInitial(newData);
    }

    useEffect(() => {
        getCategories();
    }, []);

    function handlerSearch(data) {
        if (data === null) {
            setCategories(categoriesInitial);
        } else {
            setCategories(data);
        }
    }

    const configButtonEdit = {
        name: 'EDITAR',
        style: {
            color: 'white',
            backgroundColor: '#2196F3'
        },
        onClick: () => {
            console.log('Editar');
        }
    };

    const configButtonDelete = {
        name: 'EXCLUIR',
        style: {
            color: '#D32F2F',
            backgroundColor: 'white',
            border: '1px solid #D32F2F80'
        },
        onClick: () => {
            console.log('Deletar');
        }
    };

    const configTable = [
        {
            label: 'ID',
            key: 'id'
        },
        {
            label: 'Categoria',
            key: 'name'
        },
        {
            label: 'Ações',
            key: 'id',
            action: (
                <div className="buttonsWrapper">
                    <Button config={configButtonEdit} />
                    <Button config={configButtonDelete} />
                </div>
            )
        }
    ];

    function handlerOrder(data) {
        setCategories(data);
    }

    return (
        <div className={`${styles.containerCategories} container`}>
            <div className={styles.containerFilters}>
                <Search
                    items={categoriesInitial}
                    findFields={['id', 'name']}
                    onFiltered={data => handlerSearch(data)}
                />
                <OrderBy
                    items={categoriesInitial}
                    orderFields={[
                        {
                            label: 'Id',
                            value: 'id'
                        },
                        {
                            label: 'Categoria',
                            value: 'name'
                        }
                    ]}
                    onOrder={data => handlerOrder(data)}
                />
            </div>
            <Table
                table={'categoria'}
                configs={configTable}
                data={categories}
            />
        </div>
    );
}
