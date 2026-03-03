import React, { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import CabinTable from "./CabinTable";

export default function AddCabin() {
  // const [showForm, setShowForm] = useState(false);

  return (
    <Modal>
      <Modal.Open opens={"cabin-form"}>
        <Button type={"primary"}>Add New Cabin </Button>
      </Modal.Open>
      <Modal.Window name={"cabin-form"}>
        <CreateCabinForm />
      </Modal.Window>

      {/* <Modal.Open opens={"table"}>
      <Button type={"primary"}>Add New Table </Button>
    </Modal.Open>
    <Modal.Window name={"table"}>
      <CabinTable/>
    </Modal.Window> */}
    </Modal>
  );

  // return (
  //   <>
  //   <Button type="primary" onClick={() => setShowForm((form) => !form)}>Add New Cabin</Button>
  //   {showForm && <Modal  onClose={() => setShowForm(show => !show)}/>}
  //   </>

  // )
}
