import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabin, editId, onClose, type }) {
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: cabin ? cabin : {},
  });
  const isFormEditing = Boolean(editId);

  const { errors } = formState;
  console.log(errors);

  // Create Cabin
  const { addCabin, isCreating } = useCreateCabin();

  // Edit Cabin
  const { editCabin, isEditing } = useEditCabin();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data?.image : data?.image[0];

    if (isFormEditing)
      editCabin(
        { newEditCabin: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            cabin = {};
            onClose?.();
          },
        },
      );
    else
      addCabin(
        { ...data, image },
        {
          onSuccess: (data) => {
            console.log(data);
            reset();
            onClose?.();
          },
        },
      );
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form type={type} onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow
        label="Cabin name"
        error={errors?.name?.message && <Error> {errors?.name?.message}</Error>}
      >
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "Cabin Name Required",
          })}
        />
      </FormRow>

      <FormRow
        label="Max Capacity"
        error={
          errors?.maxCapacity?.message && (
            <Error> {errors?.maxCapacity?.message}</Error>
          )
        }
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "Maxcapaciy is required",
            min: {
              value: 1,
              message: "Capacity should be atleast 1",
            },
            max: {
              value: 10,
              message: "Capacity should be within 10",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Regular price"
        error={
          errors?.regularPrice?.message && (
            <Error> {errors?.regularPrice?.message}</Error>
          )
        }
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            required: "RegularPrice is Required",
            min: {
              value: 100,
              message: "Mininum Price is 100",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Discount"
        error={
          errors?.discount?.message && (
            <Error> {errors?.discount?.message}</Error>
          )
        }
      >
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "Discount is Required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be lesser than Price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={
          errors?.description?.message && (
            <Error> {errors?.description?.message}</Error>
          )
        }
      >
        <Textarea
          type="number"
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description", {
            required: "Description is Required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isFormEditing ? false : "Image is Required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onClose?.()}>
          Cancel
        </Button>
        <Button type="primary" disabled={isWorking}>
          {isFormEditing ? "Edit Cabin" : "Create new Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
