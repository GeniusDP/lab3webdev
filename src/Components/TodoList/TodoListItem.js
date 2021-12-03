import { useState } from 'react';
import './TodoListItem.css';
import MyVerticallyCenteredModal from '../MyVerticallyCenteredModal/MyVerticallyCenteredModal';
import MyUpdateMutation from '../../GQL/MyUpdateMutation';

const TodoListItem = ({
    created_at,
    description,
    id,
    title,
    deleteElementById,
    isDone,
}) => {
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const classNames = ['todoListItem'];
    if (isDone) {
        classNames.push('is-done');
    }

    function mainDivOnClick(event) {
        event.preventDefault();
        new MyUpdateMutation(id, isDone)
            .startExecuteUpdate()
            .catch(() => setShowErrorModal(true));
    }

    function helpButtonWarning(event) {
        event.stopPropagation();
        setShowInfoModal(true);
    }

    function deleteButtonOnClick(event) {
        event.stopPropagation();
        if (isDone) deleteElementById(id);
        else setShowDeleteModal(true);
    }
    const hideErrorModal = ()=> {
        setShowErrorModal(false);
    };
    return (
        <div className={classNames.join(' ')} onClick={mainDivOnClick}>
            {/*modal for info button*/}
            <MyVerticallyCenteredModal
                show={showInfoModal}
                onHide={() => setShowInfoModal(false)}
                headerText={'Details about this todo...'}
            >
                <div>{'Title: ' + title}</div>
                <div>{'Description: ' + description}</div>
                <div>{'Create time: ' + created_at}</div>
            </MyVerticallyCenteredModal>
            <MyVerticallyCenteredModal
                show={showErrorModal}
                onHide={hideErrorModal}
                headerText={'Lost internet connection!'}
            >
                <div>{'Your internet connection is not stable. Try later. This operation was denied.'}</div>
            </MyVerticallyCenteredModal>
            {/*modal for delete button*/}
            <MyVerticallyCenteredModal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                headerText={'Forbidden action!'}
            >
                {
                    'You have to mark it like "done" before deleting! Click on todo to mark it "done".'
                }
            </MyVerticallyCenteredModal>
            <div className={'itemTitle'}>{title}</div>
            <button className={'btn btn-warning'} onClick={helpButtonWarning}>
                &hellip;
            </button>
            <button className={'btn btn-danger'} onClick={deleteButtonOnClick}>
                &#10006;
            </button>
        </div>
    );
};

export default TodoListItem;
