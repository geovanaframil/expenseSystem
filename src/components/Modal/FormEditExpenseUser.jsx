import { useContext,useEffect} from 'react';
import styles from './Modal.module.css';
import Button from '../Button';
import { layoutContext } from '../../context/layoutContext';
import { userContext } from '../../context/userContext';
import {fetchEditExpense} from '../../Services/expenses.service';
import { useForm } from 'react-hook-form';
import { maskMoney } from '../../utils/maskMoney';
import { priceFormattedToNumber } from '../../utils/formatPrice';
import { expenseContext } from '../../context/expenseContext';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default function FormEditExpenseUser() {
    const { layout, setLayout } = useContext(layoutContext);
    const { fetchExpense, expense } = useContext(expenseContext);
    const { fetchUser } = useContext(userContext);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            expenseID: layout.modal.id,
            name: layout.modal.name,
            category: layout.modal.category,
            amount: layout.modal.amount,
            status: layout.modal.status
        }
    });

    const notyf = new Notyf({
        ripple: false,
        position: {
            x: 'right',
            y: 'top'
        }
    });

    useEffect(() => {
        const expenseID = layout.modal.id;
        fetchExpense(expenseID);
    }, []);

    function closeModal() {
        setLayout({ ...layout, modal: { open: false } });
    }

    async function handleSave(data) {
        const userID = layout.modal.userID;
        const body = {
            name: data.name,
            categoryID: expense.categoryID,
            userID: layout.modal.userID,
            amount: priceFormattedToNumber(data.amount),
            status: data.status
        };
        await fetchEditExpense(body, data.expenseID);
        fetchUser(userID);

        notyf.success('Despesa editada com sucesso!');
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
            // handleSave();
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
                    <h2>EDITAR DESPESA</h2>
                </div>
                <div className={styles.fields}>
                    <div className={styles.boxField}>
                        <label>ID</label>
                        <input
                            type="text"
                            {...register('expenseID')}
                            disabled
                        />
                    </div>
                    <div className={styles.boxField}>
                        <label>Categoria</label>
                        <input type="text" {...register('category')} disabled />
                    </div>
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
                        <label htmlFor="amount">Valor</label>
                        <input
                            id="amount"
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
                    <div className={styles.boxField}>
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            {...register('status', { required: true })}
                        >
                            <option value="PAGO">Pago</option>
                            <option value="PENDENTE">Pendente</option>
                        </select>
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
