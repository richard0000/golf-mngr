import React, { useEffect, useState } from "react";
import { Layout, Table, message, Modal, DatePicker, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import HeaderBar from "./HeaderBar";
import AddTournamentModal from "./AddTournamentModal";
import moment from "moment";

const { Content, Footer } = Layout;

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTournament, setEditingTournament] = useState(null);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Course Name",
      dataIndex: "course_name",
      key: "course_name",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditTournament(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteTournament(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  useEffect(() => {
    loadTournaments();
  }, []);

  const loadTournaments = () => {
    const url = "api/v1/tournaments/index";
    fetch(url)
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error("Network error.");
      })
      .then((data) => {
        const newTournaments = data.map((tournament) => {
          return {
            key: tournament.id,
            id: tournament.id,
            name: tournament.name,
            course_name: tournament.course_name,
            date: tournament.date,
          };
        });

        setTournaments(newTournaments);
      })
      .catch((err) => message.error("Error: " + err));
  };

  const onDeleteTournament = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this tournament?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        const url = `api/v1/tournaments/${record.id}`;

        fetch(url, {
          method: "delete",
        })
          .then((data) => {
            if (data.ok) {
              reloadTournaments();
              return data.json();
            }
            throw new Error("Network error.");
          })
          .catch((err) => message.error("Error: " + err));
      },
    });
  };

  const reloadTournaments = () => {
    setTournaments([]);
    loadTournaments();
  };

  const onEditTournament = (record) => {
    setIsEditing(true);
    setEditingTournament({ ...record });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditingTournament(null);
  };

  const onConfirmEdit = () => {
    const url = `api/v1/tournaments/${editingTournament.id}`;
    fetch(url, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editingTournament),
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error("Network error.");
      })
      .then(() => {
        resetEditing();
        reloadTournaments();
      })
      .catch((err) => console.error("Error: " + err));
  };

  const editTournamentModal = () => {
    return (
      <Modal
        title="Edit Tournament"
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
          value={editingTournament?.name}
          onChange={(e) => {
            setEditingTournament((pre) => {
              return { ...pre, name: e.target.value };
            });
          }}
        />
        <Input
          value={editingTournament?.course_name}
          onChange={(e) => {
            setEditingTournament((pre) => {
              return { ...pre, course_name: e.target.value };
            });
          }}
        />
        <DatePicker
          value={moment(editingTournament?.date)}
          allowClear={false}
          onChange={(date) => {
            setEditingTournament((pre) => {
              return { ...pre, date: date };
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
          <h1>Tournaments List</h1>
          <Table
            className="table-striped-rows"
            dataSource={tournaments}
            columns={columns}
            pagination={{ pageSize: 5 }}
          />
          {editTournamentModal()}
          <AddTournamentModal reloadTournaments={reloadTournaments} />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>Golf Mngr ©2022.</Footer>
    </Layout>
  );
};

export default Tournaments;
