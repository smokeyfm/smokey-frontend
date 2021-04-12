import React, { Component } from 'react'
import Image from 'next/image'
import Drawer from 'react-drag-drawer'

interface Props {

}
interface S {
    toggle: boolean;
    ModalOpen: boolean;
}
export class Popup extends Component<Props, S> {
    constructor(props: Props) {
        super(props)
        this.state = {
            toggle: false,
            ModalOpen: false
        }
    }
    render() {
        return (
            <div>
                <div style={{
                    cursor: 'pointer',
                    position: 'absolute', top: 5, right: 5, zIndex: 999
                }}>
                    <Image
                        src="/img/question-mark.png"
                        alt="Picture of the author"
                        width={24}
                        height={24}
                        onClick={() => this.setState({ ModalOpen: true })}
                    />
                </div>
                <Drawer open={this.state.ModalOpen}>
                    <div style={{
                        backgroundColor: '#fff',
                        width: 400, height: 300,
                        padding: 10,
                        display: 'flex',
                        justifyContent: 'space-between',
                        zIndex: 99999,
                        borderRadius: 5
                    }}>

                        <div>Hi There!</div>
                        <div style={{ cursor: 'pointer' }}>
                            <Image
                                src="/img/cancel.png"
                                alt="Picture of the author"
                                width={24}
                                height={24}
                                onClick={() => this.setState({ ModalOpen: false })} />
                        </div>
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default Popup
