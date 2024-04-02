import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'antd';


const WatchList = () => {
  const [indices, setIndices] = useState([]);

  const getIndices = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/get_indices");
      console.log(response.data);
      setIndices(response.data); // Set the fetched data to the state
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getIndices();
  }, []);

  // Define columns for the table
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
    // Add more columns as needed
  ];

  return (
    <>
     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec libero nec nunc commodo viverra. Nullam nec fringilla lacus, id vestibulum sapien. Integer sed est in dolor placerat volutpat. Sed ut justo auctor, fringilla mi nec, fermentum nisi. Ut ac lacus ac libero ultricies tempus. In hac habitasse platea dictumst. Suspendisse non mauris a libero sollicitudin faucibus sed sed enim. Sed ullamcorper, libero nec cursus mattis, ipsum sapien cursus ex, at dictum elit nunc id mauris. Maecenas varius, risus a feugiat posuere, ipsum sem commodo eros, in fringilla turpis lacus eget purus. Sed ultricies libero non orci rhoncus, vitae accumsan nisi bibendum. Vivamus nec vestibulum eros. Aenean et neque id tortor venenatis gravida. Vivamus tincidunt, libero non bibendum dapibus, justo nulla consectetur est, nec dignissim enim eros nec purus. Sed fermentum libero ut nibh varius interdum. Sed non sollicitudin libero.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec libero nec nunc commodo viverra. Nullam nec fringilla lacus, id vestibulum sapien. Integer sed est in dolor placerat volutpat. Sed ut justo auctor, fringilla mi nec, fermentum nisi. Ut ac lacus ac libero ultricies tempus. In hac habitasse platea dictumst. Suspendisse non mauris a libero sollicitudin faucibus sed sed enim. Sed ullamcorper, libero nec cursus mattis, ipsum sapien cursus ex, at dictum elit nunc id mauris. Maecenas varius, risus a feugiat posuere, ipsum sem commodo eros, in fringilla turpis lacus eget purus. Sed ultricies libero non orci rhoncus, vitae accumsan nisi bibendum. Vivamus nec vestibulum eros. Aenean et neque id tortor venenatis gravida. Vivamus tincidunt, libero non bibendum dapibus, justo nulla consectetur est, nec dignissim enim eros nec purus. Sed fermentum libero ut nibh varius interdum. Sed non sollicitudin libero.</p>
      <div className='container'>
        <p>lorem ip</p>
        <h2>WatchList</h2>
        <Table dataSource={indices} columns={columns} />
      </div>
    </>
  );
};

export default WatchList;
