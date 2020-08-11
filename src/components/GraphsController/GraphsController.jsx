import React, {useState} from "react";
import classes from './GraphsController.module.css';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

const NodeController = (props) => {
    return (
        <ListGroup horizontal>
            <ListGroup.Item className={classes.nodeElem + " " + classes.nodeElem + props.id} action>
                <p>Node Id: {props.id}</p>
            </ListGroup.Item>
            <ListGroup.Item className={classes.nodeElem + " " + classes.nodeElem + props.id } action>
                <p>Node Label: {props.label}</p>
            </ListGroup.Item>
        </ListGroup>
    )
};

const GraphsController = (props) => {

    let state = props.controllerPage.nodes;
    let nodesList = state.map (nodeElement =>
    <NodeController id={nodeElement.id} label={nodeElement.label} key={nodeElement.id} />
    );


    function ModalForNewNode() {
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        let newToElement = React.createRef();
        let newLabelElement = React.createRef();
        let setLabel = () => { return  newLabelElement.current.value };
        let setTo = () => { return  newToElement.current.value };
        let onAddNode = () => {
            let nodeSetTo = parseInt(setTo());
            let nodeSetLabel = setLabel();
            if (nodeSetTo <= props.controllerPage.nodes.length) {
                props.addNode(nodeSetLabel, nodeSetTo);
            }
            else {
                alert("this node dose not exist");
            }
        };
        return (
            <>
                <Button variant="primary" onClick={handleShow}>
                    Add node
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Handle new node</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-lg">Node Label</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl aria-label="Small" onChange={setLabel} ref={newLabelElement} aria-describedby="inputGroup-sizing-sm" />
                        </InputGroup>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-sm">To</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl aria-label="Small" onChange={setTo} ref={newToElement} aria-describedby={"inputGroup-sizing-sm"} />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={onAddNode}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

            </>
        );
    }

    return (
        <div className={classes.nodesList}>
            <ListGroup className={classes.listGroup}>
                {nodesList}
            </ListGroup>

            <ModalForNewNode />
        </div>
    )
};

export default GraphsController;
