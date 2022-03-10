import { Layout } from "antd";
import React, { useEffect } from "react";
import HeaderBar from "./HeaderBar";
import "antd/dist/antd.css";
import { Table, message, Modal, Input } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AddPlayerModal from "./AddPlayerModal";

const { Content, Footer } = Layout;

const PlayersList = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [players, setPlayers] = useState([]);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Handicap",
      dataIndex: "handicap",
      key: "handicap",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditPlayer(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeletePlayer(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onDeletePlayer = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this player?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        const url = `api/v1/players/${record.id}`;

        fetch(url, {
          method: "delete",
        })
          .then((data) => {
            if (data.ok) {
              reloadPlayers();
              return data.json();
            }
            throw new Error("Network error.");
          })
          .catch((err) => message.error("Error: " + err));
      },
    });
  };

  const onEditPlayer = (record) => {
    setIsEditing(true);
    setEditingPlayer({ ...record });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingPlayer(null);
  };

  const loadPlayers = () => {
    const url = "api/v1/players/index";
    fetch(url)
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error("Network error.");
      })
      .then((data) => {
        const newPlayers = data.map((player) => {
          return {
            key: player.id,
            id: player.id,
            name: player.name,
            handicap: player.handicap,
            location: player.location,
          };
        });
        setPlayers(newPlayers);
      })
      .catch((err) => message.error("Error: " + err));
  };

  const onConfirmEdit = () => {
    const url = `api/v1/players/${editingPlayer.id}`;
    fetch(url, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingPlayer),
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error("Network error.");
      })
      .then(() => {
        resetEditing();
        reloadPlayers();
      })
      .catch((err) => console.error("Error: " + err));
  };

  const reloadPlayers = () => {
    setPlayers([]);
    loadPlayers();
  };

  useEffect(() => {
    loadPlayers();
  }, []);

  const editPlayerModal = () => {
    return (
      <Modal
        title="Edit Player"
        visible={isEditing}
        okText="Save"
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          onConfirmEdit();
        }}
      >
        <Input
          value={editingPlayer?.name}
          onChange={(e) => {
            setEditingPlayer((pre) => {
              return { ...pre, name: e.target.value };
            });
          }}
        />
        <Input
          value={editingPlayer?.handicap}
          onChange={(e) => {
            setEditingPlayer((pre) => {
              return { ...pre, handicap: e.target.value };
            });
          }}
        />
        <Input
          value={editingPlayer?.location}
          onChange={(e) => {
            setEditingPlayer((pre) => {
              return { ...pre, location: e.target.value };
            });
          }}
        />
      </Modal>
    );
  };

  return (
    <Layout className="layout">
      <HeaderBar />
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content" style={{ margin: "100px auto" }}>
          <h1>Players List</h1>
          <Table
            className="table-striped-rows"
            columns={columns}
            dataSource={players}
            pagination={{ pageSize: 5 }}
          ></Table>
          {editPlayerModal()}
          <AddPlayerModal reloadPlayers={reloadPlayers} />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Golf Mngr ©2022.</Footer>
    </Layout>
  );
};

export default PlayersList;
