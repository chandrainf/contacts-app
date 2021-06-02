import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { useHistory } from "react-router-dom"
import { Typography } from 'antd'
const DetailPage = ({ 
    contacts 
}) => {
    const history = useHistory()
    const { key } = useParams()
    const [contact, setContact] = useState([])

    useEffect(() => {
        const oneContact = contacts.find(function (e) {
            return e.key == key
        })
        setContact(oneContact)
        console.log(a)
    }, [key])

    const a = 'abc'
    const b = '123'

    return (
        <Fragment>
            {console.log(b)}
            <div>
                <Typography.Paragraph>{contact.stt || '---'}</Typography.Paragraph>
            </div>
            <div>
                <Typography.Paragraph>{contact.fullName || '---'}</Typography.Paragraph>
            </div>
            <div>
                <Typography.Paragraph>{contact.email || '---'}</Typography.Paragraph>
            </div>
            <div>
                <Typography.Paragraph>{contact.address || '---'}</Typography.Paragraph>
            </div>
            <div>
                <Button onClick={() => history.push('/')} >Return</Button>
            </div>
        </Fragment>
    )
}



const mapStateToProps = (state) => {
    return {
        contacts: state.contacts && state.contacts.allContacts,
    }
}
export default connect(mapStateToProps)(DetailPage)