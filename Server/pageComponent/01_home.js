import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Modal } from 'antd';
const { confirm } = Modal;
const Home = () => {
    //State
    const [data, setData] = useState([]);
    const [rawData, setRawData] = useState('');

    useEffect(() => {
        getData()
    }, [setData])

    const deleteModel = (id) => {
        const idToDelete = id;
        confirm({
          title: 'Do you want to delete these items?',
          content: 'When clicked the delete button, your data will be remove permanent',
          okType: 'danger',
          okText: 'Delete',
          onOk() {
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
              deleteData(idToDelete);
            }).catch((error) => console.log('Oops errors!' + error));
          },
          onCancel() {},
        });
      }

    const getData = async () => {
        const result = await axios.get('http://localhost:5000/api/getData');
        console.log(result.data);
        setData(result.data);
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: '1',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Value',
            dataIndex: 'data',
            key: '2',
            onFilter: (value, record) => record.value.indexOf(value) === 0,
            sorter: (a, b) => a.data - b.data,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Time and Date',
            dataIndex: 'date',
            key: '3',
            onFilter: (value, record) => record.value.indexOf(value) === 0,
            sorter: (a, b) => a.date.length - b.data.length,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'x',
            render: (text, record, index) => 
            <a onClick={() => { 
                deleteModel(record.id); 
                }}>Delete
            </a>, // return Json at fetch byID
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    }

    const postData = async () => {
        try {
            await axios.post('http://localhost:5000/api/addData', { 
                data: rawData 
            })
        } catch (err) {
            console.log(err);
        }
    }

    const updateData = async (id) => {

    }

    const deleteData = async (id) => {
        console.log(`Delete ${id}`);
        try {
            await axios.put('http://localhost:5000/api/deleteData', {
                data: {
                    idToDelete: id
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <>
            <button
                onClick={getData}>Refresh Data
            </button>
            <form onSubmit={handleSubmit}>
                <input
                    value={rawData}
                    type='text'
                    onChange={(event) => {
                        setRawData(event.target.value)
                    }}
                />
                <button
                    type="submit"
                    onClick={postData}>Submit
                </button>
            </form>
            <Table
                columns={columns}
                dataSource={data}
                onChange={onChange}
                pagination={{defaultPageSize: 20, showSizeChanger: true, pageSizeOptions: ['20', '30', '40', '50']}}
            />
        </>
    )
}

export default Home