import { Button, Form, Input, Modal, DatePicker } from "antd";
import React from "react";

class AddTournamentModal extends React.Component {
  formRef = React.createRef();
  state = {
    visible: false,
  };

  onFinish = (values) => {
    const url = "api/v1/tournaments/";
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((data) => {
        if (data.ok) {
          this.handleCancel();

          return data.json();
        }
        throw new Error("Network error.");
      })
      .then(() => {
        this.props.reloadTournaments();
      })
      .catch((err) => console.error("Error: " + err));
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Create New +
        </Button>

        <Modal
          title="Add New Tournament ..."
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form ref={this.formRef} layout="vertical" onFinish={this.onFinish}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please input your tournament's name!",
                },
              ]}
            >
              <Input placeholder="Input your tournament's name" />
            </Form.Item>

            <Form.Item
              name="course_name"
              label="Course Name"
              rules={[
                {
                  required: true,
                  message: "Please input your tournament's course_name!",
                },
              ]}
            >
              <Input placeholder="Input your tournament's course_name" />
            </Form.Item>

            <Form.Item
              name="date"
              label="Date"
              rules={[
                {
                  required: true,
                  message: "Please input your tournament's date!",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default AddTournamentModal;
