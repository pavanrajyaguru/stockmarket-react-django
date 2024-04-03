import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Spin } from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons'
const WatchList = () => {
  const [indices, setIndices] = useState([]);
  const [loading, setLoading] = useState(false);

  const getIndices = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/get_indices");
      setIndices(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleAddToWatchList = async(symbol) =>{
    try{
      const response = await axios.post("http://127.0.0.1:8000/add_to_watchlist",{
        id : 1,
        index : symbol,
        watchlist_name : "abc"
      })
      console.log(response,"addwatchlist")

    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    getIndices();
  }, []);

  const columns = [
   
    {
      title: 'Company Name',
      dataIndex: 'companyName',
      key: 'companyName',
      render: (text, record) => <span>{record.meta.companyName}</span>
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
      title : 'Action',
      dataIndex : 'action',
      render : (text, record) => {
        console.log("Records Data : ",record);
        return(
          <>
            <PlusCircleOutlined onClick={handleAddToWatchList(record.symbol)}/>
          </>
          )
      }
    }
  ];

  return (
    <div className='container' style={{marginTop:"100px"}}>
      <h2>WatchList</h2>
      {loading ? (
        <Spin size="large" />
      ) : indices.length ? (
        <Table dataSource={indices} columns={columns} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default WatchList;
