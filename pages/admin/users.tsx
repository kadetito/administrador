import { Grid, Select, MenuItem } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { AdminLayout } from "../../components/layouts/AdminLayout";
import useSWR from "swr";
import { IUser } from "interfaces";
import tesloApi from "../../apirest/tesloApi";
import { useEffect, useState } from "react";

// const columns: GridColDef[] = [
//   { field: "id", headerName: "ID", width: 100 },
//   { field: "fullname", headerName: "Nombre Completo", width: 300 },

//   {
//     field: "paid",
//     headerName: "Pagada",
//     description: "Muestra información si está pagada la orden o no",
//     width: 200,
//     renderCell: (params: GridValueGetterParams) => {
//       return params.row.paid ? (
//         <Chip color="success" label="Pagada" variant="outlined" />
//       ) : (
//         <Chip color="error" label="No pagada" variant="outlined" />
//       );
//     },
//   },
//   {
//     field: "orden",
//     headerName: "Ver orden",
//     width: 200,
//     sortable: false,
//     renderCell: (params: GridValueGetterParams) => {
//       return (
//         <NextLink href={`/orders/${params.row.orderId}`} passHref>
//           <Link underline="always">Ver orden</Link>
//         </NextLink>
//       );
//     },
//   },
// ];

const UsersPage = () => {
  const { data, error } = useSWR<IUser[]>("/api/admin/users");

  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  if (!data && !error) return <></>;

  const onRoleUpdate = async (userId: string, newRole: string) => {
    const previousUsers = users.map((user) => ({ ...user }));
    const updatedusers = users.map((user) => ({
      ...user,
      role: userId === user._id ? newRole : user.role,
    }));

    setUsers(updatedusers);

    try {
      await tesloApi.put("/admin/users", { userId, role: newRole });
    } catch (error) {
      setUsers(previousUsers);
      console.log(error);
      alert("No se pudo actualizar el rol");
    }
  };

  const columns: GridColDef[] = [
    { field: "email", headerName: "Correo", width: 250 },
    { field: "name", headerName: "Nombre completo", width: 300 },
    {
      field: "role",
      headerName: "Rol",
      width: 250,

      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          <Select
            value={row.role}
            label="Rol"
            onChange={({ target }) => onRoleUpdate(row.id, target.value)}
            sx={{ width: "300px" }}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="client">Client</MenuItem>
            <MenuItem value="super-user">Super User</MenuItem>
            <MenuItem value="SEO">SEO</MenuItem>
          </Select>
        );
      },
    },
  ];

  const rows = users.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

  return (
    <AdminLayout title="usuarios" subTitle="listado de usuarios">
      <Grid container className="fadeIn">
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default UsersPage;
