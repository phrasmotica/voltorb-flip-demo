import { Header, Icon, Modal } from "semantic-ui-react"

import { PButton } from "./PButton"

interface ResetModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    resetGame: () => void
}

export const ResetModal = (props: ResetModalProps) => {
    const reset = () => {
        props.resetGame()
        props.setOpen(false)
    }

    return (
        <Modal
            onClose={() => props.setOpen(false)}
            open={props.open}
            size="mini">
            <Header>
                <Icon name="warning" />
                Reset
            </Header>
            <Modal.Content>
                <p>
                    Are you sure you want to reset the game?
                    This will also clear your level, score and streak!
                </p>
            </Modal.Content>
            <Modal.Actions>
                <PButton colour="green" onClick={reset}>
                    <Icon name="checkmark" />
                    Yes
                </PButton>

                <PButton colour="red" onClick={() => props.setOpen(false)}>
                    <Icon name="remove" />
                    No
                </PButton>
            </Modal.Actions>
        </Modal>
    )
}
