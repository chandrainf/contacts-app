import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Drawer, Input, Form, Button } from 'antd'


const EditDrawer = ({
  show,
  handleOnClose,
  handleOnFinish,
  handleOnFinishFailed,
  initialValues,
  mode,
  handleEditOnFinish
}) => {
  const [form] = Form.useForm()
  return (
    <Drawer
      placement="right"
      width={412}
      title={`${mode === "edit" ? "Edit Contact" : "Add Contact"} `}
      visible={show}
      onClose={handleOnClose}
      maskClosable={true}
      destroyOnClose={true}
    >
      <Form
        form={form}
        initialValues={initialValues}
        onFinish={mode === "edit" ? handleEditOnFinish : handleOnFinish}
        onFinishFailed={handleOnFinishFailed}
        layout="vertical"

      >
        <Form.Item
          label="Enter name"
          name="fullName"
          rules={[{ required: true, message: 'Please enter a name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Enter Email"
          name="email"
          rules={[{ type: "email", message: 'Please enter the correct email format!' }, { required: true, message: 'Please enter your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Enter address"
          name="address"
          rules={[{ required: true, message: 'Please enter your address!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Fragment>
            <Button type="primary" htmlType="submit" style={{ marginRight: "20px" }}>
              {mode === "edit" ? "Edit" : "Add"}
            </Button>
            <Button htmlType="button" onClick={() => form.resetFields()}>
              Reset
            </Button>
          </Fragment>
        </Form.Item>
      </Form>
    </Drawer>
  )

}

EditDrawer.propTypes = {
  show: PropTypes.bool.isRequired,
  handleOnClose: PropTypes.func.isRequired,
  handleOnFinish: PropTypes.func.isRequired,
  handleOnFinishFailed: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  handleEditOnFinish: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(["add", "edit"])
}

export default EditDrawer