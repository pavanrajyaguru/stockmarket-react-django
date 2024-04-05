import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spin, Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const WatchList_Get = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const id = localStorage.getItem("id");

    useEffect(() => {
        getWatchList();
    }, []);

    const getWatchList = async() => {
        setLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:8000/get_watchlist", {
                user_id: id
            });
            console.log(response.data, "response");
            setData(response.data);
        } catch (error) {
            console.log(error, "error");
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Company Name',
            dataIndex: 'companyName',
            key: 'companyName',
            render: (text, record) => 
            {console.log(record,"Record")}
            // (
            //     <span>{record.meta.companyName}</span>
            // )
        },
        {
            title: 'Symbol',
            dataIndex: 'symbol',
            key: 'symbol',
            render: (text, record) => <span>{record.symbol}</span>
        },
        {
            title: 'Day High',
            dataIndex: 'dayHigh',
            key: 'dayHigh',
            render: (text, record) => <span>{record.dayHigh}</span>
        },
        {
            title: 'Day Low',
            dataIndex: 'dayLow',
            key: 'dayLow',
            render: (text, record) => <span>{record.dayLow}</span>
        },
        {
            title: '% Change',
            dataIndex: 'pChange',
            key: 'pChange',
            render: (text, record) => <span>{record.pChange}</span>
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (text, record) => {
                console.log("Records Data : ", record);
                return (
                    <>
                        <DeleteOutlined />
                    </>
                );
            }
        }
    ];

    return (
        <>
            <h2>My WatchList</h2>
            {loading ? (
                <Spin size="large" />
            ) : data && data.length > 0 ? (
                <Table dataSource={data} columns={columns} />
            ) : (
                <p>No data available</p>
            )}
        </>
    );
};

export default WatchList_Get;
