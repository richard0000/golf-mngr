import { Table, message, Popconfirm } from "antd";
import React from "react";
import AddTournamentModal from "./AddTournamentModal";

class Tournaments extends React.Component {
  columns = [
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
      title: "",
      key: "action",
      render: (_text, record) => (
        <Popconfirm
          title="Are you sure delete this tournament?"
          onConfirm={() => this.deleteTournament(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <a href="#" type="danger">
            Delete{" "}
          </a>
        </Popconfirm>
      ),
    },
  ];

  state = {
    tournaments: [],
  };

  componentDidMount() {
    this.loadTournaments();
  }

  loadTournaments = () => {
    const url = "api/v1/tournaments/index";
    fetch(url)
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error("Network error.");
      })
      .then((data) => {
        data.forEach((tournament) => {
          const newEl = {
            key: tournament.id,
            id: tournament.id,
            name: tournament.name,
            course_name: tournament.course_name,
            date: tournament.date,
          };

          this.setState((prevState) => ({
            tournaments: [...prevState.tournaments, newEl],
          }));
        });
      })
      .catch((err) => message.error("Error: " + err));
  };

  reloadTournaments = () => {
    this.setState({ tournaments: [] });
    this.loadTournaments();
  };

  deleteTournament = (id) => {
    const url = `api/v1/tournaments/${id}`;

    fetch(url, {
      method: "delete",
    })
      .then((data) => {
        if (data.ok) {
          this.reloadTournaments();
          return data.json();
        }
        throw new Error("Network error.");
      })
      .catch((err) => message.error("Error: " + err));
  };

  render() {
    return (
      <>
        <Table
          className="table-striped-rows"
          dataSource={this.state.tournaments}
          columns={this.columns}
          pagination={{ pageSize: 5 }}
        />

        <AddTournamentModal reloadTournaments={this.reloadTournaments} />
      </>
    );
  }
}

export default Tournaments;
