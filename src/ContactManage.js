import 'antd/dist/antd.css';
import React, { useState } from 'react'
import { Button, Table, Layout, Popconfirm } from 'antd'
import { PlusCircleFilled, DeleteOutlined, EditOutlined } from '@ant-design/icons'
import EditContact from './components/EditContact'
import { Fragment } from 'react'
import { connect } from 'react-redux'
import { addContact, deleteContact, editContact } from './redux/contacts/action'
import {
  BrowserRouter as Router,
} from "react-router-dom"
import { useHistory } from "react-router-dom"


const ContactManage = ({
  contacts,
  addContact,
  deleteContact,
  editContact
}) => {

  const [showDrawer, setShowDrawer] = useState(false)
  const [errorInfo, setErrorInfo] = useState({})
  const [contact, setContact] = useState({ fullName: "", email: "", address: "" })
  const [mode, setMode] = useState('add')
  const [key, setEditKey] = useState()
  const history = useHistory()

  const handleAddFormOnFinish = (data) => {
    addContact({
      key: contacts.length + 1,
      stt: contacts.length + 1,
      ...data
    })
    setShowDrawer(false)
  }

  const handleEditFormOnFinish = (data) => {
    editContact({ key, stt: key, ...data })
    setShowDrawer(false)
  }

  const openEditDrawer = (contact, key) => {
    setEditKey(key)
    setContact(contact)
    setShowDrawer(true)
    setMode("edit")
  }
  const handleAddFormOnFinishFailed = (errorInfo) => {
    setErrorInfo(errorInfo)
  }
  const handleOnClose = () => {
    setMode("add")
    setContact({ fullName: "", email: "", address: "" })
    setEditKey()
    setShowDrawer(false)
  }
  // log test
  console.log("error: ", errorInfo)

  // Modified table data
  const columns = [
    {
      title: 'Number',
      dataIndex: 'stt',
      key: 'stt',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: 'Full name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    // {
    //   title: 'Ngày sinh',
    //   key: 'birthDay',  
    //   render: text => moment(text.birthDay).format("DD-MM-YYYY"),
    // },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      dataIndex: 'delete',
      render: (_, contact) =>
        contacts.length >= 1 ? (
          <Fragment>
            <Popconfirm title="Sure to delete?" onConfirm={() => deleteContact(contact.key)}>
              <Button style={{ marginRight: "20px" }}>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
            <Button type="primary" style={{ marginRight: "20px" }} onClick={() => openEditDrawer(contact, contact.key)} >
              <EditOutlined />
            </Button>
            <Router>
              <Button type="primary" onClick={() => { history.push(`/detail/${contact.key}`) }}>
                Detail
              </Button>
            </Router>
          </Fragment>
        ) : null,
    },
  ]
  return (
    <Fragment>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div></div>
        <div>
      <Button type="primary" onClick={() => setShowDrawer(true)}>
        <PlusCircleFilled />
            Add
        </Button>
        </div>
        </div>
      <Layout.Content>
        <Table
          dataSource={contacts}
          columns={columns}
          rowKey="key"
        />
      </Layout.Content>
      {showDrawer && (
        <EditContact
          show={showDrawer}
          handleOnClose={handleOnClose}
          handleOnFinish={handleAddFormOnFinish}
          handleOnFinishFailed={handleAddFormOnFinishFailed}
          initialValues={contact}
          mode={mode}
          handleEditOnFinish={handleEditFormOnFinish}
        />
      )}
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts && state.contacts.allContacts,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addContact: (contact) => {
      dispatch(addContact(contact))
    },
    deleteContact: (key) => {
      dispatch(deleteContact(key))
    },
    editContact: (contact) => {
      dispatch(editContact(contact))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ContactManage)