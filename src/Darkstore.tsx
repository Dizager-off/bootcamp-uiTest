import React, {useEffect, useState} from "react"
import {ColumnProps, RecordDataSource, Table} from "@v-uik/table"
import {createUseStyles} from "react-jss"
import {Button} from "@v-uik/button"
import {Modal, ModalBody, ModalFooter, ModalHeader} from "@v-uik/modal"
import {Input} from "@v-uik/input"
import {ReactComponent as Plus} from "./assets/plus.svg"
import {notification} from "@v-uik/notification"

export function Darkstore(): JSX.Element {
    const useStyles = createUseStyles({
        main: {
            backgroundColor: '#fff',
            margin: [112, 16, 0, 16],
            borderRadius: 5,
            padding: 32,
        },
        buttonWrapper: {
            display: 'flex',
            marginBottom: 16,
            justifyContent: 'flex-end',
        }
    })
    const classesList = useStyles()

    const [selectedId, setSelectedId] = useState(0)
    const [selectedAddress, setSelectedAddress] = useState("")

    const [openCreation, setOpenCreation] = useState(false)
    const showModalCreation = () => setOpenCreation(true)
    const hideModalCreation = () => setOpenCreation(false)

    const [darkstores, setDarkstores] = useState<{id: number, address: string}[]>([])

    const [openDelete, setOpenDelete] = useState(false)
    const showModalDelete = () => setOpenDelete(true)
    const hideModalDelete = () => setOpenDelete(false)

    const [openUpdate, setOpenUpdate] = useState(false)
    const showModalUpdate = () => setOpenUpdate(true)
    const hideModalUpdate = () => setOpenUpdate(false)

    type DarkstoreSource = RecordDataSource<{
        id: number
        address: string
    }>

    async function loadData() {
        await fetch("http://localhost:8080/darkstore")
            .then(response => response.json())
            .then(response => setDarkstores(response))
    }

    useEffect(() => {
        loadData()
    }, [])

    async function createDarkstore() {
        const response = await fetch("http://localhost:8080/darkstore", {
            method: "POST",
            body: JSON.stringify({
                address: selectedAddress !== "" ? selectedAddress : null,
            }),
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            }
        })

        if (!response.ok) {
            const message = await response.text()
            notification.error(message)
        }

        hideModalCreation()
        await loadData()
    }

    async function deleteDarkstore() {
        const response = await fetch("http://localhost:8080/darkstore/" + selectedId, {
            method: "DELETE"
        })

        if (!response.ok) {
            const message = await response.text()
            notification.error(message)
        }

        hideModalDelete()
        await loadData()
    }

    async function updateDarkstore() {
        const response = await fetch("http://localhost:8080/darkstore", {
            method: "PUT",
            body: JSON.stringify({
                id: selectedId,
                address: selectedAddress !== "" ? selectedAddress : null,
            }),
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            }
        })

        if (!response.ok) {
            const message = await response.text()
            notification.error(message)
        }

        hideModalUpdate()
        await loadData()
    }

    const columns: ColumnProps<DarkstoreSource>[] = [
        {
            key: 'id',
            dataIndex: 'id',
            title: '№',
            width: 60,
        },
        {
            key: 'address',
            dataIndex: 'address',
            title: 'Адрес склада',
        },
        {
            key: 'edit',
            dataIndex: 'edit',
            renderCellContent: (cell) => (
                <Button
                    aria-label="Редактировать"
                    onClick={() => {
                        setSelectedId(cell.row.id)
                        setSelectedAddress(cell.row.address)
                        showModalUpdate()
                    }}
                    style={{
                        backgroundColor: "blue",
                        color: 'white'
                    }}
                >
                    Изменить
                </Button>
            ),
            width: 140,
        },
        {
            key: 'delete',
            dataIndex: 'delete',
            renderCellContent: (cell) => (
                <Button
                    aria-label="Удалить"
                    onClick={() => {
                        setSelectedId(cell.row.id)
                        setSelectedAddress(cell.row.address)
                        showModalDelete()
                    }}
                    style={{
                        backgroundColor: "red",
                        color: 'white'
                    }}
                >
                    Удалить
                </Button>
            ),
            width: 140,
        }
    ]

    return <>
        <div className={classesList.main}>
            <div className={classesList.buttonWrapper}>
                <Button kind="contained" color="primary" onClick={() => {
                    setSelectedAddress("")
                    showModalCreation()
                }}>
                    <Plus
                        style={{
                            marginRight: 8,
                        }}
                    />
                    Создать
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={darkstores}
            />
            <Modal open={openCreation} onClose={hideModalCreation}>
                <ModalHeader
                    closeButtonProps={{
                        'aria-label': 'Close modal',
                    }}
                >
                    Добавить новый склад
                </ModalHeader>
                <ModalBody>
                    <Input label="Адрес" value={selectedAddress} onChange={setSelectedAddress}/>
                </ModalBody>
                <ModalFooter>
                    <Button kind="outlined" onClick={hideModalCreation}>
                        Отмена
                    </Button>
                    <Button onClick={() => createDarkstore()}>Создать</Button>
                </ModalFooter>
            </Modal>
            <Modal open={openUpdate} onClose={hideModalUpdate}>
                <ModalHeader
                    closeButtonProps={{
                        'aria-label': 'Close modal',
                    }}
                >
                    Изменить адрес склада
                </ModalHeader>
                <ModalBody>
                    <Input label="ID" value={selectedId.toString()} disabled/>
                    <Input label="Наименование" value={selectedAddress} onChange={setSelectedAddress}/>
                </ModalBody>
                <ModalFooter>
                    <Button kind="outlined" onClick={hideModalUpdate}>
                        Отмена
                    </Button>
                    <Button onClick={() => updateDarkstore()}>Сохранить</Button>
                </ModalFooter>
            </Modal>
            <Modal open={openDelete} onClose={hideModalDelete}>
                <ModalHeader
                    closeButtonProps={{
                        'aria-label': 'Close modal',
                    }}
                >
                    Удалить склад
                </ModalHeader>
                <ModalBody>
                    Вы действительно хотите удалить адрес склада <b>{selectedAddress}</b>?
                </ModalBody>
                <ModalFooter>
                    <Button kind="outlined" onClick={hideModalDelete}>
                        Отмена
                    </Button>
                    <Button onClick={() => deleteDarkstore()}>Удалить</Button>
                </ModalFooter>
            </Modal>
        </div>
    </>
}

export default Darkstore
