import { useContext} from 'react';
import styles from './Modal.module.css';
import Button from '../Button';
import { layoutContext } from '../../context/layoutContext';
import {addNewUser} from '../../Services/users.service';
import { userContext } from '../../context/userContext';
import { useForm } from 'react-hook-form';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default function FormCreateUser() {
    const { layout, setLayout } = useContext(layoutContext);
    const { fetchUsers } = useContext(userContext);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const notyf = new Notyf({
        ripple: false,
        position: {
            x: 'right',
            y: 'top'
        }
    });

    function closeModal() {
        setLayout({ ...layout, modal: { open: false } });
    }

    async function handleSave(data) {
        await addNewUser(data);
        fetchUsers();

        notyf.success('Usuário criado com sucesso!');
        closeModal();
    }

    const configSaveButton = {
        name: 'SALVAR',
        style: {
            color: 'white',
            backgroundColor: '#2196F3'
        },
        type: 'blue',
        onClick: () => {}
    };

    const configCancelButton = {
        name: 'CANCELAR',
        style: {
            color: '#D32F2F',
            backgroundColor: 'transparent',
            border: '1px solid #D32F2F'
        },
        type: 'red',
        onClick: () => {
            closeModal();
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(handleSave)}>
                <div className={styles.titleModal}>
                    <h2>ADICIONAR USUÁRIO</h2>
                </div>
                <div className={styles.fields}>
                    <div className={styles.boxField}>
                        <label>Nome</label>
                        <input
                            className={errors?.name ? styles['error'] : ''}
                            type="text"
                            {...register('name', { required: true })}
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
                            className={errors?.lastName ? styles['error'] : ''}
                            type="text"
                            {...register('lastName', { required: true })}
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
                </div>
                <div className={styles.buttons}>
                    <Button config={configSaveButton} />
                    <Button config={configCancelButton} />
                </div>
            </form>
        </div>
    );
}
