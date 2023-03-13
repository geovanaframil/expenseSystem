import { useContext, useEffect} from 'react';
import styles from './Modal.module.css';
import Button from '../Button';
import { layoutContext } from '../../context/layoutContext';
import {addNewExpense} from '../../Services/expenses.service';
import { userContext } from '../../context/userContext';
import { useForm } from 'react-hook-form';
import { maskMoney } from '../../utils/maskMoney';
import { priceFormattedToNumber } from '../../utils/formatPrice';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default function FormCreateExpenseByCategory() {
    const { layout, setLayout } = useContext(layoutContext);
    const { fetchUser } = useContext(userContext);

    const currentCategory = layout.modal.user._categories.filter(
        category => category.name === layout.modal.categoryName
    );

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const notyf = new Notyf({
        ripple: false,
        position: {
            x: 'right',
            y: 'top'
        }
    });

    useEffect(() => {
        let defaultValues = {};
        defaultValues.categoryName = currentCategory[0].name;
        defaultValues.userName = `${layout?.modal?.user?.name} ${layout?.modal?.user?.lastName}`;
        reset({ ...defaultValues });
    }, [layout]);

    function closeModal() {
        setLayout({ ...layout, modal: { open: false } });
    }

    async function handleSave(data) {
        const body = {
            name: data.name,
            categoryID: currentCategory[0].id,
            userID: layout.modal.user.id,
            amount: priceFormattedToNumber(data.amount),
            status: 'PENDENTE'
        };

        await addNewExpense(body);
        fetchUser(layout.modal.user.id);

        notyf.success('Despesa criada com sucesso!');
        closeModal();
    }

    const configSaveButton = {
        name: 'SALVAR',
        style: {
            color: 'white',
            backgroundColor: '#2196F3'
        },
        type: 'blue',
        onClick: () => {
        }
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
                    <h2>ADICIONAR DESPESA</h2>
                </div>
                <div className={styles.fields}>
                    <div className={styles.boxField}>
                        <label htmlFor="name">Nome</label>
                        <input
                            className={errors?.name ? styles['error'] : ''}
                            id="name"
                            type="text"
                            {...register('name', { required: true })}
                        />
                        {errors.name && (
                            <span className={styles.message_error}>
                                Insira o nome da despesa
                            </span>
                        )}
                    </div>
                    <div className={styles.boxField}>
                        <label>Categoria</label>
                        <input
                            type="text"
                            {...register('categoryName')}
                            disabled
                        />
                    </div>
                    <div className={styles.boxField}>
                        <label>Usuario</label>
                        <input type="text" {...register('userName')} disabled />
                    </div>
                    <div className={styles.boxField}>
                        <label>Valor</label>
                        <input
                            className={errors?.amount ? styles['error'] : ''}
                            type="text"
                            {...register('amount', {
                                required: true,
                                validate: (value, formValues) =>
                                    Number(value.replace(/\D/g, '')) >= 1,
                                onChange: e => maskMoney(e)
                            })}
                        />
                        {errors.amount && (
                            <span className={styles.message_error}>
                                Insira o valor
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
