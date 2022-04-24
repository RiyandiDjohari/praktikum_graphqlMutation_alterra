import React, { useState } from "react";

function InputPassenger({ insertPengunjung, updatePengunjung }) {
  const initialValue = { nama: "", umur: "", jenisKelamin: "Pria" };
  const [state, setState] = useState(initialValue);

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formIsNotEmpty = state.nama && state.umur && state.jenisKelamin;
    if (formIsNotEmpty) {
      insertPengunjung({
        variables: {
          object: {
            nama: state.nama,
            umur: state.umur,
            jenisKelamin: state.jenisKelamin,
          },
        },
      });
      setState(initialValue);
      alert("Data Berhasil ditambahkan");
    } else {
      alert("Data masih ada yang kosong ");
    }
  };

  return (
    <div className="input-passenger">
      <div className="header">
        <h4>Formulir Tambah Pengunjung</h4>
      </div>
      <form onSubmit={handleSubmit} className="create-user">
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
        <select onChange={onChange} name="jenisKelamin" value={state.jenisKelamin}>
          <option value="Pria" defaultValue="Pria">
            Pria
          </option>
          <option value="Wanita">Wanita</option>
        </select>
        <button className="btn-primary rounded border-0" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default InputPassenger;
