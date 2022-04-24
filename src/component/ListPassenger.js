import React, { useState } from "react";

const ListPassenger = ({ data, deletePengunjung, updatePengunjung }) => {
  const initialValue = {
    id: "",
    nama: "",
    umur: "",
    jenisKelamin: "",
  };

  const [state, setState] = useState(initialValue);

  const handleDelete = (id) => {
    deletePengunjung({
      variables: {
        id: id,
      },
    });
  };
  const handleEdit = (item) => {
    const editData = {
      id: item.id,
      nama: item.nama,
      umur: item.umur,
      jenisKelamin: item.jenisKelamin,
    };
    console.log(editData);
    setState(editData);
  };

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const formIsNotEmpty = state.nama && state.umur && state.jenisKelamin;
    if (formIsNotEmpty) {
      updatePengunjung({
        variables: {
          id: state.id,
          nama: state.nama,
          umur: state.umur,
          jenisKelamin: state.jenisKelamin,
        },
      });
      setState(initialValue);
      alert("Data Berhasil diupdate");
    } else {
      alert("Data masih ada yang kosong ");
    }
  };
  return (
    <div>
      <table cellPadding="10px" className="m-auto">
        <thead className="bg-danger text-light">
          <tr>
            <th>Id</th>
            <th>Nama</th>
            <th>Umur</th>
            <th>Jenis Kelamin</th>
            <th style={{ textAlign: "center" }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data[0] === null ? (
            <tr>
              <td colSpan="5">Data tidak ada</td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nama}</td>
                <td>{item.umur}</td>
                <td>{item.jenisKelamin}</td>
                <td>
                  <button
                    className="rounded border-0 btn-danger"
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    Hapus
                  </button>
                  <span> | | </span>
                  <button
                    className="rounded border-0 btn-success"
                    onClick={() => {
                      handleEdit(item);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="input-passenger">
        <div className="header">
          <h4>Formulir Edit Pengunjung</h4>
        </div>
        <form onSubmit={handleSubmitEdit} className="create-user">
          <label htmlFor="">Nama: </label>
          <input
            type="text"
            placeholder="Nama"
            onChange={(e) => {
              onChange(e);
            }}
            value={state.nama}
            name="nama"
          />
          <label htmlFor="">Umur: </label>
          <input
            type="number"
            placeholder="Umur"
            onChange={(e) => {
              onChange(e);
            }}
            value={state.umur}
            name="umur"
          />
          <label htmlFor="">Jenis Kelamin:</label>
          <select onChange={onChange} value={state.jenisKelamin} name="jenisKelamin">
            <option value="Pria" defaultValue="Pria">
              Pria
            </option>
            <option value="Wanita">Wanita</option>
          </select>
          <button className="btn-primary rounded border-0" onClick={handleSubmitEdit}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ListPassenger;
