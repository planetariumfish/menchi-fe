import React from "react";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Pet } from "../../types/types";
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
import { useNavigate } from "react-router-dom";

type Props = {
  pets: Pet[];
};

const UserPets = ({ pets }: Props) => {
  const navigate = useNavigate();
  const columnHelper = React.useMemo(() => createColumnHelper<Pet>(), []);
  const columns: ColumnDef<Pet, any>[] = React.useMemo(
    () => [
      columnHelper.accessor("name", {
        cell: (info) => {
          return (
            <Text
              onClick={() => navigate(`/pet/${info.row.original.id}`)}
              className="clickable"
              _hover={{ color: "brand.OrangeYellow" }}
              width="15ch"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {info.getValue()}
            </Text>
          );
        },
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
        cell: (info) => {
          const value = info.getValue();
          return (
            <Text
              color={
                value === "AVAILABLE"
                  ? "brand.Keppel"
                  : value === "FOSTERED"
                  ? "brand.OrangeYellow"
                  : "brand.Bittersweet"
              }
            >
              {value}
            </Text>
          );
        },
        header: () => <span>Status</span>,
      }),
    ],
    []
  );
  const table = useReactTable({
    data: pets,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return pets.length > 0 ? (
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
  ) : (
    <Text as="i">User has no pets</Text>
  );
};

export default UserPets;
