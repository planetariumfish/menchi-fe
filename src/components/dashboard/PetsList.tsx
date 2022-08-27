import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import axios from "../../utils/axiosClient";
import { Pet } from "../../types/types";
import { useQuery } from "@tanstack/react-query";
import {
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Table,
  Box,
  Text,
} from "@chakra-ui/react";

type Props = {};

const PetsList = (props: Props) => {
  const [allPets, setAllPets] = React.useState<Pet[]>([]);
  const columnHelper = React.useMemo(() => createColumnHelper<Pet>(), []);
  const columns: ColumnDef<Pet, any>[] = React.useMemo(
    () => [
      columnHelper.accessor("name", {
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
      }),
      columnHelper.accessor("type", {
        cell: (info) => info.getValue(),
        header: () => <span>Type</span>,
      }),
      columnHelper.accessor("breed", {
        cell: (info) => info.getValue(),
        header: () => <span>Breed</span>,
      }),
      columnHelper.accessor("color", {
        cell: (info) => info.getValue(),
        header: () => <span>Color</span>,
      }),
      columnHelper.accessor("status", {
        cell: (info) => info.getValue(),
        header: () => <span>Status</span>,
      }),
      columnHelper.accessor("height", {
        cell: (info) => info.getValue(),
        header: () => <span>Height</span>,
      }),
      columnHelper.accessor("weight", {
        cell: (info) => info.getValue(),
        header: () => <span>Weight</span>,
      }),
      columnHelper.accessor("hypoallergenic", {
        cell: (info) => {
          if (info.getValue()) return <Text color="brand.Keppel">Yes</Text>;
          return <Text color="brand.Bittersweet">No</Text>;
        },
        header: () => <span>HypoA?</span>,
      }),
    ],
    []
  );
  const table = useReactTable({
    data: allPets,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const users = useQuery(
    ["allPets"],
    async () => {
      const result = await axios.get("/pets/all");
      return result.data;
    },
    {
      onSuccess: (data) => {
        setAllPets(data);
      },
    }
  );
  return (
    <Box bg="white" w="100%" p={2} borderWidth="1px">
      <TableContainer maxHeight="40vh" overflowY="auto">
        <Table variant="simple" size="sm">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PetsList;
