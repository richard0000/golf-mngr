import React, { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, message, Table } from "antd";

const TournamentPlayers = ({ tournamentId }) => {
  const [allPlayers, setAllPlayers] = useState([]);
  const [tournamentPlayers, setTournamentPlayers] = useState([]);
  const [addingPlayer, setAddingPlayer] = useState(false);

  const tournamentPlayersColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
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

  const allPlayersColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <Button type="primary" onClick={() => onAddPlayer(record)}>
              Add this player
            </Button>
          </>
        );
      },
    },
  ];

  const onDeletePlayer = (player) => {
    const url = `api/v1/tournament_players/${tournamentId}/remove_player`;
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ player_id: player.id }),
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error("Network error.");
      })
      .then((_data) => {
        loadTournamentPlayers();
      })
      .catch((err) => message.error("Error: " + err));
  };

  const onAddPlayer = (player) => {
    const url = `api/v1/tournament_players/${tournamentId}/add_player`;
    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ player_id: player.id }),
    })
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error("Network error.");
      })
      .then((_data) => {
        loadTournamentPlayers();
        setAddingPlayer(false);
      })
      .catch((err) => message.error("Error: " + err));
  };

  useEffect(() => {
    loadTournamentPlayers();
    loadAllPlayers();
  }, [tournamentId]);

  const loadTournamentPlayers = () => {
    const url = `api/v1/tournament_players/${tournamentId}`;
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
          };
        });

        setTournamentPlayers(newPlayers);
      })
      .catch((err) => message.error("Error: " + err));
  };

  const loadAllPlayers = () => {
    const url = `api/v1/players/index`;
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
          };
        });

        setAllPlayers(newPlayers);
      })
      .catch((err) => message.error("Error: " + err));
  };

  return (
    <>
      {addingPlayer ? (
        <>
          <h4>Adding Player</h4>
          <Table
            className="table-striped-rows"
            dataSource={allPlayers}
            columns={allPlayersColumns}
            pagination={{ pageSize: 5 }}
          />
          <Button type="primary" onClick={() => setAddingPlayer(false)}>
            See the complete List
          </Button>
        </>
      ) : (
        <>
          <h4>Players</h4>
          <Table
            className="table-striped-rows"
            dataSource={tournamentPlayers}
            columns={tournamentPlayersColumns}
            pagination={{ pageSize: 5 }}
          />
          <Button type="primary" onClick={() => setAddingPlayer(true)}>
            Add Player
          </Button>
        </>
      )}
    </>
  );
};

export default TournamentPlayers;
