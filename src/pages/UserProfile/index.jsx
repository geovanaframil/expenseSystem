import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { userContext } from '../../context/userContext';
import Form from './Form';
import styles from './UserProfile.module.css';

export default function UserProfile() {
    const { userId } = useParams();
    const { fetchUsers, usersAllData, setUsersAllData } =
        useContext(userContext);

    const correctUser = usersAllData.filter(user => user.id === userId)[0];

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className={`${styles.containerUser}`}>
            <div className={styles.titleData}>
                <h2>DADOS CADASTRAIS</h2>
            </div>
            <div className={styles.line}></div>
            <Form user={correctUser} />
        </div>
    );
}
