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

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;

  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;
  console.log(errors);

  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin created succesfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newEditCabin, id }) => createEditCabin(newEditCabin, id),
    onSuccess: () => {
      toast.success("Cabin edited succesfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    console.log("data", data);

    // Checking Image old or New
    const image = typeof data.image === "string" ? data.image : data?.image[0];

    if (isEditSession)
      editCabin({ newEditCabin: { ...data, image }, id: editId });

    if (!isEditSession) createCabin({ ...data, image: image });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow
        label="Cabin name"
        error={errors?.name?.message && <Error> {errors?.name?.message}</Error>}
      >
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "Cabin Name Required",
          })}
          disabled={isWorking}
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
          disabled={isWorking}
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
          {...register("regularPrice", {
            required: "RegularPrice is Required",
            min: {
              value: 100,
              message: "Mininum Price is 100",
            },
          })}
          disabled={isWorking}
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
          defaultValue={0}
          {...register("discount", {
            required: "Discount is Required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be lesser than Price",
          })}
          disabled={isWorking}
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
          defaultValue=""
          {...register("description", {
            required: "Description is Required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "Cabin is Required",
          })}
          disabled={isWorking}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button type="primary" disabled={isWorking}>
          {isEditSession ? "Edit Cabin" : "Create New Cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
