import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 9.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  const { addCabin, isCreating: isDuplicating } = useCreateCabin();
  const { deleteCabin, isDeleting } = useDeleteCabin();

  function handleCabinDuplicate() {
    addCabin({
      name: `copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name} </Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>

      {discount ? (
        <Discount>{formatCurrency(discount)} </Discount>
      ) : (
        <span>&mdash;</span>
      )}

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />

            <Menus.List id={id}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={handleCabinDuplicate}
              >
                Duplicate{" "}
              </Menus.Button>

              <Modal.Open opens={"cabin-edit"}>
                <Menus.Button icon={<HiPencil />}>Edit </Menus.Button>
              </Modal.Open>

              <Modal.Open opens={"cabin-delete"}>
                <Menus.Button icon={<HiTrash />}>Delete </Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name={"cabin-edit"}>
              <CreateCabinForm cabin={cabin} editId={id} />
            </Modal.Window>

            <Modal.Window name={"cabin-delete"}>
              <ConfirmDelete
                onConfirm={() => deleteCabin(id)}
                resourceName="Cabin"
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
