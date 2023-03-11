import { useContext } from 'react';
import styles from './Modal.module.css';
import Button from '../Button';
import { layoutContext } from '../../context/layoutContext';
import fetchEditCategory from '../../Services/editCategories.service';
import { categoryContext } from '../../context/categoryContext';
import { useForm } from 'react-hook-form';

export default function EditCategory(props) {
    const { layout, setLayout } = useContext(layoutContext);
    const { fetchCategories } = useContext(categoryContext);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: props?.name
        }
    });

    function closeModal() {
        setLayout({ ...layout, modal: { open: false } });
    }

    async function handleSave(data) {
        await fetchEditCategory(data, props.categoryID);
        fetchCategories();
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
                    <h2>EDITAR CATEGORIA</h2>
                </div>
                <div className={styles.fieldsCategory}>
                    <div className={styles.boxField}>
                        <label className={styles.category}>Categoria</label>
                        <input
                            type="text"
                            {...register('name', { required: true })}
                            className={errors?.name ? styles['error'] : ''}
                        />
                        {errors.name && (
                            <span className={styles.message_error}>
                                Insira o nome da categoria
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
