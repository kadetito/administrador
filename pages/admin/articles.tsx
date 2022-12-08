import { Box, Button, Chip, Grid } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { Card } from "react-bootstrap";
import useSWR from "swr";

import { AdminLayout } from "../../components/layouts";
import { IArticle, IUser } from "../../interfaces";
import NextLink from "next/link";

const columns: GridColDef[] = [
  {
    field: "images",
    headerName: "Imagen",
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <a href={`/articles/${row.slug}`} target="_blank" rel="noreferrer">
          <Card.Img alt={row.title} src={row.images} />
        </a>
      );
    },
  },
  {
    field: "title",
    headerName: "Título",
    width: 450,

    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <NextLink href={`/admin/articles/${row.slug}`} passHref>
          {row.title}
        </NextLink>
      );
    },
  },
  { field: "category", headerName: "Categoría" },
  { field: "author", headerName: "Autor" },
  { field: "activated", headerName: "Activo" },
];

const ArticlesPage = () => {
  const { data, error } = useSWR<IArticle[]>("/api/admin/articles");

  if (!data && !error) return <></>;

  const rows = data!.map((article) => ({
    id: article._id,
    images: article.images[0],
    title: article.title,
    category: article.category,
    author: article.author,
    activated: article.activated,
    slug: article.slug,
  }));

  return (
    <AdminLayout
      title={`Articles (${data?.length})`}
      subTitle={"Mantenimiento de articles"}
    >
      <Box display="flex" justifyContent="end">
        <Button href="/admin/articles/new">Crear artículo</Button>
      </Box>
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

export default ArticlesPage;
