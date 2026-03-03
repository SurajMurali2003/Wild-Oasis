import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddCabin from "../features/cabins/AddCabin";

function Cabins() {
  //   useEffect(() => {
  //     async function loadCabinsData() {
  //       const cabins = await getCabins();
  //       console.log("cabins", cabins);
  //     }
  //     loadCabinsData();
  //   }, []);

  // useEffect(() => {
  //   getCabins()
  //     .then((data) => console.log(data))
  //     .catch((error) => console.log(error));
  // }, []);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p> Filter/Sort</p>
      </Row>
      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
