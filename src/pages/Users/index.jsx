import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import OrderBy from '../../components/Filters/OrderBy';
import Search from '../../components/Filters/Search';
import Summary from '../../components/Summary';
import Table from '../../components/Table';
import { formatPrice } from '../../utils/formatPrice';
import styles from './Users.module.css';
import { layoutContext } from '../../context/layoutContext';
import { userContext } from '../../context/userContext';

export default function Users() {
    const { layout, setLayout } = useContext(layoutContext);
    const navigate = useNavigate();

    const { users, setUsers, usersInitial, fetchUsers } = useContext(userContext);

    useEffect(() => {
        fetchUsers();
    }, []);

    function handlerSearch(data) {
        if (data === null) {
            setUsers(usersInitial);
        } else {
            setUsers(data);
        }
    }

    const configTable = [
        {
            label: 'ID',
            key: 'id'
        },
        {
            label: 'Usuario',
            key: 'email',
            style: 'blue',
            onClick: user => {
                navigate(`/usuarios/${user.id}`);
            }
        },
        {
            label: 'Pago',
            key: 'PAGO',
            style: 'green'
        },
        {
            label: 'Pendente',
            key: 'PENDENTE',
            style: 'red'
        }
    ];

    const configButton = {
        name: 'ADICIONAR USUÁRIO',
        style: {
            color: 'white',
            backgroundColor: '#2196F3'
        },
        type: 'blue',
        onClick: () => {
            setLayout({
                ...layout,
                modal: { show: true, action: 'CreateUser' }
            });
        }
    };

    return (
        <div className={`${styles.containerUsers} container`}>
            <Summary data={users} page="users" />
            <div className={styles.containerFilters}>
                <Search
                    items={users}
                    findFields={['id', 'email']}
                    onFiltered={data => handlerSearch(data)}
                />
                <OrderBy
                    items={users}
                    orderFields={[
                        {
                            label: 'Id',
                            value: 'id'
                        },
                        {
                            label: 'Usuário',
                            value: 'email'
                        },
                        {
                            label: 'Pago',
                            value: 'PAGO'
                        },
                        {
                            label: 'Pendente',
                            value: 'PENDENTE'
                        }
                    ]}
                    onOrder={data => handlerSearch(data)}
                />
            </div>
            <Table configs={configTable} data={users} />
            <div className={styles.wrapperButton}>
                <Button config={configButton} />
            </div>
        </div>
    );
}
