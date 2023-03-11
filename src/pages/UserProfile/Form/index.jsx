import { useContext, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../components/Button';
import { userContext } from '../../../context/userContext';
import updateUser from '../../../Services/updateUser.service';
import styles from './Form.module.css';

export default function Form({ user }) {
    const { fetchUser } = useContext(userContext);

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors }
    } = useForm();

    useEffect(() => {
        let defaultValues = {};
        defaultValues.id = user?.id;
        defaultValues.name = user?.name;
        defaultValues.lastName = user?.lastName;
        defaultValues.email = user?.email;
        reset({ ...defaultValues });
    }, [user]);

    async function handleSave(data) {
        const id = user.id;
        const body = {
            name: data.name,
            lastName: data.lastName,
            email: data.email
        };

        await updateUser(body, id);

        fetchUser(id);
    }

    const configEditButton = {
        name: 'EDITAR',
        style: {
            color: 'white',
            backgroundColor: '#2196F3',
            marginTop: 0
        },
        type: 'blue',
        onClick: () => {}
    };

    return (
        <div className={styles.containerForm}>
            <form onSubmit={handleSubmit(handleSave)}>
                <div>
                    <label className={styles.labelId}>ID</label>
                    <input
                        type="text"
                        className={styles.inputId}
                        {...register('id')}
                        disabled
                    />
                </div>
                <div className={styles.boxField}>
                    <label>Nome</label>
                    <input
                        type="text"
                        {...register('name', { required: true })}
                        className={errors?.name ? styles['error'] : ''}
                    />
                    {errors.name && (
                        <span className={styles.message_error}>
                            Insira o nome
                        </span>
                    )}
                </div>
                <div className={styles.boxField}>
                    <label>Sobrenome</label>
                    <input
                        type="text"
                        {...register('lastName', { required: true })}
                        className={errors?.name ? styles['error'] : ''}
                    />
                    {errors.lastName && (
                        <span className={styles.message_error}>
                            Insira o sobrenome
                        </span>
                    )}
                </div>
                <div className={styles.boxField}>
                    <label>Email</label>
                    <input
                        className={errors?.email ? styles['error'] : ''}
                        type="email"
                        {...register('email', {
                            required: {
                                value: true,
                                message: 'Insira um e-mail'
                            },
                            pattern: {
                                value: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                                message: 'Insira um e-mail válido'
                            }
                        })}
                    />
                    {errors.email && (
                        <span className={styles.message_error}>
                            {errors.email.message}
                        </span>
                    )}
                </div>
                <Button config={configEditButton} />
            </form>
        </div>
    );
}
