import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import Header from "./Header";
import InputIdPasengger from "./InputIdPasengger";
import ListPassenger from "./ListPassenger";
import LoadingSVG from "./LoadingSVG";
import InputPassenger from "./InputPassenger";

const GET_PENGUNJUNG = gql`
  query MyQuery {
    pengunjung {
      id
      jenisKelamin
      nama
      umur
    }
  }
`;

const DELETE_PENGUNJUNG = gql`
  mutation MyMutation($id: Int!) {
    delete_pengunjung_by_pk(id: $id) {
      id
    }
  }
`;

const INSERT_PENGUNJUNG_ONE = gql`
  mutation MyMutation($object: pengunjung_insert_input!) {
    insert_pengunjung_one(object: $object) {
      id
    }
  }
`;

const UPDATE_PENGUNJUNG_BY_PK = gql`
  mutation MyMutation($id: Int!, $nama: String, $umur: Int, $jenisKelamin: String) {
    update_pengunjung_by_pk(pk_columns: { id: $id }, _set: { nama: $nama, umur: $umur, jenisKelamin: $jenisKelamin }) {
      id
    }
  }
`;

function Home() {
  const { data, loading } = useQuery(GET_PENGUNJUNG);
  const [deletePengunjung, { loading: loadingDelete }] = useMutation(DELETE_PENGUNJUNG, {
    refetchQueries: [GET_PENGUNJUNG],
  });

  const [insertPengunjung, { loading: loadingInsert }] = useMutation(INSERT_PENGUNJUNG_ONE, {
    refetchQueries: [GET_PENGUNJUNG],
  });

  const [updatePengunjung, { loading: loadingUpdate }] = useMutation(UPDATE_PENGUNJUNG_BY_PK, {
    refetchQueries: [GET_PENGUNJUNG],
  });

  return (
    <div>
      <Header />
      <InputIdPasengger />
      {loading || loadingDelete || loadingUpdate ? <LoadingSVG /> : <ListPassenger data={data.pengunjung} deletePengunjung={deletePengunjung} updatePengunjung={updatePengunjung} />}

      {loadingInsert ? <LoadingSVG /> : <InputPassenger insertPengunjung={insertPengunjung} />}
    </div>
  );
}

export default Home;
