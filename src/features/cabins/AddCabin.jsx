import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <Button type="primary" onClick={() => setShowForm((form) => !form)}>
        Add New Cabin
      </Button>
      {showForm && (
        <Modal onClose={() => setShowForm((show) => !show)}>
          <CreateCabinForm onClose={() => setShowForm((show) => !show)} />{" "}
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
