import { Button, Form, Input, Modal, Select } from "antd";
import React from "react";

class AddPlayerModal extends React.Component {
  formRef = React.createRef();
  state = {
    visible: false,
  };

  onFinish = (values) => {
    const url = "api/v1/players/";
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
        this.props.reloadPlayers();
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
          title="Add New Player ..."
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form ref={this.formRef} layout="vertical" onFinish={this.onFinish}>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                { required: true, message: "Please input your player's name!" },
              ]}
            >
              <Input placeholder="Input your player's name" />
            </Form.Item>

            <Form.Item
              name="handicap"
              label="Style"
              rules={[
                {
                  required: true,
                  message: "Please input your player's handicap!",
                },
              ]}
            >
              <Input
                type="number"
                min={1}
                max={50}
                placeholder="Input your player's handicap"
              />
            </Form.Item>

            <Form.Item
              name="location"
              label="Location"
              rules={[
                {
                  required: true,
                  message: "Please input your player's location!",
                },
              ]}
            >
              <Input
                type="text"
                pattern="^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$"
                placeholder="Input your player's location"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Requested format: 'latitude,longitude'"
              />
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

export default AddPlayerModal;
