import { useEffect, useRef, useState } from 'react';
import Button from '../../../components/Button';
import styles from './Form.module.css';

export default function Form({ user }) {
    const idRef = useRef(null);
    const nameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);

    useEffect(() => {
        if (user) {
            idRef.current.value = user?.id;
            nameRef.current.value = user?.name;
            lastNameRef.current.value = user?.lastName;
            emailRef.current.value = user?.email;
        }
    }, [user]);

    function handleSave() {
        const body = {
            name: nameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value
        };

        return body;
    }

    const configEditButton = {
        name: 'EDITAR',
        style: {
            color: 'white',
            backgroundColor: '#2196F3',
            marginTop: 0
        },
        onClick: () => {
            console.log(handleSave());
        }
    };

    function handleSubmit(e) {
        e.preventDefault();
    }

    return (
        <div className={styles.containerForm}>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className={styles.labelId}>ID</label>
                    <input
                        type="text"
                        className={styles.inputId}
                        ref={idRef}
                        disabled
                    />
                </div>
                <div>
                    <label className={styles.name}>
                        Nome
                        <input
                            type="text"
                            className={styles.input}
                            ref={nameRef}
                        />
                    </label>
                </div>
                <div>
                    <label className={styles.lastName}>
                        Sobrenome
                        <input
                            type="text"
                            className={styles.input}
                            ref={lastNameRef}
                        />
                    </label>
                </div>
                <div>
                    <label className={styles.email}>
                        Email
                        <input
                            type="email"
                            className={styles.input}
                            ref={emailRef}
                        />
                    </label>
                </div>
                <Button config={configEditButton} />
            </form>
        </div>
    );
}
