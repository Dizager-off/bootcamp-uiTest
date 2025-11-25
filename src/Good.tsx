import React, {useEffect, useState} from "react";
import {ColumnProps, RecordDataSource, Table} from "@v-uik/table";
import {createUseStyles} from "react-jss";
import {Button} from "@v-uik/button";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "@v-uik/modal";
import {Input} from "@v-uik/input";
import {InputNumber} from "@v-uik/input-number";
import {ReactComponent as Plus} from "./assets/plus.svg";
import {notification} from "@v-uik/notification";

export function Good(): JSX.Element {
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

    //Entity field values for modal
    const [selectedId, setSelectedId] = React.useState(0)
    const [selectedGoodName, setSelectedGoodName] = useState("")
    const [selectedGoodPrice, setSelectedGoodPrice] = useState(0)

    //Modal - Create
    const [openCreation, setOpenCreation] = React.useState(false)
    const showModalCreation = () => setOpenCreation(true)
    const hideModalCreation = () => setOpenCreation(false)
    const [good, setGoods] = useState([{id: 0, name: "", price: 0.00}])

    //Modal - Delete
    const [openDelete, setOpenDelete] = React.useState(false)
    const showModalDelete = () => setOpenDelete(true)
    const hideModalDelete = () => setOpenDelete(false)

    type GoodSource = RecordDataSource<{
        id: number
        name: string
        price: number
    }>
    async function loadData() {
        await fetch("http://localhost:8080/good")
            .then(response => response.json())
            .then(response => setGoods(response))
    }
    useEffect(() => {
        loadData()
    }, [])
    async function saveNewGood(method: string) {
        const response = await fetch("http://localhost:8080/good", {
            method: "POST",
            body: JSON.stringify({
                name: selectedGoodName !== "" ? selectedGoodName : null,
                price: selectedGoodPrice !== 0 ? selectedGoodPrice : null
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
    async function deleteGood() {
        const response = await fetch("http://localhost:8080/good/" + selectedId, {
            method: "DELETE"
        })

        if (!response.ok) {
            const message = await response.text();
            notification.error(message)
        }
        hideModalDelete()

        await loadData()
    }
    const columns: ColumnProps<GoodSource>[] = [
        {
            key: 'id',
            dataIndex: 'id',
            title: '№',
        },
        {
            key: 'name',
            dataIndex: 'name',
            title: 'Наименование товара',
        },
        {
            key: 'price',
            dataIndex: 'price',
            title: 'Цена за штуку',
        },
        {
            key: 'delete',
            dataIndex: 'delete',
            renderCellContent: (thiscell) => (
             <Button
                 aria-label="Действие"
                 onClick={() => {
                     setSelectedId(thiscell.row.id)
                     setSelectedGoodName(thiscell.row.name)
                     showModalDelete()
                 }}
                 style={{
                     backgroundColor: "red"
                 }}>
                 Удалить
             </Button>
            ),
        }
    ]

    return <>
        <div className={classesList.main}>
            <div className={classesList.buttonWrapper}>
                <Button kind="contained" color="primary" onClick={() => {
                    setSelectedGoodName("")
                    setSelectedGoodPrice(0)
                    showModalCreation()
                }}>
                    <Plus
                        style={{
                            marginRight: 8,
                        }}/>
                    Создать
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={good}
            />
            <Modal open={openCreation} onClose={hideModalCreation}>
                <ModalHeader
                    closeButtonProps={{
                        'aria-label': 'Close modal',
                    }}
                >
                    Добавить новый товар
                </ModalHeader>
                <ModalBody>
                    <Input label="Наименование" value={selectedGoodName} onChange={setSelectedGoodName}/>
                    <InputNumber label="Цена" value={selectedGoodPrice} onChange={(value:any) => {setSelectedGoodPrice(value)}}/>
                </ModalBody>
                <ModalFooter>
                    <Button kind="outlined" onClick={hideModalCreation}>
                        Отмена
                    </Button>
                    <Button onClick={() => saveNewGood("POST")}>Применить</Button>
                </ModalFooter>
            </Modal>
            <Modal open={openDelete} onClose={hideModalDelete}>
                <ModalHeader
                    closeButtonProps={{
                        'aria-label': 'Close modal',
                    }}
                >
                    Удалить товар
                </ModalHeader>
                <ModalBody>
                    Вы действительно хотите удалить <br/><b>{selectedGoodName}</b>?
                </ModalBody>
                <ModalFooter>
                    <Button kind="outlined" onClick={hideModalDelete}>
                        Отмена
                    </Button>
                    <Button onClick={() => deleteGood()}>Применить</Button>
                </ModalFooter>
            </Modal>
        </div>
    </>
}

export default Good
