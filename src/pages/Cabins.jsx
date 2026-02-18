import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

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
      </Row>
    </>
  );
}

export default Cabins;
