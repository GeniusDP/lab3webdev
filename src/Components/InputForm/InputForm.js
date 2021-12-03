import { useState } from 'react';
import './InputForm.css';
import MyInsertMutation from '../../GQL/MyInsertMutation';
import MyVerticallyCenteredModal from '../MyVerticallyCenteredModal/MyVerticallyCenteredModal';

const InputForm = () => {
    const [showModal, setShowModal] = useState(false);
    const [titleInputValue, setTitleInputValue] = useState('');
    const [textAreaValue, setTextAreaValue] = useState('');
    function onSubmitForm(event) {
        event.preventDefault();
        if (titleInputValue.trim()) {
            new MyInsertMutation(
                titleInputValue.trim(),
                textAreaValue.trim() ||
                    'none'
            )
                .startExecuteMyMutation()
                .then((r) => console.log('r = ' + r))
                .then(() => {
                    //cleaning the form
                    titleInputValue.value =
                        '';
                    textAreaValue.value = '';
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setShowModal(true);
        }
        clearAll()
    }

    const hide = () => setShowModal(false);

    function clearAll() {
            setTextAreaValue('');
            setTitleInputValue('');
    }

    return (
        <form onSubmit={onSubmitForm}>
            <MyVerticallyCenteredModal
                show={showModal}
                onHide={hide}
                headerText={'Forbidden action!'}
            >
                <div>{'You cannot add a new todo with empty fields!'}</div>
            </MyVerticallyCenteredModal>
            <div className={'let-is'}>{'Let is add a new todo!'}</div>
            <input
                name={'titleInput'}
                className={'titleInput'}
                placeholder={'title of new todo'}
                value={titleInputValue}
                onChange={(event) => setTitleInputValue(event.target.value)}
            />
            <textarea
                className={'textarea'}
                name={'textArea'}
                placeholder={'description of the todo'}
                value={textAreaValue}
                onChange={(event) => setTextAreaValue(event.target.value)}
            />
            <div className={'btn-group'}>
                <button
                    className={'btn btn-success add-new-todo-button'}
                    type={'submit'}
                >
                    ADD NEW TODO
                </button>
                <button
                    className={'btn btn-danger add-new-todo-button'}
                    type={'reset'}
                    onClick={clearAll}
                >
                    CLEAR ALL TODO
                </button>
            </div>
        </form>
    );
};

export default InputForm;
