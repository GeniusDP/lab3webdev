import { Button, Modal } from 'react-bootstrap';

export default function MyVerticallyCenteredModal({
    onHide,
    show,
    headerText,
    children,
}) {
    return (
        <div onClick={(e) => e.stopPropagation()}>
            <Modal
                show={show}
                onHide={onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {headerText}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>{children}</Modal.Body>
                <Modal.Footer>
                    <Button onClick={onHide} className={'btn btn-danger'}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
