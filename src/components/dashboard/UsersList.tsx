import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "../../utils/axiosClient";
import React from "react";
import { User } from "../../types/types";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import ConfirmAdmin from "./ConfirmAdmin";

//TODO: Filterable / sortable / searchable table

const UsersList = () => {
  const [allUsers, setAllUsers] = React.useState<User[]>([]);
  const columnHelper = React.useMemo(() => createColumnHelper<User>(), []);
  const [confirmAdmin, setConfirmAdmin] = React.useState<boolean>(false);
  const [userToMod, setUserToMod] = React.useState<string>();

  const columns: ColumnDef<User, any>[] = React.useMemo(
    () => [
      columnHelper.accessor("firstname", {
        cell: (info) => info.getValue(),
        header: () => <span>First Name</span>,
      }),
      columnHelper.accessor("lastname", {
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
      }),
      columnHelper.accessor("email", {
        cell: (info) => info.getValue(),
        header: () => <span>Email</span>,
      }),
      columnHelper.accessor("phone", {
        cell: (info) => info.getValue(),
        header: () => <span>Phone</span>,
      }),
      // TODO: make this column editable
      columnHelper.accessor("returned", {
        cell: (info) => {
          const value = info.getValue();
          return value ? (
            // add button to reset here
            <Text color="brand.Bittersweet">value</Text>
          ) : (
            <Text color="brand.Keppel">No</Text>
          );
        },
        header: () => <span>Returned a pet?</span>,
      }),
      columnHelper.accessor("role", {
        cell: (info) => {
          const value: string = info.getValue();
          const isAdmin = value === "ADMIN";
          return (
            <Checkbox
              colorScheme="yellow"
              isChecked={isAdmin}
              isDisabled={isAdmin}
              onChange={() => {
                setUserToMod(info.row.original.id);
                setConfirmAdmin(true);
              }}
            />
          );
        },
        header: () => <span>Admin?</span>,
      }),
    ],
    []
  );
  const table = useReactTable({
    data: allUsers,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const users = useQuery(
    ["allUsers"],
    async () => {
      const result = await axios.get("/users/all");
      return result.data;
    },
    {
      onSuccess: (data) => {
        setAllUsers(data);
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
      {confirmAdmin && (
        <ConfirmAdmin
          isOpen={confirmAdmin}
          onClose={() => setConfirmAdmin(false)}
          userId={userToMod || ""}
          refetch={users.refetch}
        />
      )}
    </Box>
  );
};

export default UsersList;
