import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

function CabinTable() {
  //Fething Cabin data in React Query
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  console.log("cabins", cabins);

  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount") || "all";
  console.log("filterValue", filterValue);

  const sortByValue = searchParams.get("SortBy") || "name-asc";

  //1.) Filtering Cabins Accoring TO filterValue
  let filteredValue = [];
  if (filterValue === "all") filteredValue = cabins;
  if (filterValue === "no-discount")
    filteredValue = cabins.filter((cabin) => {
      // console.log(typeof(cabin.discount));

      return cabin?.discount === 0 || cabin.discount < 0;
    });
  if (filterValue === "with-discount")
    filteredValue = cabins.filter((cabin) => {
      // console.log(typeof(cabin.discount));

      return cabin?.discount > 0;
    });
  // console.log("filteredValue", filteredValue);

  //2.) Sorting Cabins Accoring TO SortBy-Value
  const [feild, direction] = sortByValue.split("-");

  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredValue?.sort((a, b) => {
    const valueA = a[feild];
    const valueB = b[feild];

    if (typeof valueA === "string") {
      return valueA.localeCompare(valueB) * modifier;
    }

    return (valueA - valueB) * modifier;
  });
  console.log(feild, direction);
  console.log("sortedCabins", sortedCabins);

  if (isLoading) return <Spinner />;
  if (error) alert(error.message);

  return (
    <Menus>
      <Table columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}>
        <Table.Header>
          <div>Cabin</div>
          <div>Name</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div>Action</div>
        </Table.Header>

        <Table.Body
          // data={cabins}
          // data={filteredValue}
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
