import React from "react";
import {ColumnProps, RecordDataSource, Table} from "@v-uik/table";
import {createUseStyles} from "react-jss";

type DataSource = RecordDataSource<{ id: number, name: string; price: number }>

export function Good(): JSX.Element {

    const dataSource: DataSource[] = [
        { id: 1, name: 'Суп', price: 100 },
        { id: 2, name: 'Плов', price: 150.60 },
        { id: 3, name: 'Пельмени', price: 175.55 }
    ]

    const columns: ColumnProps<DataSource>[] = [
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
        }
    ]

    return <>
        <Table
            columns={columns}
            dataSource={dataSource}
        />
    </>
}

export default Good
